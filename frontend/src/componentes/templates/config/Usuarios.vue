<template>
	<div class="usuarios">
		<b-card no-body>
			<b-tabs pills card>
				<b-tab title="Usuário" active>
					<TituloPagina
						icone="fa fa-cogs"
						titulo="Usuário"
						:sub="`Aqui pode alterar as informaçõe de ${usuario.nome}!`"
					/>
					<BotaoCrud
						:desativarModoIncluir="modo === 'opcoes'"
						:clicarAtualizar="atualizar"
						:apenasAtualizar="true"
					/>
					<b-form>
						<input id="usuario-id" type="hidden" v-model="usuario.id" />
						<b-row>
							<b-col md="6" sm="12">
								<b-form-group label="Usuário:" label-for="usuario-usuario">
									<b-form-input
										id="usuario-usuario"
										type="text"
										v-model="usuario.usuario"
										@keydown.enter.native="clicou"
										required
										placeholder="Informe o usuário..."
									/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-row>
							<b-col md="6" sm="12">
								<b-form-group label="Nome:" label-for="usuario-nome">
									<b-form-input
										id="usuario-nome"
										type="text"
										@keydown.enter.native="clicou"
										v-model="usuario.nome"
										required
										placeholder="Informe o nome..."
									/>
								</b-form-group>
							</b-col>
							<b-col md="6" sm="12">
								<b-form-group label="E-mail:" label-for="usuario-email">
									<b-form-input
										id="usuario-email"
										type="email"
										@keydown.enter.native="clicou"
										v-model="usuario.email"
										required
										placeholder="Informe o e-mail..."
									/>
								</b-form-group>
							</b-col>
						</b-row>
						<b-form-checkbox
							id="alterarSenha"
							v-model="alterar"
							class="mt-4 mb-4 ml-4"
						>
							Alterar Senha
						</b-form-checkbox>
						<b-row v-if="alterar">
							<b-col md="6" sm="12">
								<b-form-group label="Senha:" label-for="usuario-senha">
									<b-form-input
										id="usuario-senha"
										type="password"
										@keydown.enter.native="clicou"
										v-model="usuario.senha"
										required
										placeholder="Informe a senha..."
									/>
								</b-form-group>
							</b-col>
							<b-col md="6" sm="12">
								<b-form-group
									label="Confirmação de Senha:"
									label-for="usuario-confirmacaoSenha"
								>
									<b-form-input
										id="usuario-confirmacaoSenha"
										type="password"
										@keydown.enter.native="clicou"
										v-model="usuario.confirmacaoSenha"
										required
										placeholder="Confirme a senha..."
									/>
								</b-form-group>
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
	import g from "@/global";
	import { mapState } from "vuex";
	import TituloPagina from "../TituloPagina.vue";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	export default {
		nome: "Usuarios",
		components: { TituloPagina, BotaoCrud },
		computed: mapState(["usuario"]),
		data: function () {
			return {
				modo: "opcoes",
				alterar: false,
			};
		},
		methods: {
			clicou(evento) {
				if (evento.which === 13) {
					this.atualizar();
				}
			},
			atualizar() {
				axios
					.put(`${g.baseApi}usuario/${this.usuario.id}`, this.usuario)
					.then(() => {
						g.mostrarSucesso(`${this.usuario.nome} atualizado com sucesso!`);
						this.limparSenha();
					})
					.catch(g.mostrarErro);
			},
			limparSenha() {
				this.usuario.senha = "";
				this.usuario.confirmacaoSenha = "";
			},
		},
		mounted() {
			this.limparSenha();
		},
	};
</script>

<style>
</style>