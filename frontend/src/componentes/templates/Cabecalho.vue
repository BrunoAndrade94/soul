<template>
	<header class="cabecalho">
		<a class="toggle" @click="toggleMenu" v-if="!esconderToggle">
			<i class="fa-solid fa-bars"></i>
		</a>
		<h1 class="titulo">
			<i class="fa-solid fa-cannabis" />
			<router-link to="/">
				<span v-if="usuario">
					{{ titulo }}
				</span>
			</router-link>
			<span v-if="!usuario">
				{{ titulo }}
			</span>
		</h1>
		<MenuUsuario v-if="!esconderMenuUsuario" />
	</header>
</template>

<script>
	import { mapState } from "vuex";
	import MenuUsuario from "./menu/MenuUsuario";
	export default {
		name: "Cabecalho",
		components: { MenuUsuario },
		computed: mapState(["usuario"]),
		props: {
			titulo: String,
			esconderToggle: Boolean,
			esconderMenuUsuario: Boolean,
		},
		methods: {
			toggleMenu() {
				this.$store.commit("toggleMenu");
			},
		},
	};
</script>

<style>
	.cabecalho {
		grid-area: header;
		/* background: linear-gradient(to right, #1e469a, #49a7c1); */
		background: #4375a3;

		display: flex;
		justify-content: center;
		align-items: flex;
	}

	.titulo {
		font-size: 1.5rem;
		color: rgb(255, 255, 255);
		font-weight: 100;
		flex-grow: 1;
		text-align: left;
		padding: 10px;
		margin-top: 0.2rem;
		padding-left: 1rem;
		flex-wrap: flex;
	}

	.titulo a {
		color: whitesmoke;
		text-decoration: none;
	}
	.titulo a:hover {
		text-decoration: none;
		color: white;
	}

	header.cabecalho > a.toggle {
		width: 60px;
		height: 100%;
		color: white;
		justify-self: flex-start;
		text-decoration: none;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	header.cabecalho > a.toggle:hover {
		color: white;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.titulo i {
		font-size: 30px;
		padding: 4px 10px 0px 0px;
	}
</style>