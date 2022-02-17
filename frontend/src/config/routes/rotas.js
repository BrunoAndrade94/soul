import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../../componentes/home/Home";
import Autenticar from "../../componentes/auth/Autenticar";
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
	{
		name: "autenticar",
		path: "/signup",
		component: Autenticar,
	},
];

export default new VueRouter({
	mode: "history",
	routes: rotas,
});
