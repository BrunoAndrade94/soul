import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../../componentes/home/Home";
import PaginasAdmin from "../../componentes/templates/admin/PaginasAdmin";

Vue.use(VueRouter);

const rotas = [
	{
		name: "home",
		path: "/",
		component: Home,
	},
	{
		name: "paginasAdmin",
		path: "/admin",
		component: PaginasAdmin,
	},
];

export default new VueRouter({
	mode: "history",
	routes: rotas,
});
