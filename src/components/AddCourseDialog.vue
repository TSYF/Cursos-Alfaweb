<template>
    <v-dialog v-model="dialog" max-width="600">
			<v-card class="pa-5">
            <h2 class="text-center">Añadir Curso</h2>
				<v-form>
					<v-text-field
                    label="Nombre del Curso"
                    v-model="curso.nombre"
                    required
                    />
					<v-text-field
                    label="URL de la Imagen del Curso"
                    v-model="curso.imagen"
                    required
                    />
					<v-text-field
						type="number"
						label="Cupos del Curso"
						v-model.number="curso.cupos"
                        required
					/>
					<v-text-field
						type="number"
						label="Inscritos del Curso"
						v-model.number="curso.inscritos"
                        required
					/>
					<v-text-field
						label="Duración del Curso"
						v-model="curso.duracion"
                        required
					/>
					<v-text-field
						type="number"
						label="Precio del Curso"
						v-model.number="curso.precio"
                        required
					/>
                    <v-text-field
                        label="Código del Curso"
                        v-model="curso.codigo"
                        required
                    />
                    <v-checkbox
                        label="¿El curso está terminado?"
                        v-model="curso.terminado"
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
                                required
							/>
						</template>
						<v-date-picker
							center
							v-model="curso.fecha"
							@change="menuFecha = false"
						></v-date-picker>
					</v-menu>
					<v-divider />
					<v-textarea
						label="Descripción"
						v-model="curso.descripcion"
                        required
					/>
                    <v-btn
                    color="primary"
                    @click="addCurso"
                    >
                        Añadir Curso
                    </v-btn>
				</v-form>
			</v-card>
		</v-dialog>
</template>

<script>
import { Timestamp } from 'firebase/firestore';
import { mapState, mapActions } from 'vuex';

    export default {
        name: 'AddCourseDialog',
        data() {
            return {
                curso: {
                    nombre: "",
                    imagen: "",
                    cupos: 0,
                    inscritos: 0,
                    duracion: "",
                    precio: 0,
                    codigo: "",
                    terminado: false,
                    fecha: "",
                    descripcion: "",
                },
                menuFecha: false,
            }
        },
        computed: {
            ...mapState(["dialog"]),
        },
        methods: {
            ...mapActions(["Toggle_Dialog", "Add_Course"]),
            addCurso() {
                // clonar curso
                const curso = {...this.curso};
                // parsear valores de curso
                const dateOneOff = new Date(curso.fecha);
                curso.fecha = Timestamp.fromDate(new Date(dateOneOff.getFullYear(), dateOneOff.getMonth(), dateOneOff.getDate() + 1));
                
                // añadir curso a la base de datos
                this.Add_Course(curso);

                // Limpiar valores de curso
                this.curso.uid = "";
                this.curso.nombre = "";
                this.curso.imagen = "";
                this.curso.cupos = 0;
                this.curso.inscritos = 0;
                this.curso.duracion = 0;
                this.curso.precio = 0;
                this.curso.codigo = "";
                this.curso.fecha = "";
                this.curso.descripcion = "";
                this.Toggle_Dialog();
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>