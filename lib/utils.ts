export const numberOrAny = (value: any) => {
  if (/^[0-9]*$/.test(value)) return Number(value);
  return value;
};

export const parseQuery = (query: any) => {
  let parsedQuery = {};
  for (const entry in query) {
    parsedQuery = { ...parsedQuery, [entry]: numberOrAny(query[entry]) };
  }
  return parsedQuery;
};
