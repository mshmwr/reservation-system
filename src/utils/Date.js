const TODAY_DATE = (() => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const today = localISOTime.slice(0, 10);
  return today;
})();

export { TODAY_DATE };
