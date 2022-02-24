<template>
	<div class="modulos">
		<TituloPagina
			icone="fa-solid fa-boxes-stacked"
			titulo="Módulos"
			sub="Aqui pode gerenciar as informações dos módulos"
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
					<b-form-group label="Código" label-for="modulo-id">
						<b-form-input
							id="modulo-id"
							type="number"
							v-model="modulo.id"
							:readonly="true"
							placeholder="#"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Módulo" label-for="modulo-nome">
						<b-form-input
							@keydown.enter.native="clicou"
							id="modulo-nome"
							type="text"
							v-model="modulo.nome"
							placeholder="Informe o nome do módulo..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="2" sm="12">
					<b-form-group label="-- SEM USO --">
						<b-form-input :readonly="true" placeholder="#"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="Caminho" label-for="modulo-nome">
						<b-form-input
							id="modulo-nome"
							type="text"
							v-model="modulo.caminho"
							placeholder="Caminho do módulo..."
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group label="Código" label-for="maeId">
						<b-form-input
							required
							:readonly="true"
							v-model="modulo"
							id="maeId"
							type="number"
							min="0"
							placeholder="#"
						/>
					</b-form-group>
				</b-col>
				<div></div>
				<b-col md="6" sm="12">
					<b-form-group label="Módulo Mãe" label-for="modulo-maeId">
						<b-form-select
							required
							id="modulo-maeId"
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
		<b-table hover striped :items="modulos" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesModulo(data.item, 'opcoes')"
					v-show="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarModulos(data.item, 'incluir')"
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
	import TituloPagina from "../TituloPagina.vue";
	import Opcoes from "../entradaSaida/Opcoes.vue";
	import IdDescricao from "../entradaSaida/IdDescricao.vue";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	export default {
		nome: "Modulos",
		components: { TituloPagina, IdDescricao, BotaoCrud, Opcoes },
		data: function () {
			return {
				modo: "incluir",
				modulo: {},
				modulos: [],
				campos: [
					{ key: "id", label: "#" },
					{ key: "nome", label: "Descrição", sortable: true },
					{
						key: "maeId",
						label: "Mãe",
					},
					{ key: "caminho", label: "Caminho" },
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
			opcoesModulo(modulo, modo) {
				this.modo = modo;
				this.modulo = modulo;
				this.modulos = [this.modulo];
			},
			carregarModulos() {
				this.limpar();

				axios.get(`${g.baseApi}modulos`).then((modulos) => {
					this.modulos = modulos.data;
				});
			},
			obter() {},
			incluir() {
				// ESTÁ COMO INDEFINIDO, VER MODEL DO INPUT
				// DEPOIS DE APRENDER SOBRE STORE, MUDAR AQUI
				axios
					.post(`${g.baseApi}modulos`, this.modulo)
					.then(() => {
						g.mostrarSucesso(`Módulo: ${this.modulo.nome} incluído com sucesso!`);
						// this.limpar();
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				delete this.modulo.caminho;

				axios
					.put(`${g.baseApi}modulos/${this.modulo.id}`, this.modulo)
					.then(() => {
						g.mostrarSucesso(
							`Módulo: ${this.modulo.nome} atualizado com sucesso`
						);
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}modulos/${this.modulo.id}`, this.modulo)
					.then(() => {
						g.mostrarSucesso(`Módulo: ${this.modulo.nome} removido com sucesso!`);
						this.carregarModulos();
					})
					.catch(g.mostrarErro);
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.modulo = {};
				this.modulos = {};
			},
		},
		mounted() {
			this.carregarModulos();
		},
	};
</script>

<style>
</style>