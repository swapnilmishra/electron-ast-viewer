const Tree = require("../tree/index.js");
const babylon = require("babylon");
const jsEl = document.querySelector("#jsContent");
const jsEditorEl = CodeMirror.fromTextArea(jsEl, {
  mode: "javascript",
  theme: "material"
});
const viewAstBtn = document.querySelector("#viewAst");
const parserOptions = {
  sourceType: "module",
  plugins: [
    "estree",
    "jsx",
    "flow",
    "doExpressions",
    "objectRestSpread",
    "decorators",
    "classProperties",
    "exportExtensions",
    "asyncGenerators",
    "functionBind",
    "functionSent",
    "dynamicImport"
  ]
};

jsEditorEl.on("change", saveAndRender);
// jsEditorEl.doc.setValue(jsValue)

viewAstBtn.addEventListener("click", getAst);

function saveAndRender(el, { from, to, text, removed, origin }) {
  el.save();
}

function getAst() {
  Tree.buildTree(babylon.parse(jsEl.value, parserOptions));
}
