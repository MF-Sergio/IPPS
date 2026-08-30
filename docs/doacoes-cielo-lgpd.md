# Doações com a API E-Commerce Cielo

O backend do IPPS cria transações na API E-Commerce Cielo 3.0. O frontend nunca
recebe `MerchantKey`.

## Rotas

- `POST /api/doacoes` — cria a doação e a transação. Devolve QR Code (Pix),
  linha digitável (boleto) ou o resultado da autorização (cartão).
- `GET /api/doacoes/:id/status` — consulta de status, usada por polling.
- `POST /api/cielo/notificacao` — Post de Notificação da Cielo.
- `GET /api/health` — health check.

## Por que existe polling

O Post de Notificação da Cielo dispara **a cada 30 minutos**, não em tempo real.
Sem polling, o doador pagaria o Pix e o site só saberia meia hora depois.

## Segurança do webhook

A Cielo **não assina** o Post de Notificação. A proteção é dupla:

1. Um header estático cadastrado no Suporte Cielo
   (`CIELO_NOTIFICATION_HEADER_NAME` / `_VALUE`).
2. O corpo do POST nunca é fonte de verdade — o backend reconsulta
   `GET /1/sales/{PaymentId}` antes de mudar qualquer status.

A URL cadastrada precisa ser **estática** e ter até 255 caracteres, então URLs de
preview da Vercel não servem.

## Arquitetura

```text
server/src/
  domain/          entidade, objetos de valor, portas — não importa nada
  application/     casos de uso — fala só com portas
  infrastructure/  Cielo, repositório, config, log
  router/          borda HTTP: controllers, DTOs, middlewares
  composition/     composition root — o único que conhece todas as camadas
api/               Vercel Functions, finas
```

A regra de dependência é verificada por
`server/tests/architecture/layer-boundaries.test.ts`, não por disciplina.

## PCI-DSS

Cartão é processado no servidor, o que coloca o IPPS em escopo **SAQ-D**.
Controles garantidos pelo código:

- O número do cartão é trocado por `CardToken` (`POST /1/card`) e **nunca é
  persistido**. Só bandeira e últimos quatro dígitos entram no repositório.
- `CardCredentials` mascara PAN e CVV em `toJSON()` e `toString()`, então
  `JSON.stringify` de qualquer objeto que a contenha sai mascarado.
- `redact.ts` filtra campos sensíveis de todo log.

Fora do código, e sob responsabilidade do IPPS: segregação de acesso ao painel
Cielo, rotação de `MerchantKey`, proteção dos logs e scan trimestral ASV.

## LGPD

CPF é obrigatório — `Customer.Identity` e `Customer.IdentityType` são exigidos
pela Cielo, inclusive no Pix. O CPF é usado para montar a transação e é
armazenado; **não** vai para log. A versão da política aceita é gravada junto da
doação (`PRIVACY_TERMS_VERSION`).

## Limitação conhecida

O repositório é em memória. Em Vercel Functions cada invocação pode ser uma
instância nova, então histórico e registro durável de consentimento **não
sobrevivem** até o adapter Postgres entrar (`schema.sql` já está pronto).

O status permanece correto mesmo assim: o id da doação é enviado como
`MerchantOrderId`, então `GET /1/sales?merchantOrderId=` recupera a transação
direto da Cielo. A Cielo é a fonte de verdade; o repositório é cache.
