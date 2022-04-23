<template>
    <v-navigation-drawer app temporary v-model="ldrawer">
        <v-list dense>
            <v-list-item>
                <v-list-item-title>
                    <router-link :to="{name: 'home'}">
                        Inicio
                        </router-link>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-title>
                    <router-link :to="{name: 'registro'}">
                        Registrarse
                        </router-link>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-title>
                    <router-link :to="{name: 'login'}">
                        Login
                        </router-link>
                </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-title>
                    <router-link :to="{name: 'admin'}">
                        Admin
                        </router-link>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState(['ldrawer']),
        },
    }
</script>

<style lang="scss" scoped>
    // a {
        // color: inherit;
        // text-decoration: inherit;
    // }
</style>