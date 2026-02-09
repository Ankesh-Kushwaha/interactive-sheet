export const calcProgress = (qs = []) =>
  qs.length
    ? Math.round((qs.filter((q) => q.done).length / qs.length) * 100)
    : 0;
