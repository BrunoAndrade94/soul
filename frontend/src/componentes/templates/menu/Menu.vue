<template>
	<aside class="menu" v-show="!menuVisivel">
		<div class="menu-filtro">
			<i class="fa fa-search fa-lg" />
			<input
				type="text"
				placeholder="Procurar..."
				v-model="filtrarArvore"
				class="campo-filtro"
			/>
		</div>
		<Arvore
			:data="dadosDaArvore"
			:filter="filtrarArvore"
			:options="opcoesDaArvore"
			ref="arvore"
		/>
	</aside>
</template>

<script>
	import { mapState } from "vuex";
	import Arvore from "liquor-tree";
	import { baseApi } from "@/global";
	import axios from "axios";

	export default {
		name: "Menu",
		components: { Arvore },
		computed: mapState(["menuVisivel"]),
		data: function () {
			return {
				filtrarArvore: "",
				dadosDaArvore: this.obterDadosDaArvore(),
				opcoesDaArvore: {
					propertyNames: { text: "nome" },
					filter: { emptyText: "não encontrei nada por aqui.." },
				},
			};
		},
		methods: {
			async obterDadosDaArvore() {
				const url = `${baseApi}arvore/modulos`;
				return axios.get(url).then((res) => res.data);
			},
		},
	};
</script>

<style>
	.menu {
		grid-area: menu;
		background: linear-gradient(to right, #232526, #414345);

		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
	.menu a,
	.menu a:hover {
		color: #fff;
		text-decoration: none;
	}
	.menu .tree-node.selected > .tree-content,
	.menu .tree-node .tree-content:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
	.tree-arrow.has-child {
		filter: brightness(2);
	}
	.menu .menu-filtro {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px;
		padding-bottom: 8px;
		border-bottom: 1px solid #aaa;
	}
	.menu .menu-filtro i {
		color: #aaa;
		margin-right: 10px;
	}
	.menu input {
		color: #ccc;
		font-size: 1.3rem;
		border: 0;
		outline: 0;
		width: 100%;
		background: transparent;
	}
	.tree-filter-empty {
		color: #ccc;
		margin-left: 20px;
		font-size: 1.3rem;
	}
</style>