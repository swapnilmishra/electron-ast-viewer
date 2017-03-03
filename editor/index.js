const babylon = require("babylon");
const jsEl = document.querySelector("#jsContent");
const jsEditorEl = CodeMirror.fromTextArea(jsEl, {
  mode: "javascript",
  theme: "material"
});
jsEditorEl.doc.setValue(
  `//Write your code here and click on View AST button
var i = 0;`
);
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

function saveAndRender(el, { from, to, text, removed, origin }) {
  el.save();
}

module.exports = {
  getAST: function(cb) {
    if (cb) {
      viewAstBtn.addEventListener("click", () => {
        cb(babylon.parse(jsEl.value));
      });
    }
    else {
      return babylon.parse(jsEl.value)
    }
  }
};
// function getAst() {
//   Tree.buildTree(babylon.parse(jsEl.value, parserOptions), "#root");
// }
