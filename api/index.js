export default async (req, res) => {
  const { reqHandler } = await import('../dist/myMovie/server/server.mjs');
  return reqHandler(req, res);
};
