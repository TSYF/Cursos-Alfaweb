<template>
	<v-data-table :headers="headers" :items="cursos">
		<template v-slot:item.acciones="{ item }">
			<v-btn icon small @click="Editar_Curso(item.uid)">
				<v-icon>mdi-pencil</v-icon>
			</v-btn>
			<v-btn icon small @click="Delete_Course(item.uid)">
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>
		<template v-slot:item.fecha="{ item }">
			<v-chip color="green accent-3">
				{{ item.fecha }}
			</v-chip>
		</template>
		<template v-slot:item.precio="{ item }">
			<v-chip color="green accent-3">
				{{ item.precio }}
			</v-chip>
		</template>
		<template v-slot:item.terminado="{ item }">
			<v-chip
				:color="item.terminado == 'Si' ? 'light-blue lighten-2' : ''"
			>
				{{ item.terminado }}
			</v-chip>
		</template>
	</v-data-table>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				headers: [
					{
						text: "Curso",
						align: "left",
						value: "nombre",
					},
					{
						text: "Cupos",
						align: "left",
						value: "cupos",
					},
					{
						text: "Inscritos",
						align: "left",
						value: "inscritos",
					},
					{
						text: "Duración",
						align: "left",
						value: "duracion",
					},
					{
						text: "Costo",
						align: "center",
						value: "precio",
					},
					{
						text: "Terminado",
						align: "left",
						value: `terminado`,
					},
					{
						text: "Fecha",
						align: "center",
						value: "fecha",
					},
					{
						text: "Acciones",
						align: "left",
						value: "acciones",
					},
				],
			};
		},
		computed: {
			...mapState(["cursos"]),
		},
		methods: {
			...mapActions(["Delete_Course"]),
			Editar_Curso(uid) {
				this.$router.push({
                    name: "editar-curso",
                    params: {
                        uid,
                    },
                });
			},
		},
	};
</script>

<style lang="scss" scoped></style>
