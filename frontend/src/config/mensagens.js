import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
	// theme: "bubble",
	theme: "outline",
	iconPack: "fontawesome",
	position: "top-center",
	duration: 3000,
});

Vue.toasted.register(
	"sucessoPadrao",
	(msg) => (!msg.msg ? "Operação realizada com sucesso!" : msg.msg),
	// { type: "success", icon: "check" }
	{ type: "success", icon: "circle-check" }
);

Vue.toasted.register(
	"erroPadrao",
	(msg) => (!msg.msg ? "Ops... erro inesperado!" : msg.msg),
	// { type: "error", icon: "times" }
	{ type: "error", icon: "circle-xmark" }
);

// SEM USO, NAO FUNCIONA
Vue.toasted.register(
	"atualizadoComSucesso",
	(objeto) => `${objeto.msg} atualizado com sucesso!`,
	{ type: "success", icon: "times" }
);
