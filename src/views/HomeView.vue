<template>
	<v-container class="pa-10">
		<v-row justify="start" align="start" wrap>
				<v-card class="ma-5" v-for="curso in cursos" :key="curso.codigo" max-width="400">
					<v-img :src="curso.imagen" />
					<v-container class="pa-3 grey lighten-2">
						<v-card-title>
							<h3 class="headline mb-0 mx-auto">
								{{ curso.nombre }}
							</h3>
						</v-card-title>

						<div class="font-weight-bold ml-8 mb-2">Detalles</div>

						<v-timeline align-top dense>
							<v-timeline-item>
								<v-list-item>
									<h4>
										<v-icon>mdi-currency-usd</v-icon>
										Costo:&nbsp;
									</h4>
									{{ curso.precio }}
								</v-list-item>
								<v-list-item>
									<h4>
										<v-icon>mdi-clock</v-icon>
										Duración:&nbsp;
									</h4>
									{{ curso.duracion }}
								</v-list-item>
							</v-timeline-item>
							<v-timeline-item>
								<v-list-item>
									<h4>
										<v-icon>mdi-account-group</v-icon>
										Cupos:&nbsp;
									</h4>
									{{ curso.cupos - curso.inscritos }}
								</v-list-item>
								<v-list-item>
									<h4>
										<v-icon v-if="curso.terminado == 'No'">mdi-archive-check</v-icon>
										<v-icon v-else>mdi-archive-cancel</v-icon>
										Completado:&nbsp;
									</h4>
									{{ curso.terminado }}
								</v-list-item>
							</v-timeline-item>
							<v-timeline-item>
								<v-list-item two-line>
									<v-list-item-content>
										<span align="center">
											<h4>
												<v-icon>mdi-calendar-clock</v-icon>
												Fecha de Registro:
											</h4>
										</span>
										{{ curso.fecha }}
									</v-list-item-content>
								</v-list-item>
							</v-timeline-item>
							<v-timeline-item>
								<v-list-item two-line>
									<v-list-item-content>
										<h4>
											<v-icon>mdi-format-align-left</v-icon>
											Descripción:
										</h4>
										{{ curso.descripcion }}
								</v-list-item-content>
								</v-list-item>
							</v-timeline-item>
						</v-timeline>
					</v-container>
				</v-card>
		</v-row>
	</v-container>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex';
	// TODO: CREAR COMPONENTE DE LOS CURSOS
	export default {
		name: "Home",
		computed: {
			...mapState(["cursos"])
		},
	};
</script>
