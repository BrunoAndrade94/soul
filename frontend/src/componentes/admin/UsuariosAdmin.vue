<template>
	<div class="usuario-admin">
		<TituloPagina
			icone="fa-solid fa-users-gear"
			titulo="Usuários"
			sub="Aqui pode gerenciar as informações dos usuários"
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
			<input id="usuario-id" type="hidden" v-model="usuario.id" />
			<b-row>
				<b-col md="6" sm="12">
					<b-form-group label="* Nome:" label-for="usuario.nome">
						<b-form-input
							id="usuario-nome"
							required
							type="text"
							@keydown.enter.native="clicou"
							v-model="usuario.nome"
							:readonly="modo === 'remover'"
							placeholder="Informe o nome..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="* E-mail:" label-for="usuario.email">
						<b-form-input
							id="usuario-email"
							required
							type="email"
							v-model="usuario.email"
							@keydown.enter.native="clicou"
							:readonly="modo === 'remover'"
							placeholder="Informe o e-mail..."
						/>
					</b-form-group>
				</b-col>
			</b-row>

			<b-row>
				<b-col md="6" sm="12">
					<b-form-group label="* Usuário:" label-for="usuario.usuario">
						<b-form-input
							id="usuario-usuario"
							required
							type="text"
							v-model="usuario.usuario"
							@keydown.enter.native="clicou"
							:readonly="modo === 'remover'"
							placeholder="Informe o usuário..."
						/>
					</b-form-group>
				</b-col>
				<b-form-checkbox
					id="usuario-admin"
					v-model="usuario.admin"
					class="mt-4 mb-4 ml-4"
					:disabled="modo === 'remover'"
				>
					Administração
				</b-form-checkbox>
				<b-form-checkbox
					v-model="alterar"
					:disabled="modo === 'incluir'"
					class="mt-4 mb-4 ml-4"
				>
					Alterar Senha
				</b-form-checkbox>
			</b-row>
			<b-row v-show="alterar || (modo === 'incluir' && !alterar)">
				<b-col md="6" sm="12">
					<b-form-group label="* Senha:" label-for="usuario.senha">
						<b-form-input
							id="usuario-senha"
							required
							type="password"
							@keydown.enter.native="clicou"
							v-model="usuario.senha"
							placeholder="Informe a senha..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group
						label="* Confirmação de Senha:"
						label-for="usuario.confirmacaoSenha"
					>
						<b-form-input
							id="usuario-confirmacaoSenha"
							type="password"
							v-model="usuario.confirmacaoSenha"
							@keydown.enter.native="clicou"
							required
							placeholder="Confirme a senha..."
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<hr />
		</b-form>
		<hr />
		<b-table hover striped :items="usuarios" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="info"
					@click="opcoesUsuario(data.item)"
					v-if="modo === 'incluir'"
					class="mr-1"
				>
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button
					variant="warning"
					@click="carregarUsuarios()"
					v-if="modo === 'opcoes'"
					class="mr-1"
				>
					<i class="fa-solid fa-cancel" />
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import BotaoCrud from "../templates/botoes/BotaoCrud.vue";
	import TituloPagina from "../templates/TituloPagina.vue";
	import g from "@/global";
	import axios from "axios";
	export default {
		nome: "UsuariosAdmin",
		computed: mapState(["usuario"]),
		components: { TituloPagina, BotaoCrud },
		data: function () {
			return {
				modo: "incluir",
				alterar: false,
				usuario: {},
				usuarios: [],
				campos: [
					{
						key: "id",
						label: "#",
						sortable: true,
						class: "d-none d-sm-block",
					},
					{
						key: "nome",
						label: "Nome",
						sortable: true,
					},
					{
						key: "email",
						label: "E-mail",
						sortable: true,
						class: "d-none d-sm-block",
					},
					{ key: "usuario", label: "Usuário", sortable: true },
					{
						key: "admin",
						label: "Adm",
						sortable: true,
						class: "d-none d-sm-block",
						formatter: (valor) => (valor ? "Sim" : "Não"),
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
			opcoesUsuario(usuario, modo = "opcoes") {
				this.modo = modo;
				this.usuario = usuario;
				this.usuarios = [{ ...this.usuario }];
				// this.usuarios.caminho = [this.usuario.caminho];
			},
			carregarUsuario(usuario, modo = "incluir") {
				this.modo = modo;
				this.usuario = { ...usuario };
			},
			carregarUsuarios(modo = "incluir") {
				this.modo = modo;
				axios.get(`${g.baseApi}usuarios`).then((usuarios) => {
					this.usuarios = usuarios.data;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.usuario = {};
				this.carregarUsuarios();
			},
			incluir() {
				axios
					.post(`${g.baseApi}usuarios`, this.usuario)
					.then(() => {
						g.mostrarSucesso("Incluído com sucesso!");
						this.limpar();
					})
					.catch(g.mostrarErro);
			},
			atualizar() {
				axios
					.put(`${g.baseApi}usuario/${this.usuario.id}`, this.usuario)
					.then(() => {
						g.mostrarSucesso(`${this.usuario.nome} atualizado com sucesso!`);
						this.limpar();
					})
					.catch(g.mostrarErro);
			},
			remover() {
				axios
					.delete(`${g.baseApi}usuarios/${this.usuario.id}`)
					.then(() => {
						g.mostrarSucesso(`${this.usuario.nome} excluído com sucesso!`);
						this.limpar();
					})
					.catch(g.mostrarErro);
			},
		},
		mounted() {
			this.carregarUsuarios();
		},
	};
</script>

<style>
</style>