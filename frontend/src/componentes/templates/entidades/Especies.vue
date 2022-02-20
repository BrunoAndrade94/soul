<template>
	<div class="especie">
		<TituloPagina
			icone="fa-solid fa-cogs"
			titulo="Espécies"
			sub="Aqui pode alterar as informações dos espécies"
		/>

		<div class="butao-crud">
			<b-button class="mr-1" variant="success" @click="procurar">
				<i class="fa-solid fa-magnifying-glass" />
			</b-button>
			<b-button class="mr-1" variant="primary" @click="incluir">
				<i class="fa-solid fa-download" />
			</b-button>
			<b-button class="mr-1" variant="warning" @click="atualizar">
				<i class="fa-solid fa-highlighter" />
			</b-button>
			<b-button class="mr-1" variant="danger" @click="excluir">
				<i class="fa-solid fa-trash-can" />
			</b-button>
			<hr />
		</div>
		<b-form>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="especie-id">
						<b-form-input id="especie-id" type="number"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Descrição" label-for="especie-nome">
						<b-form-input
							id="especie-nome"
							type="text"
							placeholder="Informe a espécie..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";
	import { baseApi, mostrarErro, mostrarSucesso } from "@/global";
	import TituloPagina from "../TituloPagina.vue";
	import BotaoCrud from "../BotaoCrud.vue";
	export default {
		nome: "especie",
		components: { TituloPagina, BotaoCrud },
		computed: mapState(["especie"]),
		data: function () {
			return {
				especie: {},
				especies: [],
				campos: [
					{
						key: "id",
						label: "Código",
					},
					{
						key: "nome",
						label: "Descrição",
					},
					{ key: "especie", label: "Espécie" },
					{
						key: "unidade",
						label: "Unidade",
					},
				],
			};
		},
		methods: {
			carregarEspecie(especie) {
				this.especie = { ...especie };
			},
			carregarEspecies() {
				axios.get(`${baseApi}especies`).then((especies) => {
					this.especie = especies.data;
				});
			},
			limpar() {
				this.especie = {};
			},
			incluir() {
				axios
					.post(`${baseApi}especie`, this.especie)
					.then(() => {
						mostrarSucesso("Incluído com sucesso!");
					})
					.catch(mostrarErro);
			},
			atualizar() {},
			procurar() {},
			excluir() {},
		},
	};
</script>

<style>
	.mr-1 {
		size: 10px;
		text-align: left;
		align-items: center;
		justify-items: center;
		border-radius: 20px;
	}
	hr {
		border: 0;
		margin: 10px;
		width: 100%;
		height: 2px;
		background-image: linear-gradient(
			to right,
			rgba(120, 120, 120, 0),
			rgba(120, 120, 120, 0.75),
			rgba(120, 120, 120, 0)
		);
	}
</style>