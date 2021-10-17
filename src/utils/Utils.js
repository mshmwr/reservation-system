import { toHtml, icon } from "@fortawesome/fontawesome-svg-core";

const route = "http://localhost:3100"; //""

const validateInput = (formItem, inputValue) => {
  const regExp = formItem.pattern;
  if (regExp === null) {
    return true; //不須驗證validation
  }

  const str = inputValue[formItem.name];
  return str.search(regExp) !== -1;
};

const getSVGURI = (faIcon, color) => {
  const abstract = icon(faIcon).abstract[0];
  if (color) abstract.children[0].attributes.fill = color;
  return `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
};

const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const reverseDate = (date) => {
  let dates = date
    .split("-")
    .reverse()
    .map((num) => num.padStart(2, "0")); //十位數補零
  return dates.join("-");
};

export { validateInput, route, getSVGURI, deepCopy, reverseDate };
