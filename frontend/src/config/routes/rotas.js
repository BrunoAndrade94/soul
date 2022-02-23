import Vue from "vue";
import VueRouter from "vue-router";

import { chaveUsuario } from "@/global";
import Home from "../../componentes/home/Home";
import Autenticar from "../../componentes/auth/Autenticar";
import PaginasAdmin from "../../componentes/admin/PaginasAdmin";
import Usuarios from "../../componentes/templates/config/Usuarios";
import PaginasProduto from "../../componentes/templates/entidades/PaginasProduto";

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
		meta: { requerAdmin: true },
	},
	{
		name: "autenticar",
		path: "/logar",
		component: Autenticar,
	},
	{
		name: "configUsuario",
		path: "/configUsuario",
		component: Usuarios,
	},
	{
		name: "produtos",
		path: "/produtos",
		component: PaginasProduto,
	},
];

const rota = new VueRouter({
	mode: "history",
	routes: rotas,
});

rota.beforeEach((para, onde, proximo) => {
	const json = localStorage.getItem(chaveUsuario);

	if (para.matched.some((dados) => dados.meta.requerAdmin)) {
		const usuario = JSON.parse(json);
		return usuario && usuario.admin ? proximo() : proximo({ path: "/" });
	} else {
		proximo();
	}
});

export default rota;
