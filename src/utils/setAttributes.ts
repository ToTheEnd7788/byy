import { isObj, isStr, warn } from "../utils/index";

let eventFilter = {
  stop: e => {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  },

  prevent: e => {
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
  }
};

function setStyle(el, style) {
  for (let key in style) {
    if (el.style.setAttribute) el.style.setAttribute(key, style[key]);
    else el.style[key] = style[key];
  }
}

function setAttibutes(el: HTMLElement, node: object, ctx) {
  for (let key in node) {
    if (key === 'className') {
      if (isObj(node[key])) {
        el[key] = Object.keys(node[key]).filter(item => {
          return node[key][item];
        }).join(" ");
      } else if (isStr(node[key])) {
        el[key] = node[key];
      } else {
        warn(`The className must be string or object`);
      }
    } else if (key === 'on') {
      setEvents(el, node[key], ctx);
    } else if (key === 'style') {
      setStyle(el, node[key]);
    } else if (key !== 'component' && key !== 'nodeType' && key !== 'children' && key !== "tag") {
      el[key] = node[key];
    }
  }
}

function setEvents(el: HTMLElement, event: object, ctx): void {
  for (let name in event) {
    let [n, type] = name.split('.'),
      [handler, ...params] = event[name];

      n = n === 'input' && XDomainRequest
        ? "properchange"
        : n;

    el[`on${n}`] = null;

    el[`on${n}`] = e => {
      let evt = e || window.event;
      evt.target = evt.target || evt.srcElement;

      if (type) {
        eventFilter[type] && eventFilter[type](evt);
      }

      params = params.reduce((acc, item) => {
        if (item === '$event') acc.push(evt);
        else acc.push(item);
        return acc;
      }, []);

      handler && handler.apply(ctx, params);
    }
  }
}


export{ setStyle, setAttibutes, setEvents };