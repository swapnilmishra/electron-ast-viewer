// const data = require("./data").data;
let docFragment = document.createDocumentFragment();
let docRoot = document.querySelector("#root");

function createFile(name, level, isRoot) {
  const el = document.createElement("a");
  // not root element
  if (!isRoot) {
    el.classList.add("hide");
    el.style.paddingLeft = level + 5 + "px";
  }
  el.innerText = name;
  el.setAttribute("data-type", "file");
  el.classList.add("file");
  el.classList.add("element");
  return el;
}

function createFolder(folderData, level, isRoot) {
  const el = document.createElement("a");
  if (!isRoot) {
    el.classList.add("folder");
    el.classList.add("hide");
    el.style.marginLeft = level + 5 + "px";
  }
  // el.setAttribute("_id", folderData._id);
  el.innerText = folderData;
  el.setAttribute("data-type", "folder");
  el.setAttribute("data-open", false);
  el.classList.add("folder");
  el.classList.add("element");
  return el;
}

function createTree(treeData) {
  let level = 0;

  function createComponent(treeElData, el) {
    let newEl;
    if (isLeaf(treeElData)) {
      if (!el) {
        newEl = createFile(treeElData, level, true);
        docFragment.appendChild(newEl);
      } else {
        newEl = createFile(treeElData, level);
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
            newEl = createFile(`${key}:${elData}`, level, true);
            docFragment.appendChild(newEl);
          } else {
            newEl = createFile(`${key}:${elData}`, level);
            el.appendChild(newEl);
          }
        } else {
          // first level element
          if (!el) {
            if (!isDataArray) {
              newEl = createFolder(key, level, true);
              docFragment.appendChild(newEl);
            }

            // else newEl = createFolder(key, level, true);
          } else {
            if (!isDataArray) {
              newEl = createFolder(key, level);
              el.appendChild(newEl);
            }

            // else newEl = createFolder(key, level);
          }
          if (Object.keys(elData).length > 0 || isDataArray) {
            level++;
            createComponent(elData, newEl || el);
          } else
            // reached end of this subtree, reset the level to 0
            level = 0;
        }
      }
    }
  }

  createComponent(treeData);
  docRoot.appendChild(docFragment);
}

function addTreeClickHandlers() {
  docRoot.removeEventListener("click");
  docRoot.addEventListener("click", function(event) {
    const eventTarget = event.target;
    if (eventTarget && eventTarget.getAttribute("data-type") === "folder") {
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

function setElementPadding(el, level) {
  if (el && el.style) {
    el.style.paddingLeft = level + "px";
  }
}

function isLeaf(item) {
  const t = typeof item;
  return t == "number" || t == "string" || item == null || t == "boolean";
}

module.exports = {
  buildTree: function(data) {
    createTree(data);
    addTreeClickHandlers();
  }
};
