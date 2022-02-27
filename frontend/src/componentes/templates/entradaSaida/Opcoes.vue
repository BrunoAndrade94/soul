<template>
	<div class="opcoes">
		<b-table responsive hover striped :items="_items" :fileds="_fileds">
			<template :slot="_slot" :slot-scope="_slot_scope">
				<b-button variant="info" :v-show="_v_show" @click="_click">
					<i class="fa-solid fa-cogs" />
				</b-button>
				<b-button variant="warning" :v-show="_v_show" @click="_click">
					<i class="fa-solid fa-cancel" />
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
	export default {
		nome: "Opcoes",
		props: {
			_items: Object,
			_fileds: String,
			_slot: Object,
			_slot_scope: String,
			_v_show: String,
			_click: String,
		},
	};
</script>

<style>
</style>