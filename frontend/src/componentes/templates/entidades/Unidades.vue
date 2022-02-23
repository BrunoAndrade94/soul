<template>
	<div class="unidades">
		<TituloPagina
			icone="fa-solid fa-apple-whole"
			titulo="Unidades"
			sub="Aqui pode alterar as informações das unidades"
		/>

		<div class="butao-crud">
			<b-button
				class="mr-1"
				variant="success"
				@click="obter"
				v-show="modo === 'incluir'"
			>
				<i class="fa-solid fa-magnifying-glass" />
			</b-button>
			<b-button
				class="mr-1"
				variant="primary"
				@click="incluir"
				v-show="modo === 'incluir'"
			>
				<i class="fa-solid fa-download" />
			</b-button>
			<b-button
				class="mr-1"
				variant="warning"
				@click="atualizar"
				v-show="modo === 'opcoes'"
			>
				<i class="fa-solid fa-highlighter" />
			</b-button>
			<b-button
				class="mr-1"
				variant="danger"
				@click="excluir"
				v-show="modo === 'opcoes'"
			>
				<i class="fa-solid fa-trash-can" />
			</b-button>
			<hr />
		</div>
		<b-form>
			<b-row>
				<b-col md="3" sm="3">
					<b-form-group label="Código" label-for="unidade-id">
						<b-form-input
							v-model="unidade.id"
							:readonly="true"
							id="unidade-id"
							type="number"
							placeholder="#"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Descrição" label-for="unidade-nome">
						<b-form-input
							@keydown.enter.native="clicou"
							v-model="unidade.nome"
							id="unidade-nome"
							type="text"
							placeholder="Informe a unidade..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
		<hr />
		<b-table hover striped :items="unidades" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					v-show="modo === 'incluir'"
					class="mr-1"
					@click="opcoesUnidade(data.item, 'opcoes')"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					v-show="modo === 'opcoes'"
					class="mr-1"
					@click="carregarUnidades(data.item, 'incluir')"
				>
					<i class="fa-solid fa-cancel" />
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
	import axios from "axios";
	// import { mapState } from "vuex";
	import { baseApi, mostrarErro, mostrarSucesso } from "@/global";
	import TituloPagina from "../TituloPagina.vue";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	export default {
		nome: "Unidades",
		components: { TituloPagina, BotaoCrud },
		// computed: mapState(["unidade"]),
		data: function () {
			return {
				modo: "incluir",
				unidade: {},
				unidades: [],
				campos: [
					{
						key: "id",
						label: "#",
					},
					{
						key: "nome",
						label: "Descrição",
						sortable: true,
					},
					{
						key: "acoes",
						label: "Opções",
					},
				],
			};
		},
		methods: {
			clicou(evento) {
				if (evento.which === 13) {
					this.incluir();
				}
			},
			opcoesUnidade(unidade, modo) {
				this.modo = modo;
				this.unidade = unidade;
				this.unidades = [{ ...this.unidade }];
			},
			carregarUnidade() {
				this.limpar();
				axios.get(`${baseApi}unidades/${this.unidade.id}`).then((unidade) => {
					this.unidades = unidade.data;
				});
			},
			carregarUnidades() {
				this.limpar();
				axios.get(`${baseApi}unidades`).then((unidades) => {
					this.unidades = unidades.data;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.unidade = {};
			},
			obter() {},
			incluir() {
				axios
					.post(`${baseApi}unidades`, this.unidade)
					.then(() => {
						mostrarSucesso(`Unidade: ${this.unidade.nome} incluída com sucesso!`);
						this.limpar();
						this.carregarUnidades();
					})
					.catch(mostrarErro);
			},
			atualizar() {
				axios
					.put(`${baseApi}unidades/${this.unidade.id}`, this.unidade)
					.then(() => {
						mostrarSucesso(
							`Unidade: ${this.unidade.nome} atualizada com sucesso!`
						);
						this.limpar();
						this.carregarUnidades();
					});
			},
			excluir() {
				axios.delete(`${baseApi}unidades/${this.unidade.id}`).then(() => {
					mostrarSucesso(`Unidade: ${this.unidade.nome} excluída com sucesso!`);
					this.limpar();
					this.carregarUnidades();
				});
			},
		},
		mounted() {
			this.carregarUnidades();
		},
	};
</script>

<style>
	.mr-1 {
		border-radius: 0px;
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