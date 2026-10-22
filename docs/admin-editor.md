# Admin de publicações

O painel fica em `/admin/` e usa OAuth 2.0 do X com PKCE. Só IDs explicitamente listados em `ADMIN_X_USER_IDS` podem publicar. O editor aceita texto longo, formatação básica, cor, links, imagens, GIFs e vídeos. Os posts são salvos no PostgreSQL e aparecem na aba Blog.

## Configuração no Vercel

Adicione as variáveis abaixo em **Project Settings > Environment Variables**. Não grave valores secretos no repositório nem os envie pelo chat.

| Variável | Uso |
| --- | --- |
| `SITE_ORIGIN` | Origem pública principal, por exemplo `https://cwmunista.vercel.app`. |
| `DATABASE_URL` | URL PostgreSQL usada para guardar as publicações. |
| `SESSION_SECRET` | Segredo aleatório com pelo menos 32 bytes para assinar sessões. |
| `X_CLIENT_ID` | Client ID do app OAuth 2.0 criado no X Developer Portal. |
| `X_CLIENT_SECRET` | Client secret do app OAuth 2.0; mantenha somente no Vercel. |
| `X_REDIRECT_URI` | `https://cwmunista.vercel.app/api/auth/x/callback`. Deve coincidir com o callback cadastrado no X. |
| `ADMIN_X_USER_IDS` | IDs numéricos, separados por vírgula, das contas X autorizadas. A lista é obrigatória; sem ela todos os logins são recusados. |
| `SUPABASE_URL` | URL do projeto Supabase para armazenamento das mídias. |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service-role do Supabase; nunca exponha no browser nem no Git. |
| `POST_MEDIA_BUCKET` | Nome do bucket público de mídia. Padrão: `cwmunista-post-media`. |
| `ADMIN_APP_URL` | Destino depois do login. Padrão: `https://cwmunista.vercel.app/admin/`. |
| `ALLOWED_ADMIN_ORIGINS` | Origens admin adicionais, separadas por vírgula, se o painel for hospedado em outro host. |
| `SESSION_COOKIE_DOMAIN` | Defina somente quando site e painel estiverem em subdomínios compatíveis, por exemplo `.seudominio.com.br`. |

No PowerShell, gere um segredo sem imprimi-lo no código:

```powershell
$bytes = New-Object byte[] 48
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

No X Developer Portal, configure OAuth 2.0 como Web App e cadastre a URI de callback acima com o escopo `users.read`. O backend valida o ID retornado pelo X contra `ADMIN_X_USER_IDS`; usernames não são usados como controle de autorização.

## Banco e mídia

Execute [admin-posts.sql](../db/admin-posts.sql) uma vez no SQL Editor do PostgreSQL/Supabase. A API não cria tabelas durante requisições.

Crie no Supabase Storage o bucket público `cwmunista-post-media`, habilite CORS para a origem do painel e configure o limite de arquivo conforme sua conta. O painel solicita uma URL assinada ao backend e envia o arquivo diretamente ao Storage; a chave service-role permanece no servidor.

## Domínio

O hostname `admin.cwmunista.vercel.app` não resolve atualmente. A URL funcional no projeto existente é `https://cwmunista.vercel.app/admin/`. Para usar um subdomínio admin separado, adicione um domínio sob seu controle ao projeto no Vercel, configure `ADMIN_APP_URL`, `ALLOWED_ADMIN_ORIGINS` e `SESSION_COOKIE_DOMAIN`, e cadastre a URL de callback OAuth correspondente.

## Desenvolvimento

`python server.py` serve a interface estática, mas não executa as funções `/api`. Para testar OAuth, banco e uploads localmente, use `vercel dev` com as mesmas variáveis de ambiente configuradas em um `.env.local` não versionado. Nunca adicione esse arquivo ao Git.