<template>
	<v-container>
		<h1>Administración</h1>
        <AddCourseDialog />
        <AdminTable />
		<v-btn color="primary" @click="Toggle_Dialog">Añadir Curso</v-btn>
		
	</v-container>
</template>

<script>
import AddCourseDialog from '@/components/AddCourseDialog.vue';
import AdminTable from '@/components/AdminTable.vue';
import { mapState, mapActions } from 'vuex';

	export default {
        methods: {
            ...mapActions(["Toggle_Dialog"]),
        },
        components: {
            AddCourseDialog,
            AdminTable,
        },
	};
</script>

<style></style>
