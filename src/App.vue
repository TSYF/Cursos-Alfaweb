<template>
	<v-app>
		<Toolbar />
		<LDrawer />
		<RDrawer />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import LDrawer from '@/components/LDrawer.vue';
import RDrawer from '@/components/RDrawer.vue';
import { mapState } from 'vuex';

	export default {
		name: "App",
		beforeCreate() {
			this.$store.dispatch("Get_Courses");
		},
		data: () => ({
			//
		}),
		components: {
			Toolbar,
			LDrawer,
			RDrawer
		},
	};
</script>
