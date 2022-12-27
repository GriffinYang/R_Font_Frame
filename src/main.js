import { createApp } from 'vue  ';
import App from './App.vue';
import dynamicBack from './plugins/DynamicBack/dynamicBack';

const app = createApp(App);

app.use(dynamicBack, {
  colorList: {
    lighter: ['#FBE7C6', '#B4F8C8', '#A0E7E5', '#FFAEBC'],
    darken: ['#050A30', '#000C66', '#0000FF', '#7EC8E3'],
    standard: ['#05445E', '#189AB4', '#75E6DA', '#D4F1F4'],
  },
});

app.mount('#app');
