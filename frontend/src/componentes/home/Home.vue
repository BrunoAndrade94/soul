<template>
	<div class="home">
		<TituloPagina
			icone="fa-solid fa-house-chimney-crack"
			titulo=" Boas-Vindas!"
			sub=" Resolvendo seus problemas!"
		/>
		<div class="estatisticas">
			<Estatistica
				titulo="Usuários:"
				:valor="estatistica.usuarios"
				icone="fa-solid fa-users"
				cor="green"
			/>
			<Estatistica
				titulo="Módulos:"
				:valor="estatistica.modulos"
				icone="fa-solid fa-boxes-stacked"
				cor="purple"
			/>
			<Estatistica
				titulo="Produtos:"
				:valor="estatistica.produtos"
				icone="fa-solid fa-box"
				cor="red"
			/>
			<Estatistica
				titulo="Espécies:"
				:valor="estatistica.especies"
				icone="fa-solid fa-frog"
				cor="black"
			/>
			<Estatistica
				titulo="Unidades:"
				:valor="estatistica.unidades"
				icone="fa-solid fa-umbrella"
				cor="blue"
			/>
		</div>
	</div>
</template>

<script>
	import TituloPagina from "../templates/TituloPagina.vue";
	import Estatistica from "../home/Estatistica.vue";
	import axios from "axios";
	import { baseApi } from "@/global";
	export default {
		nome: "Home",
		components: { TituloPagina, Estatistica },
		data: function () {
			return {
				estatistica: {},
			};
		},
		methods: {
			obterEstatistica() {
				axios.get(`${baseApi}rlt`).then((res) => (this.estatistica = res.data));
			},
		},
		mounted() {
			this.obterEstatistica();
		},
	};
</script>

<style>
	.estatisticas {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
</style>