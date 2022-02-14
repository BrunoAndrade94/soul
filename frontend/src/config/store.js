import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		menuVisivel: true,
	},
	mutations: {
		toggleMenu(estado, estaVisivel) {
			if (estaVisivel === undefined)
				estado.menuVisivel = !estado.menuVisivel;
			else estado.menuVisivel = estaVisivel;
		},
	},
});
