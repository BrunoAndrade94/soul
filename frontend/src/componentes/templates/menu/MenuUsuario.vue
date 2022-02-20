<template>
	<div class="menu-usuario">
		<div class="botao-usuario">
			<span class="d-none d-sm-block">{{ usuario.nome }}</span>
			<div class="menu-usuario-imagem">
				<Gravatar :email="usuario.email" alt="e-mail" />
			</div>
			<i class="fa-solid fa-angles-down"></i>
		</div>
		<div class="menu-usuario-conteudo">
			<router-link to="/produtos">
				<i class="fa-solid fa-people-carry-box" />
				Produtos</router-link
			>
			<hr />
			<router-link to="/admin" v-if="usuario.admin"
				><i class="fa-solid fa-users-gear" /> Administração</router-link
			>
			<router-link to="/configUsuario">
				<i class="fa-solid fa-user-gear" />
				Configurar Usuário
			</router-link>
			<a href @click.prevent="deslogar"
				><i class="fa-solid fa-person-running" /> Sair</a
			>
		</div>
	</div>
</template>

<script>
	import { chaveUsuario } from "@/global";
	import { mapState } from "vuex";
	import Gravatar from "vue-gravatar";
	export default {
		nome: "MenuUsuario",
		components: { Gravatar },
		computed: mapState(["usuario"]),
		methods: {
			deslogar() {
				localStorage.removeItem(chaveUsuario);
				this.$store.commit("definirUsuario", null);
				this.$router.push({ path: "/logar" });
			},
		},
	};
</script>

<style>
	.menu-usuario {
		height: 100%;
		position: left;
	}
	.botao-usuario {
		display: flex;
		align-items: center;
		color: #f9f9f9;
		font-weight: 100;
		height: 100%;
		padding: 0px 20px;
	}
	.menu-usuario:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
	.menu-usuario-imagem {
		margin: 0px 20px;
	}
	.menu-usuario-imagem > img {
		max-height: 37px;
		border-radius: 5px;
	}
	.menu-usuario-conteudo {
		position: fixed;
		right: 0px;
		background-color: #f9f9f9;
		min-width: 230px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
		padding: 10px;
		z-index: 1;

		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		visibility: hidden;
		opacity: 0;
		transition: visibility 0s, opacity 0.5s liner;
	}
	.menu-usuario:hover .menu-usuario-conteudo {
		visibility: visible;
		opacity: 1;
	}
	.menu-usuario-conteudo a {
		text-decoration: none;
		color: #000;
		padding: 10px;
	}
	.menu-usuario-conteudo a:hover {
		text-decoration: none;
		color: black;
		background-color: #ededed;
	}
	.menu-usuario-conteudo hr {
		border: 0;
		margin: 10px;
		width: 100%;
		height: 1px;
		background-image: linear-gradient(
			to right,
			rgba(120, 120, 120, 0),
			rgba(120, 120, 120, 0.75),
			rgba(120, 120, 120, 0)
		);
	}
	.menu-usuario-conteudo i {
		color: blue;
		padding-right: 20px;
		font-size: 20px;
	}
</style>