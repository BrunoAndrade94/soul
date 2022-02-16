<template>
	<div class="estatistica">
		<div class="estatistica-icone">
			<i :class="icone" :style="estilo" />
		</div>
		<div class="estatistica-info">
			<span class="estatistica-titulo">{{ titulo }}</span>
			<span class="estatistica-valor">{{ valor }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		nome: "Estatistica",
		props: ["icone", "cor", "titulo", "valor"],
		computed: {
			estilo() {
				return "color: " + (this.cor || "#000");
			},
		},
	};
</script>

<style>
	.estatistica {
		flex: 1;
		display: flex;
		border-radius: 8px;
		margin-right: 20px;
		margin-bottom: 20px;
		background-color: #fff;
		padding: 20px;
		border: 1px solid rgba(0, 0, 0, 0.3);
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
	}
	.estatistica-icone {
		display: flex;
		align-items: center;
	}
	.estatistica-icone i {
		font-size: 3rem;
	}
	.estatistica-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.estatistica-titulo {
		font-size: 1.2rem;
	}
	.estatistica-valor {
		font-size: 3rem;
	}
</style>