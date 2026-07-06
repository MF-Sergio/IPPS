# Doações com Mercado Pago

Este projeto usa uma mini API Node para criar uma preferência de pagamento no
Mercado Pago. O frontend nunca recebe o `Access Token` e também não coleta dados
de cartão, CVV ou senha bancária.

## Rotas

- `POST /api/doacoes/preferencia`: recebe valor, nome, e-mail, método escolhido e
  aceite da política; cria uma `preference` no Mercado Pago; devolve a URL de
  checkout.
- `POST /api/mercado-pago/webhook`: receptor para notificações do Mercado Pago.
  Se `MERCADO_PAGO_WEBHOOK_SECRET` estiver configurado, valida `x-signature`.
- `GET /api/health`: health check simples.

## Organização do backend

```text
api/                        # Vercel Functions serverless
  health.mjs
  doacoes/preferencia.mjs
  mercado-pago/webhook.mjs

server/
  index.mjs                  # bootstrap HTTP local/opcional
  api/                       # controllers compartilhados
  config/                    # env, caminhos e constantes
  middleware/                # CORS, headers e rate limit
  services/                  # doação e Mercado Pago
    mercadoPago/             # preferência, URLs, métodos e assinatura webhook
  static/                    # arquivos do build Vite
  utils/                     # helpers pequenos
```

## Variaveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-...
MERCADO_PAGO_ENVIRONMENT=sandbox
APP_BASE_URL=http://localhost:3001
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001
VITE_API_BASE_URL=
```

Em produção, use HTTPS em `APP_BASE_URL` e configure as URLs de retorno e webhook
no painel do Mercado Pago.

Se a API estiver na Vercel e o frontend em outro domínio, configure:

```bash
APP_BASE_URL=https://ipps.com.br
ALLOWED_ORIGINS=https://ipps.com.br,https://www.ipps.com.br
MERCADO_PAGO_NOTIFICATION_URL=https://sua-api.vercel.app/api/mercado-pago/webhook
VITE_API_BASE_URL=https://sua-api.vercel.app
```

## Medidas LGPD e segurança

- Minimização: o payload usa apenas nome, e-mail, valor, método e aceite.
- Dados financeiros: capturados pelo Mercado Pago, não pelo IPPS.
- Segredo do gateway: `Access Token` somente no backend.
- Origem: rota de criacao aceita apenas origens configuradas.
- Abuso: limite de requisições por IP, payload máximo de 16 KB e validação
  estrita.
- Retenção: a API não persiste dados pessoais; qualquer futura persistência deve
  ter finalidade, prazo, base legal e processo de atendimento aos titulares.

Antes de publicar, revise a política de privacidade com assessoria jurídica e
configure o encarregado/canal de atendimento do titular.
