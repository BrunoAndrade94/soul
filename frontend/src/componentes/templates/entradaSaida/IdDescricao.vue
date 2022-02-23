// IMPLEMENTAR DEPOIS QUE CONSEGUIR LER AS
// PROPRIEDADES DESTE COMPONENTE

<template>
	<div class="id-descricao">
		<b-row>
			<b-col md="2" sm="12">
				<b-form-group label="Código" :label-for="labelForId">
					<b-form-input
						required
						:id="idId"
						:readonly="true"
						:v-model="modelId"
						type="number"
						placeholder="#"
						min="0"
					/>
				</b-form-group>
			</b-col>
			<b-col md="6" sm="12">
				<b-form-group label="Descrição" :label-for="labelDescricao">
					<b-form-input
						required
						:id="idDescricao"
						type="text"
						:autofocus="true"
						:v-model="modelDescricao"
						:placeholder="placeHolder"
					/>
				</b-form-group>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		nome: "IdDescricao",
		props: {
			idId: String,
			labelForId: String,
			modelId: String,

			idDescricao: String,
			labelDescricao: String,
			modelDescricao: String,
			placeHolder: String,
		},
		computed: mapState(["modulo"]),
	};
</script>

<style>
</style>