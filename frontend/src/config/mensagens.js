import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
	iconPack: "fontawesome",
	position: "top-center",
	duration: 3000,
});

Vue.toasted.register(
	"sucessoPadrao",
	(msg) => (!msg.msg ? "Operação realizada com sucesso!" : msg.msg),
	{ type: "success", icon: "check" }
);

Vue.toasted.register(
	"erroPadrao",
	(msg) => (!msg.msg ? "Ops... erro inesperado!" : msg.msg),
	{ type: "error", icon: "times" }
);
