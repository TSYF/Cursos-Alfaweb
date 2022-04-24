<template>
    <v-container>
        <v-form @submit.prevent="
        Sign_In({
            email,
            password
        });
        email = '';
        password = '';
        ">
            <h1 class="text-center">Login</h1>
            <v-text-field
                v-model="email"
                label="Email"
                :rules="rules.email"
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Contraseña"
                :rules="rules.password"
            ></v-text-field>
            <v-btn
                color="primary"
                type="submit"
            >
                Login
            </v-btn>
            <v-btn
            class="ms-3"
            color="warning"
            @click="$router.push({name: 'home'})"
            >
                Devuelta
            </v-btn>
            <v-btn
            class="ms-3"
            color="info"
            @click="$router.push({name: 'registro'})"
            >Registrarse</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import rules from '@/helpers/rules.js';

    export default {
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            ...mapActions(["Sign_In"]),
        },
        
    }
</script>

<style lang="scss" scoped>

</style>