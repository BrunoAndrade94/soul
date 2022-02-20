<template>
	<div class="botao">
		<i :class="icone" /><span>
			{{ titulo }}
		</span>
	</div>
</template>

<script>
	export default {
		nome: "Botao",
		props: {
			titulo: String,
			icone: String,
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