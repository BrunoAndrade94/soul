<template>
	<div class="telas">
		<TituloPagina
			icone="fa-solid fa-desktop"
			titulo="Telas"
			sub="Aqui pode gerenciar as informações das telas"
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
				<b-col md="2" sm="12">
					<b-form-group label="Código" label-for="tela-id">
						<b-form-input
							id="tela-id"
							type="number"
							v-model="tela.id"
							:readonly="true"
							placeholder="#"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Tela" label-for="tela-nome">
						<b-form-input
							@keydown.enter.native="clicou"
							id="tela-nome"
							type="text"
							v-model="tela.nome"
							placeholder="Informe o nome da tela..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="modulo-id">
						<b-form-input
							required
							:readonly="true"
							v-model="modulo"
							id="modulo-id"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<div></div>
				<b-col md="6" sm="12">
					<b-form-group label="Módulos" label-for="modulo-nome">
						<b-form-select
							required
							id="modulo-nome"
							v-model="modulo"
							:options="modulos"
							value-field="id"
							text-field="nome"
						>
						</b-form-select>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>

		<hr />
		<b-table hover striped :items="telas" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesTela(data.item, 'opcoes')"
					v-show="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarTelas(data.item, 'incluir')"
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
	import g from "@/global";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	import IdDescricao from "../entradaSaida/IdDescricao.vue";
	import TituloPagina from "../TituloPagina.vue";
	export default {
		nome: "Telas",
		components: { TituloPagina, BotaoCrud, IdDescricao },
		data: function () {
			return {
				modo: "incluir",
				tela: {},
				telas: [],
				modulo: {},
				modulos: [],
				campos: [
					{
						key: "id",
						label: "#",
					},
					{ key: "nome", label: "Tela", sortable: true },
					{ key: "moduloNome", label: "Módulo" },
					{
						key: "acoes",
						label: "Opcões",
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
			opcoesTela(modulo, modo) {
				this.modo = modo;
				this.tela = modulo;
				this.telas = [this.tela];
			},
			carregarTelas() {
				this.limpar();

				axios.get(`${g.baseApi}telas`).then((telas) => {
					this.telas = telas.data;
				});
			},
			obter() {},
			incluir() {
				axios
					.post(`${g.baseApi}telas`, this.tela)
					.then(() => {
						g.mostrarSucesso(`Tela: ${this.tela.nome} incluída com sucesso!`);
						this.limpar();
						this.carregarTelas();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				delete this.tela.caminho;
				axios
					.put(`${g.baseApi}telas/${this.tela.id}`, this.tela)
					.then(() => {
						g.mostrarSucesso(`Tela: ${this.tela.nome} atualizada com sucesso`);
						this.carregarTelas();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}telas/${this.tela.id}`, this.tela)
					.then(() => {
						g.mostrarSucesso(`Tela: ${this.tela.nome} removida com sucesso!`);
						this.carregarTelas();
					})
					.catch(g.mostrarErro);
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.tela = {};
				this.telas = {};
			},
			//=====================
			//=====================
			//===== MODULOS =======
			//=====================
			//=====================
			carregarModulos() {
				axios.get(`${g.baseApi}modulos`).then((modulos) => {
					this.modulos = modulos.data;
				});
			},
		},
		mounted() {
			this.carregarTelas();
			this.carregarModulos();
		},
	};
</script>

<style>
</style>