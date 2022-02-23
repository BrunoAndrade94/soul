<template>
	<div class="paginas-admin">
		<div class="paginas-admin-tabs">
			<b-card no-body>
				<b-tabs pills card lazy>
					<b-tab title="Usuários" active>
						<UsuariosAdmin />
					</b-tab>
					<b-tab title="Módulos">
						<Modulos />
					</b-tab>
					<b-tab title="Telas">
						<Telas />
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
	import UsuariosAdmin from "./UsuariosAdmin.vue";
	import Modulos from "../templates/entidades/Modulos.vue";
	import Telas from "../templates/entidades/Telas.vue";
	// import { mapState } from "vuex";
	export default {
		nome: "PaginasAdmin",
		components: { UsuariosAdmin, Modulos, Telas },
		// computed: mapState(["usuario"]),
	};
</script>

<style>
</style>