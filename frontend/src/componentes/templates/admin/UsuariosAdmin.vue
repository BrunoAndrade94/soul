<template>
	<div class="usuario-admin">
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
							type="text"
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
			</b-row>

			<b-row>
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
			<b-button variant="primary" v-if="modo === 'incluir'" @click="incluir">
				Incluir
			</b-button>
			<b-button variant="danger" v-if="modo === 'remover'" @click="remover">
				Excluir
			</b-button>
			<b-button class="ml-2" @click="limpar">Cancelar</b-button>
		</b-form>
		<hr />
		<b-table hover striped :items="usuarios" :fields="campos">
			<template slot="acoes" slot-scope="data">
				<b-button
					variant="warning"
					@click="carregarUsuario(data.item)"
					class="mr-2"
				>
					<i class="fa fa-pencil"></i>
				</b-button>
				<b-button
					variant="danger"
					@click="carregarUsuario(data.item, 'remover')"
				>
					<i class="fa fa-trash"></i>
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
	import { baseApi, mostrarErro } from "@/global";
	import axios from "axios";
	export default {
		nome: "UsuariosAdmin",
		data: () => {
			return {
				modo: "incluir",
				usuario: {},
				usuarios: [],
				campos: [
					{ key: "id", label: "Código", sortable: true },
					{ key: "nome", label: "Nome", sortable: true },
					{ key: "email", label: "E-mail", sortable: true },
					{ key: "usuario", label: "Usuário", sortable: true },
					{
						key: "admin",
						label: "Administração",
						sortable: true,
						formatter: (valor) => (valor ? "Sim" : "Não"),
					},
					{ key: "acoes", label: "Ações" },
				],
			};
		},
		methods: {
			carregarUsuario(usuario, modo = "incluir") {
				this.modo = modo;
				this.usuario = { ...usuario };
			},
			carregarUsuarios() {
				const url = `${baseApi}usuarios`;
				axios.get(url).then((res) => {
					this.usuarios = res.data;
				});
			},
			limpar() {
				this.modo = "incluir";
				this.usuario = {};
				this.carregarUsuarios();
			},
			incluir() {
				const metodo = this.usuario.id ? "put" : "post";
				const id = this.usuario.id ? `${this.usuario.id}` : "";
				axios[metodo](`${baseApi}usuarios/${id}`, this.usuario)
					.then(() => {
						this.$toasted.global.sucessoPadrao();
						this.limpar();
					})
					.catch(mostrarErro);
			},
			remover() {
				const id = this.usuario.id;
				axios
					.delete(`${baseApi}usuarios/${id}`)
					.then(() => {
						this.$toasted.global.sucessoPadrao();
						this.limpar();
					})
					.catch(mostrarErro);
			},
		},
		mounted() {
			this.carregarUsuarios();
		},
	};
</script>

<style>
</style>