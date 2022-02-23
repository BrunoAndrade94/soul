import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		menuVisivel: false,
		usuario: null,
		produto: null,
		especie: null,
		unidade: null,
		modulo: null,
	},
	mutations: {
		toggleMenu(estado, estaVisivel) {
			if (!estado.usuario) {
				estado.menuVisivel = false;
				return;
			}
			if (estaVisivel === undefined)
				estado.menuVisivel = !estado.menuVisivel;
			else estado.menuVisivel = estaVisivel;
		},
		definirUsuario(estado, usuario) {
			estado.usuario = usuario;
			if (usuario) {
				axios.defaults.headers.common["Authorization"] = `bearer ${
					usuario.token
				}`;
				estado.menuVisivel = true;
			} else {
				delete axios.defaults.headers.common["Authorization"];
				estado.menuVisivel = false;
			}
		},
	},
});
