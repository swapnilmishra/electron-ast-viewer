// const data = require("./data").data;
const DEFAULT_MARGIN = 10;
let docFragment = document.createDocumentFragment();
let docRoot;

function createLeafNode(name, level, isRoot) {
  const el = document.createElement("a");
  // not root element
  if (!isRoot) {
    el.classList.add("hide");
    setElementMargin(el, level);
  }
  el.innerText = name;
  el.setAttribute("data-type", "leaf");
  el.classList.add("leaf");
  el.classList.add("element");
  return el;
}

function createRootNode(folderData, level, isRoot) {
  const el = document.createElement("a");
  if (!isRoot) {
    el.classList.add("root");
    el.classList.add("hide");
    setElementMargin(el, level);
  }
  el.innerText = folderData;
  el.setAttribute("data-type", "root");
  el.setAttribute("data-open", false);
  el.classList.add("root");
  el.classList.add("element");
  return el;
}

function createTree(treeData, rootNode) {
  let level = 0;
  docRoot = document.querySelector(rootNode);
  function createComponent(treeElData, el) {
    let newEl;
    if (isLeaf(treeElData)) {
      if (!el) {
        newEl = createLeafNode(treeElData, level, true);
        docFragment.appendChild(newEl);
      } else {
        newEl = createLeafNode(treeElData, level);
        el.appendChild(newEl);
      }
    } else {
      let keys, isDataArray = false;
      if (Array.isArray(treeElData)) {
        keys = treeElData;
        isDataArray = true;
      } else if (typeof treeElData == "object") {
        keys = Object.keys(treeElData);
      }

      let key, elData;
      for (let i = 0; i < keys.length; i++) {
        if (isDataArray) {
          elData = keys[i];
        } else {
          key = keys[i];
          elData = treeElData[key];
        }

        if (isLeaf(elData)) {
          // first level element
          if (!el) {
            newEl = createLeafNode(`${key}:${elData}`, level, true);
            docFragment.appendChild(newEl);
          } else {
            newEl = createLeafNode(`${key}:${elData}`, level);
            el.appendChild(newEl);
          }
        } else {
          // first level element
          if (!el) {
            if (!isDataArray) {
              newEl = createRootNode(key, level, true);
              docFragment.appendChild(newEl);
            }
          } else {
            if (!isDataArray) {
              newEl = createRootNode(key, level);
              el.appendChild(newEl);
            }
          }

          if (Object.keys(elData).length > 0 || isDataArray) {
            level++;
            createComponent(elData, newEl || el);
          } else {
            // reached end of this subtree, reset the level to 0
            level = 0;
          }
        }
      }
    }
  }

  createComponent(treeData);
  docRoot.innerHTML = '';
  docRoot.appendChild(docFragment);
}

function addTreeClickHandlers() {
  docRoot.removeEventListener("click", () => {});
  docRoot.addEventListener("click", function(event) {
    const eventTarget = event.target;
    if (eventTarget && eventTarget.getAttribute("data-type") === "root") {
      const type = eventTarget.getAttribute("data-type");
      showHideFolderChildrens(eventTarget);
    }
  });
}

function showHideFolderChildrens(el) {
  const childrens = el.children;
  el.classList.toggle("open");
  for (let i = 0; i < childrens.length; i++) {
    childrens[i].classList.toggle("hide");
  }
}

function setElementMargin(el, level) {
  if (el && el.style) {
    el.style.marginLeft = level + DEFAULT_MARGIN + "px";
  }
}

function isLeaf(item) {
  const t = typeof item;
  return t == "number" || t == "string" || item == null || t == "boolean";
}

module.exports = {
  buildTree: function(data, rootNode) {
    createTree(data, rootNode);
    addTreeClickHandlers();
  }
};
