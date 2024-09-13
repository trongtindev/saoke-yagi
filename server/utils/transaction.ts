export const findTransaction = defineCachedFunction(
  async (
    filter: {
      search?: string | undefined;
    },
    options: {
      limit: number;
      offset: number;
      sortBy?: { [key: string]: 'desc' | 'asc' };
    },
  ) => {
    const db = await getDb();
    const match: any = {};

    if (filter.search) {
      match.$text = { $search: `"${filter.search}"` };
    }

    const items = await db
      .collection('transactions')
      .find(match)
      .limit(options.limit)
      .skip(options.offset)
      .sort(options.sortBy ?? { amount: 'desc' })
      .toArray();
    const total = await db.collection('transactions').countDocuments(match);
    return { total, items };
  },
  {
    name: 'findTransaction',
    maxAge: import.meta.dev ? 0 : 60 * 60 * 3,
    getKey: (filter, options) => {
      filter ??= {};
      options ??= {};
      return Buffer.from(JSON.stringify({ ...filter, ...options })).toString(
        'base64',
      );
    },
    base: 'cache',
  },
);
