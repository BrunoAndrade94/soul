<template>
	<div class="paginas-produto">
		<div class="tabs">
			<b-card no-body>
				<b-tabs card>
					<b-tab title="Produtos" active>
						<Produtos />
					</b-tab>
					<b-tab title="Espécies">
						<Especies />
					</b-tab>
					<b-tab title="Unidades">
						<Unidades />
					</b-tab>
				</b-tabs>
			</b-card>
		</div>
	</div>
</template>

<script>
	import Produtos from "../entidades/Produtos.vue";
	import Unidades from "../entidades/Unidades.vue";
	import Especies from "../entidades/Especies.vue";
	export default {
		nome: "PaginasProduto",
		components: { Produtos, Unidades, Especies },
	};
</script>

<style>
	.tabs {
		display: center;
	}
</style>