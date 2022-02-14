<template>
	<footer class="rodape">
		<span>Desenvolvido com <strong>s2</strong> por Bruno Andrade</span>
	</footer>
</template>

<script>
	export default {
		name: "Rodape",
	};
</script>

<style>
	.rodape {
		grid-area: footer;
		background-color: #ddd;
		color: #333;

		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 10px;
	}
</style>