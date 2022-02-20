<template>
	<div class="especie">
		<TituloPagina
			icone="fa-solid fa-cogs"
			titulo="Espécies"
			sub="Aqui pode alterar as informações das espécies"
		/>

		<div class="butao-crud">
			<b-button
				class="mr-1"
				variant="success"
				v-show="modo === 'incluir'"
				@click="obter"
			>
				<i class="fa-solid fa-magnifying-glass" />
			</b-button>
			<b-button
				class="mr-1"
				variant="primary"
				v-show="modo === 'incluir'"
				@click="incluir"
			>
				<i class="fa-solid fa-download" />
			</b-button>
			<b-button
				class="mr-1"
				variant="warning"
				v-show="modo === 'opcoes'"
				@click="atualizar"
			>
				<i class="fa-solid fa-highlighter" />
			</b-button>
			<b-button
				class="mr-1"
				variant="danger"
				v-show="modo === 'opcoes'"
				@click="excluir"
			>
				<i class="fa-solid fa-trash-can" />
			</b-button>
			<hr />
		</div>
		<b-form>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="especie-id">
						<b-form-input
							id="especie-id"
							type="number"
							v-model="especie.id"
							readonly="true"
							placeholder="#"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Descrição" label-for="especie-nome">
						<b-form-input
							id="especie-nome"
							type="text"
							v-model="especie.nome"
							placeholder="Informe a espécie..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
		<hr />
		<b-table hover striped :items="especies" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesEspecie(data.item, 'opcoes')"
					v-show="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarEspecies(data.item, 'incluir')"
					v-show="modo === 'opcoes'"
					class="mr-1"
				>
					<i class="fa-solid fa-cancel" />
				</b-button>
			</template>
		</b-table>
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
				modo: "incluir",
				especie: {},
				especies: [],
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
			opcoesEspecie(especie, modo) {
				this.modo = modo;
				this.especie = especie;
				this.especies = [{ ...this.especie }];
			},
			carregarEspecie() {
				axios
					.get(`${baseApi}especies/${this.especie.id}`)
					.then((especie) => (this.especies = especie.data));
			},
			carregarEspecies() {
				this.limpar();
				axios.get(`${baseApi}especies`).then((especies) => {
					this.especies = especies.data;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.especie = {};
			},
			incluir() {
				axios
					.post(`${baseApi}especies`, this.especie)
					.then(() => {
						mostrarSucesso("Incluído com sucesso!");
						this.limpar();
					})
					.catch(mostrarErro);
			},
			atualizar() {
				axios
					.put(`${baseApi}especies/${this.especie.id}`, this.especie)
					.then(() => {
						mostrarSucesso(`Espécie ${this.especie.nome} atualizda com sucesso!`);
						this.limpar();
						this.carregarEspecies();
					})
					.catch(mostrarErro);
			},
			obter() {
				axios.get(`${baseApi}especie`, this.especie).then((especies) => {
					this.especies = especies.data;
				});

				//sem uso
				// if (this.especie.id) {
				// 	axios
				// 		.get(`${baseApi}especies/${this.especie.id}`)
				// 		.then((especie) => (this.especie = especie.data));
				// }
				// axios
				// 	.get(`${baseApi}especies`)
				// 	.then((especie) => this.especie(especie.data));
			},
			excluir() {},
		},
		mounted() {
			this.carregarEspecies();
		},
	};
</script>

<style>
	.opcoes {
		size: 300px;
		position: left;
		padding: 10px;
	}

	.mr-1 {
		border-radius: 2rem;
		border-color: black;
		border-collapse: collapse;
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