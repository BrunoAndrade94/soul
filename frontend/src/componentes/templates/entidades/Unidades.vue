<template>
	<div class="unidades">
		<TituloPagina
			icone="fa-solid fa-apple-whole"
			titulo="Unidades"
			sub="Aqui pode alterar as informações das unidades"
		/>

		<BotaoCrud
			:desativarModoIncluir="modo === 'opcoes'"
			:desativarModoOpcoes="modo === 'incluir'"
			:clicarObter="obter"
			:clicarIncluir="incluir"
			:clicarAtualizar="atualizar"
			:clicarRemover="remover"
		/>

		<b-form>
			<b-row>
				<b-col md="2" sm="2">
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
				<b-col md="4" sm="10">
					<b-form-group label="Unidade" label-for="unidade-nome">
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
	import g from "@/global";
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
						label: "Unidade",
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
					if (this.modo === "incluir") {
						this.incluir();
					} else {
						this.atualizar();
					}
				}
			},
			opcoesUnidade(unidade, modo) {
				this.modo = modo;
				this.unidade = unidade;
				this.unidades = [{ ...this.unidade }];
			},
			carregarUnidade() {
				this.limpar();
				axios.get(`${g.baseApi}unidades/${this.unidade.id}`).then((unidade) => {
					this.unidades = unidade.data;
				});
			},
			carregarUnidades() {
				this.limpar();
				axios.get(`${g.baseApi}unidades`).then((unidades) => {
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
					.post(`${g.baseApi}unidades`, this.unidade)
					.then(() => {
						g.mostrarSucesso(
							`Unidade: ${this.unidade.nome} incluída com sucesso!`
						);
						this.limpar();
						this.carregarUnidades();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				axios
					.put(`${g.baseApi}unidades/${this.unidade.id}`, this.unidade)
					.then(() => {
						g.mostrarSucesso(
							`Unidade: ${this.unidade.nome} atualizada com sucesso!`
						);
						this.limpar();
						this.carregarUnidades();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}unidades/${this.unidade.id}`)
					.then(() => {
						g.mostrarSucesso(
							`Unidade: ${this.unidade.nome} excluída com sucesso!`
						);
						this.limpar();
						this.carregarUnidades();
					})
					.catch(g.mostrarErro);
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