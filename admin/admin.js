(() => {
  const apiBase = window.CWMUNISTA_API_BASE || (window.location.hostname.startsWith("admin.") ? "https://cwmunista.vercel.app" : "");
  const loginView = document.getElementById("login-view");
  const workspace = document.getElementById("workspace");
  const loginStatus = document.getElementById("login-status");
  const composerStatus = document.getElementById("composer-status");
  const editor = document.getElementById("post-editor");
  const publishButton = document.getElementById("publish-button");
  const postsList = document.getElementById("posts-list");
  const fileInput = document.getElementById("media-file");
  let savedRange = null;
  const backgroundVideo = document.querySelector(".admin-background-video");
  function syncBackgroundVideo() {
    if (!backgroundVideo) return;
    if (document.hidden) {
      backgroundVideo.pause();
    } else {
      backgroundVideo.play().catch(() => {});
    }
  }
  document.addEventListener("visibilitychange", syncBackgroundVideo);
  syncBackgroundVideo();
  document.querySelector(".x-login").href = `${apiBase}/api/auth/x/start`;

  function apiUrl(path) {
    return `${apiBase}/api/${path}`;
  }

  async function api(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const response = await fetch(apiUrl(path), { ...options, headers, credentials: "include", cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Falha na solicitação (${response.status}).`);
    return data;
  }

  function showLogin(message = "") {
    loginView.hidden = false;
    workspace.hidden = true;
    loginStatus.textContent = message;
  }

  function showWorkspace(user) {
    loginView.hidden = true;
    workspace.hidden = false;
    document.getElementById("user-label").textContent = user.name ? `${user.name} · @${user.username}` : `@${user.username}`;
  }

  function saveEditorSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editor.contains(range.commonAncestorContainer)) savedRange = range.cloneRange();
  }

  function restoreEditorSelection() {
    if (!savedRange || !editor.contains(savedRange.commonAncestorContainer)) {
      editor.focus();
      return;
    }
    editor.focus();
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedRange);
  }

  function safeLink(url) {
    try {
      const parsed = new URL(url, window.location.href);
      return parsed.protocol === "https:" ? parsed.href : "";
    } catch {
      return "";
    }
  }

  function insertNode(node) {
    editor.focus();
    const selection = window.getSelection();
    if (savedRange && editor.contains(savedRange.commonAncestorContainer)) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }
    if (!selection || selection.rangeCount === 0 || !editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
      editor.append(node);
      saveEditorSelection();
      return;
    }
    const range = selection.getRangeAt(0);
    if (!editor.contains(range.commonAncestorContainer)) {
      editor.append(node);
      return;
    }
    range.deleteContents();
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    savedRange = range.cloneRange();
  }

  async function uploadMedia(file) {
    composerStatus.textContent = "Preparando upload...";
    const signed = await api("media/upload-url", {
      method: "POST",
      body: JSON.stringify({ filename: file.name, content_type: file.type, size: file.size }),
    });
    const upload = await fetch(signed.upload_url, {
      method: "PUT",
      headers: { "Content-Type": file.type, "x-upsert": "false" },
      body: file,
    });
    if (!upload.ok) throw new Error("O upload falhou. Confira o bucket e o CORS do armazenamento.");

    const source = safeLink(signed.public_url);
    if (!source) throw new Error("O armazenamento retornou uma URL inválida.");
    let media;
    if (file.type.startsWith("video/")) {
      media = document.createElement("video");
      media.controls = true;
      media.preload = "metadata";
    } else {
      media = document.createElement("img");
      media.alt = file.name;
    }
    media.src = source;
    insertNode(media);
    composerStatus.textContent = "Mídia adicionada.";
  }

  function renderPost(post) {
    const article = document.createElement("article");
    article.className = "admin-post";
    const meta = document.createElement("div");
    meta.className = "admin-post-meta";
    const author = document.createElement("span");
    author.textContent = post.author_name ? `${post.author_name} · @${post.author_username}` : `@${post.author_username}`;
    const date = document.createElement("time");
    date.dateTime = post.created_at;
    date.textContent = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(post.created_at));
    meta.append(author, date);

    const content = document.createElement("div");
    content.className = "post-content";
    content.innerHTML = post.content_html;

    const actions = document.createElement("div");
    actions.className = "admin-post-actions";
    const remove = document.createElement("button");
    remove.className = "delete-post";
    remove.type = "button";
    remove.textContent = "Excluir publicação";
    remove.addEventListener("click", async () => {
      if (!window.confirm("Excluir esta publicação do portal?")) return;
      try {
        await api(`posts/${encodeURIComponent(post.id)}`, { method: "DELETE" });
        await loadPosts();
      } catch (error) {
        composerStatus.textContent = error.message;
      }
    });
    actions.append(remove);
    article.append(meta, content, actions);
    return article;
  }

  async function loadPosts() {
    postsList.replaceChildren();
    const result = await api("posts");
    if (!result.posts.length) {
      const empty = document.createElement("p");
      empty.className = "empty-posts";
      empty.textContent = "Ainda não há publicações.";
      postsList.append(empty);
      return;
    }
    result.posts.forEach((post) => postsList.append(renderPost(post)));
  }

  async function publishPost() {
    const contentHtml = editor.innerHTML.trim();
    if (!editor.innerText.trim() && !editor.querySelector("img, video")) {
      composerStatus.textContent = "Escreva algo ou adicione uma mídia.";
      return;
    }
    publishButton.disabled = true;
    composerStatus.textContent = "Publicando...";
    try {
      await api("posts", { method: "POST", body: JSON.stringify({ content_html: contentHtml }) });
      editor.replaceChildren();
      composerStatus.textContent = "Publicação enviada ao portal.";
      await loadPosts();
    } catch (error) {
      composerStatus.textContent = error.message;
    } finally {
      publishButton.disabled = false;
    }
  }

  async function initialize() {
    const errorCode = new URLSearchParams(window.location.search).get("error");
    const errors = {
      cancelled: "A entrada foi cancelada.",
      invalid_state: "A validação de segurança falhou. Tente entrar novamente.",
      oauth_failed: "Não foi possível validar o acesso pelo X.",
      not_authorized: "Esta conta X não está autorizada a publicar.",
      not_configured: "O acesso ainda precisa ser configurado no Vercel.",
    };
    let session;
    try {
      session = await api("auth/session");
    } catch {
      showLogin(errors[errorCode] || "");
      return;
    }

    showWorkspace(session.user);
    try {
      await loadPosts();
    } catch (error) {
      composerStatus.textContent = error.message;
    }
  }

  document.querySelectorAll(".editor-toolbar [data-command]").forEach((button) => {
    button.addEventListener("mousedown", (event) => event.preventDefault());
    button.addEventListener("click", () => {
      editor.focus();
      const command = button.dataset.command;
      document.execCommand(command, false, button.dataset.value || null);
    });
  });
  document.getElementById("text-color").addEventListener("input", (event) => {
    restoreEditorSelection();
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("foreColor", false, event.target.value);
    saveEditorSelection();
  });
  document.getElementById("link-button").addEventListener("click", () => {
    const address = window.prompt("Endereço HTTPS do link:");
    if (!address) return;
    const href = safeLink(address);
    if (!href) {
      composerStatus.textContent = "Use um endereço HTTPS válido.";
      return;
    }
    restoreEditorSelection();
    document.execCommand("createLink", false, href);
    saveEditorSelection();
  });
  fileInput.addEventListener("change", async () => {
    const [file] = fileInput.files || [];
    if (file) {
      try {
        await uploadMedia(file);
      } catch (error) {
        composerStatus.textContent = error.message;
      }
    }
    fileInput.value = "";
  });
  publishButton.addEventListener("click", publishPost);
  editor.addEventListener("keyup", saveEditorSelection);
  editor.addEventListener("mouseup", saveEditorSelection);
  document.addEventListener("selectionchange", saveEditorSelection);
  document.getElementById("refresh-button").addEventListener("click", () => loadPosts().catch((error) => { composerStatus.textContent = error.message; }));
  document.getElementById("logout-button").addEventListener("click", async () => {
    try {
      await api("auth/logout", { method: "POST", body: "{}" });
    } finally {
      window.location.reload();
    }
  });

  initialize();
})();