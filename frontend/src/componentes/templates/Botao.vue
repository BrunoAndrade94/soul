<template>
	<div class="botao">
		<b-form>
			<b-row>
				<b-col md="2" sm="2">
					<b-form-group :label="labelId" :label-for="labelFor">
						<b-form-input
							:id="iD"
							:type="type"
							:v-model="vModel"
							:readonly="readOnly"
							:placeholder="placeHolder"
						></b-form-input>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group :label="labelInput" :label-for="labelForInput">
						<b-form-input
							:id="idInput"
							:type="typeInput"
							:v-model="vModelInput"
							:placeholder="placeHolderInput"
						></b-form-input>
					</b-form-group>
				</b-col>
			</b-row>
		</b-form>
	</div>
</template>

<script>
	export default {
		nome: "Botao",
		props: {
			iD: String,
			labelId: String,
			labelFor: String,
			type: String,
			vModel: Object,
			readOnly: Boolean,
			placeHolder: String,

			idInput: String,
			labelInput: String,
			labelForInput: String,
			typeInput: String,
			vModelInput: Object,
			placeHolderInput: String,
		},
	};
</script>

<style>
	.botao i {
		color: aqua;
	}
	.botao span {
		display: center;
		align-items: flex-end;
		font-size: 17px;
	}
</style>