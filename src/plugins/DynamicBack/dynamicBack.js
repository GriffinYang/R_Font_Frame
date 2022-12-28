import DynamicBack from './src/DynamicBack.vue';
export default {
  install: (app, options) => {
    app.component('dynamic-back', DynamicBack);
    app.directive('colorList', (el, binding, vnode) => {
      let colors = [
        '#7B4B94',
        '#7D82B8',
        '#B7E3CC',
        '#C4FFB2',
        '#460C68',
        '#4B56D2',
        '#F5EBE0',
      ];
      switch (binding.arg) {
        case 'darken':
          colors = options.colorList.darken;
          break;
        case 'lighter':
          colors = options.colorList.lighter;
          break;
        default:
          colors = options.colorList.standard;
          break;
      }
      el.colors = colors;
    });
    app.directive('speed', (el, binding, vnode) => {
      if (options.speed != undefined) el.speed = options.speed;
      else el.speed = 50;
    });
    app.directive('practicalNumber', (el, binding, vnode) => {
      if (options.number != undefined) el.practicalNumber = options.number;
      else el.practicalNumber = 120;
    });
    app.directive('size', (el, binding, vnode) => {
      if (options.size != undefined) el.size = options.size;
      else el.size = 50;
    });
    app.directive('background', (el, binding, vnode) => {
      if (options.background != undefined) el.background = options.background;
      else el.background = '#000';
    });
  },
};
