import { isObj, isStr } from "../utils/index";
import Component from "./component";

function compareObjs(newObjs, oldObjs) {
  let maps: any = {};

  for (let key in newObjs) {
    if (isStr(newObjs[key])) {
      if (newObjs[key] !== oldObjs[key]) {
        maps = Object.assign({}, maps, {
          [key]: newObjs[key]
        });
      }
    } else {
      for (let inner in newObjs[key]) {
        if (newObjs[key][inner] !== oldObjs[key][inner]) {
          maps[key] = Object.assign({}, (maps && maps[key]), {
            [inner]: newObjs[key][inner]
          })
        }
      }
    }
  }

  return maps;
}

function diffChildren(n, o, deep) {
  let m: any = {};

  if (n && o) {
    if (n.length === o.length) {
      for (let i = 0; i < n.length; i++) {
        let res = diffCommonAttrs(n[i], o[i], `${deep}-${i}`);
        if (Object.keys(res).length > 0) {
          m = Object.assign({}, m, res);
        }
      }
    } else if (n.length > o.length) {
      for (let i = 0; i < n.length; i++) {
        if (i <= o.length - 1) {
          let res = diffCommonAttrs(n[i], o[i], `${deep}-${i}`);
          if (Object.keys(res).length > 0) {
            m = Object.assign({}, m, res);
          }
        }
      }

      m[deep] = Object.assign({}, m[deep], {
        add: n.slice(o.length - n.length)
      });
    } else if (n.length < o.length) {
      for (let i = 0; i < n.length; i++) {
        let res = diffCommonAttrs(n[i], o[i], `${deep}-${i}`);
        if (Object.keys(res).length > 0) {
          m = Object.assign({}, m, res);
        }
      }

      m[deep] = Object.assign({}, m[deep], {
        remove: o.length - n.length
      });
    }

    return m;
  }
}

function diffCommonAttrs(
  { on, bind, children, nodeType, tag, text, ...newObjs },
  {
    on: oon, bind: obind, children: ochildren, nodeType: onodeType,
    tag: otag, text: otext, ...oldObjs },
  deep: string
) {
  let m: any = {};

  if (nodeType === onodeType) {
    if (nodeType === 1 || nodeType === "component") {
      if (tag === otag) {
        let attrsRes = compareObjs(newObjs, oldObjs),
          childrenRes = diffChildren(children, ochildren, deep);

        if (Object.keys(attrsRes).length > 0) {
          m[deep] = Object.assign({}, m[deep], attrsRes);
        }

        if (childrenRes) {
          m = Object.assign({}, m, childrenRes);
        }

      } else {
        if (nodeType === 1) {
          m[deep] = Object.assign({}, m[deep], {
            freshEle: deep
          });
        } else if (nodeType === "component") {
          m[deep] = Object.assign({}, m[deep], {
            updateComponent: `这里是要被替换的component的 名字 key ${tag}` 
          });
        }
      }
    } else if (nodeType === 3) {
      if (text !== otext) {
        m[deep] = Object.assign({}, m[deep], {
          text
        });
      }
    }
  } else {
    m[deep] = Object.assign({}, m[deep], {
      freshEle: deep
    });
  }

  return m;
}

function differ(n, o, vm) {
  let paches = diffCommonAttrs(n, o, "0");

  if (Object.keys(paches).length > 0) {
    addPatch(paches, vm, n, o);
  }
}

function getTargetElement(pos, el) {
  let res = el,
    posList = pos.split('-');
  for (let i = 1; i < posList.length; i++) {
    res = res.childNodes[posList[i]];
  }

  return res;
}

function addPatch(paches, vm, n, o) {
  for (let pos in paches) {
    let target = getTargetElement(pos, vm.$el);
    for (let key in paches[pos]) {
      if (key === 'remove') {
        for (let i = 0; i < paches[pos][key]; i++) {
          target.removeChild(target.lastChild);
        }
      } else if (key === 'add') {
        for (let i = 0; i < paches[pos][key].length; i++) {
          if ( paches[pos][key][i].nodeType === "component") {
            let freshComponent = new Component(paches[pos][key][i].component, true);
            target.appendChild(freshComponent.$el);
          } else {
            target.appendChild(vm._createElement(paches[pos][key][i]));
          }
        }

      } else if (key === 'freshEle') {
        let childs = paches[pos][key].split('-'),
          targetVNode = n;

        for (let i = 1; i < childs.length; i++) {
          targetVNode = targetVNode.children[childs[i]];
        }

        if (targetVNode.nodeType === "component") {
          targetVNode.component = new Component(targetVNode.component, true);
          target.parentNode.replaceChild(targetVNode.component.$el, target);
        } else {
          target.parentNode.replaceChild(vm._createElement(targetVNode), target);
        }

      } else if (key === 'text') {
        target.nodeValue = paches[pos][key];
      } else if (key === 'props') {
        let childs = pos.split("-"),
          targetNVNode = n,
          targetOVNode = o;
          
        for (let i = 1; i < childs.length; i++) {
          targetNVNode = targetNVNode.children[childs[i]];
          targetOVNode = targetOVNode.children[childs[i]];
        }

        targetOVNode.component._updateChildComponent(
          targetNVNode.component,
          targetOVNode.component._vNode,
          paches[pos][key]
        );

      } else {
        if (key === 'style') {
          for (let styleName in paches[pos][key]) {
            target[key][styleName] = paches[pos][key][styleName];
          }
        } else if (key === 'className') {
          if (isStr(paches[pos][key])) {
            target[key] = paches[pos][key];
          } else {
            let classNames = Object.keys(paches[pos][key]).filter(item => {
              return paches[pos][key][item];
            });

            target[key] = classNames.join(" ");
          }
        }
      }
    }
  }
}

export default differ;