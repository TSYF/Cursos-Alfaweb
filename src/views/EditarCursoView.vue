<template>
	<v-container>
		<v-form>
			<h1>Editar Curso</h1>
			<v-text-field label="Nombre" v-model.trim="curso.nombre" />
			<v-text-field
				label="URL de la Imagen"
				v-model.trim="curso.imagen"
			/>
			<v-text-field
				type="number"
				label="Cupos"
				v-model.number="curso.cupos"
			/>
			<v-text-field
				type="number"
				label="Inscritos"
				v-model.number="curso.inscritos"
			/>
			<v-text-field label="Duración" v-model.trim="curso.duracion" />
			<v-text-field
				type="number"
				label="Precio"
				v-model.number="curso.precio"
			/>
			<v-text-field label="Código" v-model.trim="curso.codigo" />
			<v-checkbox
				label="¿El curso está terminado?"
				v-model.trim="curso.terminado"
			/>
			<v-menu
				v-model="menuFecha"
				max-width="290"
				:close-on-content-click="false"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-text-field
						:value="curso.fecha"
						v-bind="attrs"
						clearable
						readonly
						v-on="on"
						label="Fecha de Inicio"
						@click:clear="curso.fecha = null"
					/>
				</template>
			</v-menu>
			<v-btn
				color="primary"
				@click="
            Update_Course({
                uid,
                fields
            });
            resetForm();
            "
				>Editar Curso</v-btn
			>
			<v-btn>Volver</v-btn>
		</v-form>
	</v-container>
</template>

<script>
	import { mapActions, mapState } from "vuex";

	export default {
		data() {
			return {
				curso: {
					nombre: "",
					imagen: "",
					cupos: null,
					inscritos: null,
					duracion: "",
					precio: null,
					codigo: "",
					terminado: false,
					fecha: null,
				},
				uid: this.$attrs.uid,
				menuFecha: null,
			};
		},
		computed: {
			// Objeto curso sin atributos vacios
			fields() {
				const curso = { ...this.curso };
				for (const key in curso) {
					if (curso[key] === null || curso[key] === "") {
						delete curso[key];
					}
				}
				return curso;
			},
		},
		methods: {
			...mapActions(["Update_Course"]),
			resetForm() {
				this.curso = {
					nombre: "",
					imagen: "",
					cupos: null,
					inscritos: null,
					duracion: "",
					precio: null,
					codigo: "",
					terminado: false,
					fecha: null,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
