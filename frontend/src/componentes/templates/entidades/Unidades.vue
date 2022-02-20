<template>
	<div class="unidades">
		<TituloPagina
			icone="fa-solid fa-apple-whole"
			titulo="Unidade"
			sub="Aqui pode alterar as informações das unidades"
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
					<b-form-group label="Código" label-for="unidade-idUnidadew">
						<b-form-input id="unidade-idUnidade" type="number"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Descrição" label-for="especie-nome">
						<b-form-input
							id="especie-nome"
							type="text"
							placeholder="Informe a unidade..."
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
		nome: "Unidades",
		components: { TituloPagina, BotaoCrud },
		computed: mapState(["unidaes"]),
		data: function () {
			return {
				unidade: {},
				unidades: [],
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
			carregarUnidade(unidade) {
				this.unidade = { ...unidade };
			},
			carregarUnidades() {
				axios.get(`${baseApi}unidades`).then((unidades) => {
					this.unidades = unidades.data;
				});
			},
			limpar() {
				this.unidade = {};
			},
			incluir() {
				axios
					.post(`${baseApi}unidades`, this.unidade)
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