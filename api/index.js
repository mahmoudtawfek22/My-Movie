export default async (req, res) => {
  const { reqHandler } = await import('../dist/Mymovie/server/server.mjs');
  return reqHandler(req, res);
};
