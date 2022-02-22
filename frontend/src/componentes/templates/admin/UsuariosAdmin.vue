<template>
	<div class="usuario-admin">
		<TituloPagina
			icone="fa fa-cogs"
			titulo=" Administração do Sistema"
			sub=" Cadastro & CIA"
		/>
		<b-form>
			<input id="usuario-id" type="hidden" v-model="usuario.id" />
			<b-row>
				<b-col md="6" sm="12">
					<b-form-group label="Nome:" label-for="usuario.nome">
						<b-form-input
							id="usuario-nome"
							type="text"
							v-model="usuario.nome"
							required
							placeholder="Informe o nome..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group label="E-mail:" label-for="usuario.email">
						<b-form-input
							id="usuario-email"
							type="email"
							v-model="usuario.email"
							required
							placeholder="Informe o e-mail..."
						/>
					</b-form-group>
				</b-col>
			</b-row>

			<b-row>
				<b-col md="6" sm="12">
					<b-form-group label="Usuário:" label-for="usuario.usuario">
						<b-form-input
							id="usuario-usuario"
							type="text"
							v-model="usuario.usuario"
							required
							placeholder="Informe o usuário..."
						/>
					</b-form-group>
				</b-col>
				<b-form-checkbox
					id="usuario-admin"
					v-model="usuario.admin"
					class="mt-4 mb-4 ml-4"
				>
					Administração
				</b-form-checkbox>
				<b-form-checkbox
					v-model="alterar"
					v-show="modo === 'atualizar'"
					class="mt-4 mb-4 ml-4"
				>
					Alterar Senha
				</b-form-checkbox>
			</b-row>
			<b-row v-show="alterar || (modo === 'incluir' && !alterar)">
				<b-col md="6" sm="12">
					<b-form-group label="Senha:" label-for="usuario.senha">
						<b-form-input
							id="usuario-senha"
							type="password"
							v-model="usuario.senha"
							required
							placeholder="Informe a senha..."
						/>
					</b-form-group>
				</b-col>
				<b-col md="6" sm="12">
					<b-form-group
						label="Confirmação de Senha:"
						label-for="usuario.confirmacaoSenha"
					>
						<b-form-input
							id="usuario-confirmacaoSenha"
							type="password"
							v-model="usuario.confirmacaoSenha"
							required
							placeholder="Confirme a senha..."
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<hr />
			<b-button variant="primary" v-if="modo === 'incluir'" @click="incluir">
				<i class="fa-solid fa-pen" /> Incluir
			</b-button>
			<b-button
				variant="warning"
				v-if="modo === 'atualizar'"
				@click="atualizar"
			>
				<i class="fa-solid fa-highlighter" /> Atualizar
			</b-button>
			<b-button variant="danger" v-if="modo === 'remover'" @click="remover">
				<i class="fa-solid fa-user-slash" /> Excluir
			</b-button>
			<b-button variant="danger" class="ml-2" @click="limpar('incluir')"
				><i class="fa-solid fa-xmark" /> Cancelar</b-button
			>
		</b-form>
		<hr />
		<b-table hover striped :items="usuarios" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="warning"
					@click="carregarUsuario(data.item, 'atualizar')"
					class="mr-2"
				>
					<i class="fa-solid fa-pen-to-square"></i>
				</b-button>
				<b-button
					variant="danger"
					@click="carregarUsuario(data.item, 'remover')"
				>
					<i class="fa-solid fa-trash-can"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import TituloPagina from "../TituloPagina.vue";
	import g from "@/global";
	import axios from "axios";
	export default {
		nome: "UsuariosAdmin",
		computed: mapState(["usuario"]),
		components: { TituloPagina },
		data: function () {
			return {
				modo: "incluir",
				alterar: false,
				usuario: {},
				usuarios: [],
				campos: [
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
			carregarUsuario(usuario, modo = "incluir") {
				this.modo = modo;
				this.usuario = { ...usuario };
			},
			carregarUsuarios() {
				axios.get(`${g.baseApi}usuarios`).then((res) => {
					this.usuarios = res.data;
				});
			},
			limpar(modo = "incluir") {
				this.modo = modo;
				this.usuario = {};
				this.carregarUsuarios(this.usuario);
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