// GET /api/sante : vérifie que les Pages Functions sont bien déployées.
// Ne renvoie aucune donnée sensible.

export const onRequestGet: PagesFunction = () => {
  return Response.json(
    { ok: true },
    { headers: { 'Cache-Control': 'no-store' } },
  );
};
