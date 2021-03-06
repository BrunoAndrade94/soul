<template>
	<div class="produtos">
		<TituloPagina
			icone="fa-solid fa-dolly"
			titulo="Produtos"
			sub="Aqui pode alterar as informações dos produtos"
		/>

		<BotaoCrud
			:desativarModoIncluir="modo === 'opcoes'"
			:desativarModoOpcoes="modo === 'incluir'"
			:clicarObter="obter"
			:clicarLimpar="carregarProdutos"
			:clicarIncluir="incluir"
			:clicarAtualizar="atualizar"
			:clicarRemover="remover"
		/>
		<b-form>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código:" label-for="produto">
						<b-form-input
							v-model="produto.id"
							id="produto-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="10" sm="10">
					<b-form-group label="* Produto:" label-for="produto">
						<b-form-input
							:autofocus="true"
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
				<b-col class="d-none d-sm-block" md="2" sm="2">
					<b-form-group label="Código:" label-for="especie">
						<b-form-input
							required
							v-model="especie"
							id="especie-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<b-col md="10" sm="10">
					<b-form-group label="* Espécie:" label-for="especie">
						<b-form-select
							required
							id="especie-nome"
							v-model="especie"
							:options="especies"
							value-field="id"
							text-field="nome"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col class="d-none d-sm-block" md="2" sm="2">
					<b-form-group label="Código:" label-for="unidade">
						<b-form-input
							required
							v-model="unidade"
							id="unidade-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<div></div>
				<b-col md="10" sm="10">
					<b-form-group label="* Unidade:" label-for="unidade">
						<b-form-select
							required
							id="unidade-nome"
							v-model="unidade"
							:options="unidades"
							value-field="id"
							text-field="nome"
						>
						</b-form-select>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
		<hr />
		<b-table responsive hover striped :items="produtos" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesProduto(data.item, 'opcoes')"
					v-show="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarProdutos(data.item, 'incluir')"
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
	import v from "@/validarGlobal";
	import g from "@/global";
	import TituloPagina from "../TituloPagina.vue";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	export default {
		nome: "Produtos",
		components: { TituloPagina, BotaoCrud },
		data: function () {
			return {
				modo: "incluir",
				produto: {},
				especie: {},
				unidade: {},
				produtos: [],
				especies: [],
				unidades: [],
				pagina: 1,
				limitePorPagina: 0,
				totalDeProdutos: 0,
				campos: [
					{ key: "id", label: "#", sortable: true },
					{ key: "nome", label: "Produtos", sortable: true },
					{
						key: "idEspecie",
						label: "#",
						sortable: true,
					},
					{ key: "nomeEspecie", label: "Espécies", sortable: true },
					{
						key: "idUnidade",
						label: "#",
						sortable: true,
					},
					{ key: "nomeUnidade", label: "Unidades", sortable: true },
					{
						key: "fator",
						label: "Fator",
						sortable: true,
					},
					{ key: "acoes", label: "Opções" },
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
			carregarDados() {
				this.carregarProdutos();
				this.carregarEspecies();
				this.carregarUnidades();
			},
			opcoesProduto(produto, modo) {
				this.modo = modo;
				this.produto = produto;

				this.produtos = [this.produto];
			},
			carregarProduto(produto) {
				this.produto = { ...produto };
			},
			carregarProdutos() {
				this.limpar();
				// OBTEM OS PRODUTOS COM JOIN EM ESPECIES E UNIDADE
				axios.get(`${g.baseApi}produtos`).then((produtos) => {
					this.produtos = produtos.data.produtos;
					this.totalDeProdutos = produtos.data.totalDeProdutos;
					this.limitePorPagina = produtos.data.limitePorPagina;
					this.carregarEspecies();
					this.carregarUnidades();
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.produto = {};
				this.especie = {};
				this.unidade = {};
				this.produtos = {};
				this.especies = {};
				this.unidades = {};
			},
			incluir() {
				if (!v.objetoVazio(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (!v.objetoVazio(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.post(`${g.baseApi}produtos`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} incluído com sucesso!`
						);
						this.limpar();
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				// remove o nome da especie e unidade
				delete this.produto.nomeEspecie;
				delete this.produto.nomeUnidade;

				// injeta novos ids especie e unidade
				if (v.éNumero(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (v.éNumero(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.put(`${g.baseApi}produtos/${this.produto.id}`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} atualizado com sucesso!`
						);
						this.limpar();
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			obter() {
				if (!v.objetoVazio(this.especie)) {
					this.produto.idEspecie = this.especie;
				}
				if (!v.objetoVazio(this.unidade)) {
					this.produto.idUnidade = this.unidade;
				}

				axios
					.post(`${g.baseApi}produto`, this.produto)
					.then((produtos) => {
						this.produtos = produtos.data;
						if (this.produtos.length > 0) {
							g.mostrarSucesso("Encontrei essa (s)!");
							this.carregarEspecies();
							this.carregarUnidades();
						} else {
							g.mostrarErro("Não encontrei nada!");
						}
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}produtos/${this.produto.id}`, this.produto)
					.then(() => {
						g.mostrarSucesso(
							`Produto: ${this.produto.nome} removido com sucesso!`
						);
						this.limpar();
						this.carregarDados();
					})
					.catch(g.mostrarErro);
			},
			// ==============================
			// ==============================
			// ==============================
			carregarEspecies() {
				axios.get(`${g.baseApi}especies`).then((especies) => {
					this.especies = especies.data;
				});
			},

			carregarUnidades() {
				axios.get(`${g.baseApi}unidades`).then((unidades) => {
					this.unidades = unidades.data;
				});
			},
		},
		created() {},
		mounted() {
			this.carregarDados();
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