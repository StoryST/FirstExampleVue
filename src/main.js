import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI';
import router from '@/components/router/router';
import directives from '@/components/directives';
import store from '@/components/store';

const app = createApp(App);
 
components.forEach(component => {
  app.component(component.name, component)
});

directives.forEach(directive => {
  app.directive(directive.name, directive);
})

app
   .use(router)
   .use(store)
   .mount('#app');
