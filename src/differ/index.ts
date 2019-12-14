import "../utils/shim";
import { isStr } from "../utils/index";
import { setStyle, setEvents } from "../utils/setAttributes";
import { Component }  from "../core/component";

function diff(n, o, vm) {
  let paches = comparer(n, o, "0");

  if (paches) {
    addPatch(paches, vm, n, o);
  }
}

function getTargetElement(el, pos) {
  let list = pos.split('-');

  for (let i = 1; i < list.length; i++) {
    el = el.childNodes[list[i]];
  }

  return el;
}

function getTargetComponent(vNode, pos) {
  let list = pos.split('-'),
    res = vNode;

  for (let i = 1; i < list.length; i++) {
    res = res.children[list[i]];
  }

  return res.component;
}

function addPatch(paches, vm, n, o) {
  for (let p in paches) {
    let targetEle = getTargetElement(vm.$el, p);

    for (let k in paches[p]) {
      if (k === "props") {
        let component = getTargetComponent(n, p);
        component._updateChildComponent(paches[p][k]);
      } else if (k === "style") {
        setStyle(targetEle, paches[p][k]);
      } else if (k === "replace") {
        let freshEle;

        if (paches[p][k].nodeType === "component") {
          let component = Object.assign(vm.components[paches[p][k].tag], {
            props: paches[p][k].props
          });

          paches[p][k].component = new Component(component, vm, vm.$Byy);
          freshEle = paches[p][k].component.$el;
        } else {
          freshEle = vm._createElement(paches[p][k]);
        }
        targetEle.parentNode.replaceChild(freshEle, targetEle);
      } else if (k === "add") {
        for (let node of paches[p][k]) {
          if (node.nodeType === "component") {
            targetEle.appendChild(node.component.$el);
          } else {
            targetEle.appendChild(vm._createElement(node));
          }
        }
      } else if (k === "remove") {
        for (let i = 0; i < paches[p][k] ; i++) {
          let lastChild = targetEle.childNodes[targetEle.childNodes.length - 1];
          targetEle.removeChild(lastChild);
        }
      } else if (k === "delete") {
        targetEle.parentNode.removeChild(targetEle);
      } else if (k === "on") {
        setEvents(targetEle, paches[p][k], vm);
      } else {
        targetEle[k] = paches[p][k];
      }
    }
  }
}


function compareChilds(n, o, d) {
  let res = {};

  if (n && !o) {
    res[d] = Object.assign({}, res[d], {
      add: [n]
    });
  } else if (o && !n) {
    res[d] = Object.assign({}, res[d], {
      delete: true
    });
  } else if (n && o) {
    if (n.length > o.length) {
      res[d] = Object.assign({}, res[d], {
        add: n.slice(o.length - n.length)
      });

      n = n.slice(0, o.length - n.length);
    } else if (n.length < o.length) {
      res[d] = Object.assign({}, res[d], {
        remove: o.length - n.length
      });
    }

    for (let i = 0; i < n.length; i++) {
      let m = comparer(n[i], o[i], `${d}-${i}`);

      if (m) {
        res = Object.assign({}, res, m);
      }
    }
  }

  return Object.keys(res).length > 0
    ? res
    : null;
}

function compareObjs(n, o) {
  let res = {};

  for (let k in n) {
    if (isStr(n[k])) {
      res = Object.assign({}, res, {
        [k]: n[k]
      });
    } else {
      if (k === "className") {
        res[k] = Object.keys(n[k]).reduce((acc, item) => {
          if (n[k][item]) {
            acc += ` ${item}`;
          }

          return acc;
        }, "").slice(1);
      } else {
        for (let inner in n[k]) {
          if (n[k] && o[k]) {
            let same = true;

            if (k === "on") same = sameEvents(n[k][inner], o[k][inner]);
            else same = n[k][inner] === o[k][inner];

            if (!same) {
              res[k] = Object.assign({}, res[k], {
                [inner]: n[k][inner]
              });
            }
          }
        }
      }
    }
  }

  return Object.keys(res).length > 0
    ? res
    : null;
}

function sameEvents(newArr, oldArr) {
  let result = true;

  if (newArr.length !== oldArr.length) result = false;
  else {
    for (let i = 1; i < newArr.length; i++) {
      if (newArr[i] !== oldArr[i]) {
        result = false;
        break;
      }
    }
  }

  return result;
}

function comparer(n, o, d) {
  let res = {},
    {
      bind,
      children,
      nodeType,
      tag,
      nodeValue,
      component,
      ...newObj
    } = n,
    {
      bind: obind,
      children: ochildren,
      nodeType: onodeType,
      tag: otag,
      nodeValue: onodeValue,
      component: ocomponent,
      ...oldObj
    } = o,
    childrenRes = compareChilds(children, ochildren, d);
  
  res[d] = compareObjs(newObj, oldObj);

  if (childrenRes) res = Object.assign({}, res, childrenRes);

  if (nodeType !== onodeType || tag !== otag) {
    res[d] = Object.assign({}, res[d], {
      replace: n
    });
  } else if (nodeValue !== onodeValue) {
    res[d] = Object.assign({}, res[d], {
      nodeValue
    });
  }

  return Object.keys(res).length > 0
    ? res
    : null;
}

export { diff };