export default defineEventHandler(async (e) => {
  const query = getQuery(e);

  let limit = 25;
  let offset = 0;
  let search = undefined;
  const sortBy: any = { date: 'desc' };

  if (typeof query.limit == 'string') {
    limit = parseInt(query.limit);
    if (limit > 100) limit = 100;
  }

  if (typeof query.offset == 'string') {
    offset = parseInt(query.offset);
    if (offset < 0) offset = 0;
  }

  if (typeof query.search == 'string' && query.search.length < 250) {
    search = query.search;
  }

  if (typeof query.sortBy == 'string') {
    try {
      const elements: { key: string; order: string }[] = JSON.parse(
        query.sortBy,
      );

      for (const element of elements) {
        if (!['date', 'amount'].includes(element.key)) {
          continue;
        }
        if (!['asc', 'desc'].includes(element.order)) {
          continue;
        }
        sortBy[element.key] = element.order;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* ignore */
    }
  }

  return await findTransaction({ search }, { limit, offset, sortBy });
});
