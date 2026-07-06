export function getClientIp(req) {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "")
    .split(",")
    .at(0)
    ?.trim();

  return (
    forwardedFor ||
    String(req.headers["cf-connecting-ip"] || "") ||
    req.socket.remoteAddress ||
    "unknown"
  );
}
