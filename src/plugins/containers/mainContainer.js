import MainContainer from './src/MainContainer.vue';

MainContainer.install = function (Vue) {
  Vue.component(MainContainer.name, MainContainer);
};
export default MainContainer;
