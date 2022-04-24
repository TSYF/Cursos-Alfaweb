<template>
	<v-container>
		<v-form @submit.prevent="registerAndAddUser(usuario)">
			<v-text-field
				v-model="usuario.nombre"
				label="Nombre"
				:rules="rules.name"
			></v-text-field>
			<v-text-field
				label="email"
				v-model="usuario.email"
				:rules="rules.email"
			></v-text-field>
			<v-text-field
				label="password"
				v-model="usuario.password"
				:rules="rules.password"
				type="password"
			></v-text-field>
			<v-text-field
				label="confirm password"
				v-model="confirmPassword"
				:rules="rules.passwordConfirmation"
				type="password"
			>
			</v-text-field>
			<v-row justify-center>
				<v-col>
					<v-btn color="primary" type="submit"> Registrarse </v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	import { mapActions } from "vuex";
	import rules from "@/helpers/rules.js";
	export default {
		data() {
			return {
				usuario: {
					nombre: "",
					email: "",
					password: "",
				},
				confirmPassword: "",
			};
		},
		methods: {
			...mapActions(["Register_User", "Sign_In", "Add_User"]),
			async registerAndAddUser() {
				try {
					const user = { ...this.usuario };
					user.uid = await this.Register_User(user);
					await this.Sign_In(user);
					delete user.password;
					await this.Add_User(user);
					this.$router.push({ name: "home" });
				} catch (error) {
					console.log(error);
				}
			},
		},
	};
</script>

<style lang="scss" scoped></style>
