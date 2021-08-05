const validateInput = (inputData) => {
  const str = inputData.value;
  const regExp = inputData.pattern;
  if (regExp === null) {
    return true; //不須驗證validation
  }
  console.log(str.search(regExp));
  console.log(str.search(regExp) !== -1);
  return str.search(regExp) !== -1;
};

export { validateInput };
