import Vue from "vue";

export const chaveUsuario = "__dbamv";
// export const baseApi = "http://localhost:3033/";
export const baseApi = "http://192.168.252.47:3033/";

export function mostrarErro(erro) {
	if (erro && erro.response && erro.response.data) {
		Vue.toasted.global.erroPadrao({ msg: erro.response.data });
	} else if (typeof erro === "string") {
		Vue.toasted.global.erroPadrao({ msg: erro });
	} else {
		Vue.toasted.global.erroPadrao();
	}
}

export default { baseApi, chaveUsuario, mostrarErro };
