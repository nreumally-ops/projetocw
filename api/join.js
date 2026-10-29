"use strict";

const RECIPIENT = "nreumally@gmail.com";
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map();

function sendJson(response, status, payload) {
  response.setHeader("Cache-Control", "no-store");
  response.status(status).json(payload);
}

function isSameOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  if (!origin || !host) return false;

  try {
    return new URL(origin).host.toLowerCase() === String(host).split(",")[0].trim().toLowerCase();
  } catch {
    return false;
  }
}

function getClientKey(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const realIp = request.headers["x-real-ip"];
  return String(realIp || forwardedFor || request.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
}

function isRateLimited(request) {
  const now = Date.now();
  const key = getClientKey(request);
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  bucket.count += 1;
  return false;
}

function validateSubmission(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!name || name.length > 100) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return { name, email };
}

module.exports = async function joinHandler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Método não permitido." });
  }

  if (!isSameOrigin(request)) {
    return sendJson(response, 403, { error: "Origem não permitida." });
  }

  if (String(request.headers["content-type"] || "").split(";")[0].trim().toLowerCase() !== "application/json") {
    return sendJson(response, 415, { error: "Formato de envio inválido." });
  }

  const contentLength = Number(request.headers["content-length"] || 0);
  if (contentLength > 4096) {
    return sendJson(response, 413, { error: "O formulário excedeu o tamanho permitido." });
  }

  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return sendJson(response, 400, { error: "Dados inválidos." });
    }
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return sendJson(response, 400, { error: "Dados inválidos." });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return sendJson(response, 200, { ok: true, message: "Cadastro recebido." });
  }

  const submission = validateSubmission(body);
  if (!submission) {
    return sendJson(response, 400, { error: "Informe um nome e um e-mail válidos." });
  }

  if (isRateLimited(request)) {
    return sendJson(response, 429, { error: "Muitas tentativas. Tente novamente mais tarde." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return sendJson(response, 503, { error: "O envio ainda não está configurado." });
  }

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: submission.email,
        subject: "Novo cadastro pelo CWMUNISTA",
        text: `Novo cadastro recebido pelo site.\n\nNome: ${submission.name}\nE-mail: ${submission.email}`,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend request failed with status", emailResponse.status);
      return sendJson(response, 502, { error: "Não foi possível enviar agora. Tente novamente." });
    }

    return sendJson(response, 200, { ok: true, message: "Cadastro recebido. Obrigado!" });
  } catch {
    return sendJson(response, 502, { error: "Não foi possível enviar agora. Tente novamente." });
  }
};