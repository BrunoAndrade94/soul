<template>
	<footer class="rodape">
		<span
			>Desenvolvido com <strong> <i class="fa-solid fa-heart" /> </strong> por
			Bruno Andrade</span
		>
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

		align-content: right;
		display: flex;
		align-items: center;
		justify-content: right;
		padding-right: 23px;
	}
	.rodape i {
		color: rgb(0, 255, 21);
	}
</style>