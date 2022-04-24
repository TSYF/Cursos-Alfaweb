<template>
	<v-navigation-drawer
        app
		temporary
		dark
		color="blue darken-4"
		v-model="ldrawer"
	>
		<v-list nav dense>
			<v-list-item-group
                active-class="blue darken-3"
            >
				<v-list-item>
					<v-list-item-title>
						<router-link
							class="text-decoration-none"
							:to="{ name: 'home' }"
						>
							Inicio
						</router-link>
					</v-list-item-title>
				</v-list-item>
				<v-divider />
				<v-list-item v-if="!user">
					<v-list-item-title>
						<router-link
							class="text-decoration-none"
							:to="{ name: 'registro' }"
						>
							Registrarse
						</router-link>
					</v-list-item-title>
				</v-list-item>
				<v-divider />
				<v-list-item v-if="!user">
					<v-list-item-title>
						<router-link
							class="text-decoration-none"
							:to="{ name: 'login' }"
						>
							Login
						</router-link>
					</v-list-item-title>
				</v-list-item>
				<v-divider />
				<v-list-item v-if="user">
					<v-list-item-title>
						<router-link
							class="text-decoration-none"
							:to="{ name: 'admin' }"
						>
							Admin
						</router-link>
					</v-list-item-title>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		computed: {
			...mapState(["ldrawer", "user"]),
		},
	};
</script>

<style lang="scss" scoped>
	a {
        font-size: 1.2rem;
        font-weight: 600;
		color: inherit !important;
	}
</style>
