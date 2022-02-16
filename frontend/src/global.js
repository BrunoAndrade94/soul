import Vue from "vue";

export const baseApi = "http://localhost:3033/";

export function mostrarErro(erro) {
	if (erro && erro.response && erro.responde.data) {
		Vue.toasted.global.erroPadrao({ msg: erro.response.data });
	} else if (typeof erro === "string") {
		Vue.toasted.global.erroPadrao({ msg: erro });
	} else {
		Vue.toasted.global.erroPadrao();
	}
}

export default { baseApi, mostrarErro };
