import 'normalize.css/normalize.css';

import './styles/scaffolding.scss';
import './styles/typography.scss';

import Vue from 'vue';
import App from './app.vue';

new Vue({
  el: '#app',
  render: h => h(App),
});
