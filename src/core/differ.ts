import { isObj, isStr } from "../utils/index";

function compareObjs(newObjs, oldObjs) {
  let maps: any = {};

  for (let key in newObjs) {
    if (isStr(newObjs[key])) {
      if (newObjs[key] !== oldObjs[key]) {
        maps = Object.assign(maps, {
          [key]: newObjs[key]
        });
      }
    } else {
      for (let inner in newObjs[key]) {
        if (newObjs[key][inner] !== oldObjs[key][inner]) {
          maps[key] = Object.assign({}, maps[key], {
            [inner]: newObjs[key][inner]
          })
        }
      }
    }
  }

  return maps;
}

function diffCommonAttrs(
  { on, bind, children, nodeType, tag, text, ...newObjs },
  {
    on: oon, bind: obind, children: ochildren, nodeType: onodeType,
    tag: otag, text: otext, ...oldObjs },
  deep
) {
  let m: any = {};

  if (nodeType === onodeType) {
    if (nodeType === 1 || nodeType === "component") {
      if (tag === otag) {
        // 首先比对objs
        let attrsRes = compareObjs(newObjs, oldObjs);

        if (Object.keys(attrsRes).length > 0) {
          m[deep] = Object.assign({}, m[deep], {
            common: attrsRes
          })
        }

      } else {
        if (nodeType === 1) {
          m[deep] = Object.assign({}, m[deep], {
            replaceEle: `这里添加对应${deep}的重新生成的元素`
          });
        } else if (nodeType === "component") {
          m[deep] = Object.assign({}, m[deep], {
            replaceComponent: `这里是要被替换的component的 名字 key ${tag}`
          });
        }
      }
    } else if (nodeType === 3) {
      if (text !== otext) {
        m = Object.assign(m, {
          text: {
            [deep]: text
          }
        })
      }
    }
  } else {
    m[deep] = Object.assign({}, m[deep], {
      replaceEle: `这里添加对应${deep}的重新生成的元素`
    });
  }

  return m;
}

function differ(n, o, vm) {
  console.log(999999, diffCommonAttrs(o, n, "0"));
}

export default differ;