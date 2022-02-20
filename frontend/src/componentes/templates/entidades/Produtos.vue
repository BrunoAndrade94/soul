<template>
	<div class="produtos">
		<TituloPagina
			icone="fa-solid fa-dolly"
			titulo="Produtos"
			sub="Aqui pode alterar as informações dos produtos."
		/>
		<b-card no-body>
			<b-tabs card>
				<b-tab title="Produtos" active>
					<b-form>
						<b-row>
							<b-col md="2" sm="2">
								<b-form-group label="Código" label-for="p-i">
									<b-form-input id="p-i" type="number" v-model="p.i" />
								</b-form-group>
							</b-col>
							<b-col md="10" sm="10">
								<b-form-group label="Descrição" label-for="p-n">
									<b-form-input id="p-n" type="text"
								/></b-form-group>
							</b-col>
						</b-row>
					</b-form>
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import axios from "axios";
	import { mapState } from "vuex";
	import { baseApi, mostrarErro, mostrarSucesso } from "@/global";
	import TituloPagina from "../TituloPagina.vue";
	export default {
		nome: "Produtos",
		components: { TituloPagina },
		computed: mapState(["produtos"]),
	};
</script>

<style>
</style>