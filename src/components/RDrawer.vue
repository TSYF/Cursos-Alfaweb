<template>
        <v-navigation-drawer
            height="20vh"
            class="mt-16"
            app
            right
            temporary
            v-model="rdrawer">
            <v-list class="text-center">
                <v-list-item>
                    <v-list-item-avatar v-if="!getUser.isDummy">
                        <v-icon>mdi-account-box</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="ms-3">
                        <v-list-item-title>
                            {{ getUser.nombre }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ getUser.email }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-content>
                            <v-btn
                                v-if="!getUser.isDummy"
                                text
                                @click="Sign_Out">
                                Cerrar Sesion
                            </v-btn>
                            <div v-else>
                            <v-btn
                                text
                                @click="$router.push({name: 'login'})"
                            >
                            <v-icon>mdi-account-circle</v-icon>
                            Login
                            </v-btn>
                            <br>
                            <v-btn
                                text
                                @click="$router.push({name: 'registro'})"
                            >
                                <v-icon>mdi-account-plus</v-icon>
                                <span>Registrarse</span>
                            </v-btn>
                            </div>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex';

	export default {
        name: 'RDrawer',
		computed: {
			...mapState(["rdrawer"]),
            ...mapGetters(["getUser"]),
		},
        methods: {
            ...mapActions(["Sign_Out"]),
        },
	};
</script>

<style lang="scss" scoped></style>
