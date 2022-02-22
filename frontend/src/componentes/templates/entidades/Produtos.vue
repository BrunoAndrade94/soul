<template>
	<div class="produtos">
		<TituloPagina
			icone="fa-solid fa-dolly"
			titulo="Produtos"
			sub="Aqui pode alterar as informações dos produtos"
		/>
		<div class="botao-crud">
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
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="produto-id">
						<b-form-input
							v-model="produto.id"
							id="produto-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Produto" label-for="produto-nome">
						<b-form-input
							id="produto-nome"
							type="text"
							v-model="produto.nome"
							placeholder="Informe o nome do produto..."
							@keydown.enter.native="clicou"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="especie-id">
						<b-form-input
							v-model="especie.id"
							id="especie-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Espécie" label-for="especie-nome">
						<b-form-select
							required
							id="especie-nome"
							v-model="especie.nome"
							:options="especies"
							:value-field="id"
							:text-field="nome"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="unidade-id">
						<b-form-input
							v-model="unidade.id"
							id="unidade-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="10">
					<b-form-group label="Unidade" label-for="unidade-nome">
						<b-form-select
							required
							id="unidade-nome"
							v-model="unidades.nome"
							:options="unidades"
						>
						</b-form-select>
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
		nome: "Produtos",
		components: { TituloPagina, BotaoCrud },
		computed: mapState(["produto", "especie", "unidade"]),
		data: function () {
			return {
				modo: "incluir",
				produto: {},
				especie: {},
				unidade: {},
				produtos: [],
				especies: [],
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
					{ key: "especie.nome", label: "Espécie", sortable: true },
					{
						key: "unidade.nome",
						label: "Unidade",
						sortable: true,
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
			carregarProduto(produto) {
				this.produto = { ...produto };
			},
			carregarProdutos() {
				axios.get(`${baseApi}produtos`).then((produtos) => {
					this.produtos = produtos.data;
				});
			},
			limpar() {
				this.produto = {};
			},
			incluir() {
				axios
					.post(`${baseApi}produtos`, this.produto)
					.then(() => {
						mostrarSucesso(`Produto: ${this.produto.nome} incluído com sucesso!`);
					})
					.catch(mostrarErro);
			},
			atualizar() {},
			procurar() {},
			excluir() {},

			// ==============================

			carregarEspecies() {
				axios.get(`${baseApi}especies`).then((especies) => {
					this.especies = especies.data;
				});
			},

			carregarUnidades() {
				axios.get(`${baseApi}unidades`).then((unidades) => {
					this.unidades = unidades.data;
				});
			},
		},
		mounted() {
			this.carregarProdutos();
			this.carregarEspecies();
			this.carregarUnidades();
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