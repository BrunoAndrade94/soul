<template>
	<div class="autenticar-conteudo">
		<div class="autenticar-modal">
			<img src="@/assets/marca_MV.png" width="200" alt="Logo" />
			<hr />
			<div class="autenticar-titulo">
				{{ mostrarLogin ? "Cadastro" : "Login" }}
			</div>

			<input
				v-if="mostrarLogin"
				v-model="usuario.nome"
				type="text"
				placeholder="Nome"
			/>
			<input
				v-if="mostrarLogin"
				v-model="usuario.email"
				type="text"
				placeholder="E-mail"
			/>
			<input v-model="usuario.usuario" type="text" placeholder="Usuário" />
			<input v-model="usuario.senha" type="password" placeholder="Senha" />
			<input
				v-if="mostrarLogin"
				v-model="usuario.confirmacaoSenha"
				type="password"
				placeholder="Confirmação de Senha"
			/>

			<button v-if="mostrarLogin" @click="cadastro">Registrar</button>
			<button v-else @click="login">Entrar</button>
			<hr />
			<a href @click.prevent="mostrarLogin = !mostrarLogin">
				<span v-if="mostrarLogin">Acesso o Login!</span>
				<span v-else>Registre-se aqui!</span>
			</a>
		</div>
	</div>
</template>

<script>
	import { baseApi, chaveUsuario, mostrarErro } from "@/global";
	import axios from "axios";
	export default {
		nome: "Autenticar",
		data: function () {
			return {
				mostrarLogin: false,
				usuario: {},
			};
		},
		methods: {
			// responsavel por fazer o login
			login() {
				axios
					.post(`${baseApi}logar`, this.usuario)
					.then((res) => {
						this.$store.commit("definirUsuario", res.data);
						localStorage.setItem(chaveUsuario, JSON.stringify(res.data));
						this.$router.push({ path: "/" });
					})
					.catch(mostrarErro);
			},
			cadastro() {
				axios
					.post(`${baseApi}cadastro`, this.usuario)
					.then(() => {
						this.$toasted.global.sucessoPadrao();
						this.usuario = {};
						this.mostrarLogin = false;
					})
					.catch(mostrarErro);
			},
		},
	};
</script>

<style>
	.autenticar-conteudo {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.autenticar-modal {
		background-color: #fff;
		width: 350px;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
		padding: 55px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.autenticar-titulo {
		font-size: 1.2rem;
		font-weight: 100;
		margin-top: 10px;
		margin-bottom: 15px;
	}
	.autenticar-modal input {
		border: 1px solid #bbb;
		width: 100%;
		margin-bottom: 15px;
		padding: 3px 8px;
	}
	.autenticar-modal button {
		align-self: flex-end;
		background-color: #2460ae;
		color: #fff;
		padding: 5px 15px;
	}
	.autenticar-modal a {
		margin-top: 35px;
	}
	.autenticar-modal hr {
		border: 0;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(
			to right,
			rgba(120, 120, 120, 0),
			rgba(120, 120, 120, 0.75),
			rgba(120, 120, 120, 0)
		);
	}
</style>