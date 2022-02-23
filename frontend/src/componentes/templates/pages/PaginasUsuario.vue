<template>
	<div class="paginas-usuario">
		<div class="paginas-usuario-tabs">
			<b-card no-body>
				<b-tabs pills card lazy>
					<b-tab title="Usuário" active>
						<Usuarios />
					</b-tab>
					<b-tab title="Em manutenção.." disabled> </b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
	import Usuarios from "../templates/config/Usuarios.vue";
	export default {
		nome: "PáginasUsuário",
		components: { Usuarios },
	};
</script>

<style>
</style>