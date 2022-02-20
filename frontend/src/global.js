import Vue from "vue";

export const chaveUsuario = "__dbamv";
const porta = 3033;
// export const baseApi = "http://localhost:3033/";
// const ip = '192.168.252.47';
const ip = "10.10.0.254";
export const baseApi = `http://${ip}:${porta}/`;

export function mostrarErro(erro) {
	if (erro && erro.response && erro.response.data) {
		Vue.toasted.global.erroPadrao({ msg: erro.response.data });
	} else if (typeof erro === "string") {
		Vue.toasted.global.erroPadrao({ msg: erro });
	} else {
		Vue.toasted.global.erroPadrao();
	}
}

export function mostrarSucesso(msg) {
	if (msg && msg.response && msg.response.data) {
		Vue.toasted.global.sucessoPadrao({ msg: msg.response.data });
	} else if (typeof msg === "string") {
		Vue.toasted.global.sucessoPadrao({ msg: msg });
	} else {
		Vue.toasted.global.sucessoPadrao();
	}
}

export default { baseApi, chaveUsuario, mostrarErro, mostrarSucesso };
