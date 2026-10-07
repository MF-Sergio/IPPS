-- Esquema para o adapter Postgres que substitui o repositorio em memoria.
-- Nao contem, e nunca deve conter, numero de cartao nem codigo de seguranca:
-- o PAN e trocado por CardToken na Cielo antes de qualquer persistencia.

CREATE TABLE IF NOT EXISTS donations (
  id                     VARCHAR(36)  PRIMARY KEY,
  amount_cents           INTEGER      NOT NULL CHECK (amount_cents > 0),
  donor_name             VARCHAR(120) NOT NULL,
  donor_email            VARCHAR(254) NOT NULL,
  donor_cpf              CHAR(11)     NOT NULL,
  method                 VARCHAR(10)  NOT NULL
                           CHECK (method IN ('pix', 'cartao', 'boleto')),
  status                 VARCHAR(12)  NOT NULL
                           CHECK (status IN ('pendente', 'autorizada', 'confirmada',
                                             'negada', 'cancelada', 'falhou', 'expirada')),
  payment_id             VARCHAR(36),
  privacy_terms_version  VARCHAR(20)  NOT NULL,
  created_at             TIMESTAMPTZ  NOT NULL,
  updated_at             TIMESTAMPTZ  NOT NULL
);

-- O webhook chega com PaymentId; a consulta por ele precisa ser barata.
CREATE INDEX IF NOT EXISTS donations_payment_id_idx ON donations (payment_id);
CREATE INDEX IF NOT EXISTS donations_created_at_idx ON donations (created_at DESC);

-- Endereco so existe para doacao por boleto, entao mora em tabela propria.
CREATE TABLE IF NOT EXISTS donation_addresses (
  donation_id  VARCHAR(36) PRIMARY KEY REFERENCES donations (id) ON DELETE CASCADE,
  street       VARCHAR(60) NOT NULL,
  number       VARCHAR(10) NOT NULL,
  complement   VARCHAR(30) NOT NULL DEFAULT '',
  district     VARCHAR(30) NOT NULL,
  city         VARCHAR(60) NOT NULL,
  state        CHAR(2)     NOT NULL,
  zip_code     CHAR(8)     NOT NULL,
  country      CHAR(3)     NOT NULL DEFAULT 'BRA'
);

-- Trilha de auditoria das mudancas de status, exigida para prestacao de contas.
CREATE TABLE IF NOT EXISTS donation_status_history (
  id           BIGSERIAL   PRIMARY KEY,
  donation_id  VARCHAR(36) NOT NULL REFERENCES donations (id) ON DELETE CASCADE,
  from_status  VARCHAR(12),
  to_status    VARCHAR(12) NOT NULL,
  source       VARCHAR(20) NOT NULL
                 CHECK (source IN ('create', 'polling', 'webhook', 'expiration')),
  changed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS donation_status_history_donation_idx
  ON donation_status_history (donation_id, changed_at DESC);
