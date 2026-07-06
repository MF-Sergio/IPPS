export function getGatewayErrorMessage(payload) {
  if (!payload) {
    return "Resposta sem JSON";
  }

  return payload.message || payload.error || "Erro sem mensagem";
}
