import { toHtml, icon } from "@fortawesome/fontawesome-svg-core";

const route = "http://localhost:3100"; //"";

const validateInput = (inputData) => {
  const str = inputData.value;
  const regExp = inputData.pattern;
  console.log("------------")
  console.log(str);
  console.log(regExp);
  if (regExp === null) {
    return true; //不須驗證validation
  }
  return str.search(regExp) !== -1;
};

const getSVGURI = (faIcon, color) => {
  const abstract = icon(faIcon).abstract[0];
  if (color) abstract.children[0].attributes.fill = color;
  return `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
};


export { validateInput, route, getSVGURI };
