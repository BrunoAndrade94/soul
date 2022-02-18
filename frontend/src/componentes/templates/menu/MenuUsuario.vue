<template>
	<div class="menu-usuario">
		<div class="botao-usuario">
			<span class="d-none d-sm-block">{{ usuario.nome }}</span>
			<div class="menu-usuario-imagem">
				<Gravatar :email="usuario.email" alt="e-mail" />
			</div>
			<i class="fa fa-angle-down"></i>
		</div>
		<div class="menu-usuario-conteudo">
			<router-link to="/admin" v-if="usuario.admin"
				><i class="fa fa-cogs"></i> Administração</router-link
			>

			<a href @click.prevent="deslogar"><i class="fa fa-sign-out"></i> Sair</a>
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
		position: relative;
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
		position: absolute;
		right: 0px;
		background-color: #f9f9f9;
		min-width: 170px;
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
</style>