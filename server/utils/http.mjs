export function sendJson(res, status, payload, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(payload));
}

export function handleError(res, error) {
  const status = error?.statusCode || 500;
  const code = error?.code || "INTERNAL_ERROR";
  const message =
    status >= 500
      ? "Não foi possível processar sua solicitação agora."
      : error.message;

  if (status >= 500) {
    console.error("Erro na API", {
      code,
      status,
      message: error?.message,
    });
  }

  sendJson(
    res,
    status,
    {
      error: true,
      code,
      message,
      details: error?.details,
    },
    { "Cache-Control": "no-store" },
  );
}

export function httpError(statusCode, message, code) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}
