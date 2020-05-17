import 'normalize.css/normalize.css';

import './styles/scaffolding.scss';
import './styles/typography.scss';
import './styles/container.scss';
import './styles/button.scss';
import './components/confirm';

import Vue from 'vue';
import App from './components/app/component.vue';

new Vue({
  el: '#app',
  render: h => h(App),
});
