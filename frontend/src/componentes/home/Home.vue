<template>
	<div class="home">
		<TituloPagina
			icone="fa-solid fa-house-chimney-crack"
			titulo=" Boas-Vindas!"
			sub=" Resolvendo seus problemas!"
		/>
		<div class="estatisticas">
			<Estatistica
				titulo="Produtos"
				:valor="estatistica.produtos"
				icone="fa fa-folder"
				cor="#d54d50"
			/>
			<Estatistica
				titulo="Usuários"
				:valor="estatistica.usuarios"
				icone="fa fa-user"
				cor="#008000"
			/>
			<Estatistica
				titulo="Módulos"
				:valor="estatistica.modulos"
				icone="fa fa-file"
				cor="#ff007e"
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
				axios
					.get(`${baseApi}/estatistica`)
					.then((res) => (this.estatistica = res.data));
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