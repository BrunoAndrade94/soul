<template>
	<div class="paginas-admin">
		<div class="paginas-admin-tabs">
			<b-card no-body>
				<b-tabs card>
					<b-tab title="Usuários" active>
						<UsuariosAdmin />
					</b-tab>
					<b-tab title="Módulos">
						<h1>Módulos</h1>
					</b-tab>
					<b-tab title="Telas">
						<h1>Telas</h1>
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
	import TituloPagina from "../TituloPagina.vue";
	import UsuariosAdmin from "../admin/UsuariosAdmin.vue";
	import { mapState } from "vuex";
	export default {
		nome: "PaginasAdmin",
		components: { UsuariosAdmin },
		computed: mapState(["usuario"]),
	};
</script>

<style>
</style>