import "font-awesome/css/font-awesome.css";
import Vue from "vue";

import App from "./App";

import "./config/bootstrap";
import "./config/mensagens";
import store from "./config/store";
import rotas from "./config/routes/rotas";

Vue.config.productionTip = false;

new Vue({
	store: store,
	router: rotas,
	render: (h) => h(App),
}).$mount("#app");
