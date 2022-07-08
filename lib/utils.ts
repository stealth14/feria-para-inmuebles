export const numberOrAny = (value: any) => {
  if (/^[0-9]*$/.test(value)) return Number(value);
  return value;
};

export const parseQuery = (query: any) => {
  let parsedQuery = {};
  for (const entry in query) {
    if (entry === "photos") {
      //undo parse from array to string
      if (typeof query[entry] === "string") {
        parsedQuery = { ...parsedQuery, [entry]: [numberOrAny(query[entry])] };
        continue;
      }
    }

    parsedQuery = { ...parsedQuery, [entry]: numberOrAny(query[entry]) };
  }
  return parsedQuery;
};
