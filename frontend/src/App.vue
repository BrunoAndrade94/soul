<template>
	<div id="app" :class="{ 'esconder-menu': menuVisivel || !usuario }">
		<Cabecalho
			titulo="MV Souluções"
			:esconderToggle="!usuario"
			:esconderMenuUsuario="!usuario"
		/>
		<Menu v-if="usuario" />
		<!-- <Loading v-if="validandoToken" /> -->
		<Conteudo v-else />
		<Rodape />
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";
	import { baseApi, chaveUsuario } from "@/global";
	import Cabecalho from "./componentes/templates/Cabecalho.vue";
	import Menu from "./componentes/templates/menu/Menu";
	import Conteudo from "./componentes/templates/Conteudo.vue";
	import Rodape from "./componentes/templates/Rodape.vue";
	import Loading from "./componentes/templates/Loading.vue";

	export default {
		name: "App",
		components: {
			Cabecalho,
			Menu,
			Conteudo,
			Rodape,
			Loading,
		},
		computed: mapState(["menuVisivel", "usuario"]),
		data: function () {
			return {
				validandoToken: true,
			};
		},
		methods: {
			async validarToken() {
				this.validandoToken = true;

				const json = localStorage.getItem(chaveUsuario);
				const dadosUsuario = JSON.parse(json);
				this.$store.commit("definirUsuario", null);

				if (!dadosUsuario) {
					this.validandoToken = false;
					return this.$router.push({ path: "logar" });
				}

				const res = await axios.post(`${baseApi}validarToken`, dadosUsuario);

				if (res.data) {
					this.$store.commit("definirUsuario", dadosUsuario);
				} else {
					localStorage.removeItem(chaveUsuario);
					this.$router.push({ path: "logar" });
				}
				this.validandoToken = false;
			},
		},
		created() {
			this.validarToken();
		},
	};
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.esconder-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>