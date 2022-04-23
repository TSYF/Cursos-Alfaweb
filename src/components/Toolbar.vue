<template>
	<v-app-bar app color="blue darken-4" dark>
		<v-app-bar-nav-icon @click="Toggle_LDrawer"></v-app-bar-nav-icon>
		<v-toolbar-title>Cursos Alfaweb</v-toolbar-title>
		<v-spacer />
		{{ getUser.nombre }}
		<v-btn right icon @click="Toggle_RDrawer">
			<v-icon>mdi-account-box</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {};
		},
		computed: {
			...mapGetters(["getUser"]),
		},
		methods: {
			...mapActions(["Toggle_LDrawer", "Toggle_RDrawer"]),
		},
	};
</script>

<style lang="scss" scoped></style>
