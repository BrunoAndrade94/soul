<template>
	<header class="cabecalho">
		<a class="toggle" @click="toggleMenu" v-if="!esconderToggle">
			<i class="fa fa-lg" :class="icone"></i>
		</a>
		<h1 class="titulo">
			<!-- <router-link to="/"> -->
			{{ titulo }}
			<!-- </router-link> -->
		</h1>
		<MenuUsuario v-if="!esconderMenuUsuario" />
	</header>
</template>

<script>
	import MenuUsuario from "./menu/MenuUsuario";
	export default {
		name: "Cabecalho",
		components: { MenuUsuario },
		props: {
			titulo: String,
			esconderToggle: Boolean,
			esconderMenuUsuario: Boolean,
		},
		computed: {
			icone() {
				return this.$store.state.menuVisivel ? "fa-angle-left" : "fa-angle-down";
			},
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
		align-items: center;
	}

	.titulo {
		font-size: 1.9rem;
		color: antiquewhite;
		font-weight: 100;
		flex-grow: 1;
		text-align: left;
		padding: 20px;
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
</style>