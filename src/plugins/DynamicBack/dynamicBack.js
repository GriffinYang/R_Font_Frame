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
  },
};
