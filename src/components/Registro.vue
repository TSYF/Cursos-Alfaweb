<template>
	<v-container>
		<v-form @submit.prevent="registerAndAddUser(usuario)">
			<v-text-field
				v-model="usuario.nombre"
				label="Nombre"
				:rules="[rules.required]"
			></v-text-field>
			<v-text-field
				label="email"
				v-model="usuario.email"
				:rules="[rules.required, rules.email(usuario.email)]"
			></v-text-field>
			<v-text-field
				label="password"
				v-model="usuario.password"
				:rules="[rules.required, rules.min(usuario.password, 6)]"
				type="password"
			></v-text-field>
			<v-text-field
				label="confirm password"
				v-model="confirmPassword"
				:rules="[
					rules.required,
					rules.confirmPassword(confirmPassword),
				]"
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
	export default {
		data() {
			return {
				usuario: {
					nombre: "",
					email: "",
					password: "",
				},
				confirmPassword: "",
				rules: {
					required: (value) => !!value || "Campo Requerido!.",
					email: (value) => {
						return (
							/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
								value
							) || "Dirección de correo inválida."
						);
					},
					min: (value, num) =>
						value.length >= num ||
						"La contraseña debe tener al menos 6 caracteres.",
					confirmPassword: (value) => {
						return (
							value === this.usuario.password ||
							"Las contraseñas no coinciden."
						);
					},
				},
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
