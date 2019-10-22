interface State {
  (): Object;
}

interface $CTRL {
  (name: string, value: any): void;
}

interface $WATCHER_CALLBACK {
  (newVal: any, oldVal: any): void;
}

interface $WATCHER {
  (name: string, callback: $WATCHER_CALLBACK): void; 
}

interface Moon {
  $el: HTMLElement;
  $set: $CTRL;
  $get: $CTRL;
  $options: M_Options;
  $watcher: $WATCHER;
  [name: string]: any;
}

interface M_Options {
  el: string;
  state?: State;
  methods?: Object;
  props?: Object;
  name?: string;
  watcher: Object;
  componentWillInit?: Function;
  componentDidInit?: Function;
  componentWillUpdate?: Function;
  componentDidUpdate?: Function;
  componentWillDestroy?: Function;
  componentDidDestroy?: Function;
  render?: Function;
}