<template>
	<div class="login-container ">
		<div class="login-panel">
			<el-form
				class="login-form"
				ref="loginForm"
				:rules="loginRules"
				:model="loginModel"
				@submit.native.prevent="validateLogin"
			>
				<el-form-item label="E-mail" prop="email">
					<el-input v-model="loginModel.email" />
				</el-form-item>
				<el-form-item label="Hasło" prop="password">
					<el-input type="password" v-model="loginModel.password" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit"
						>Zaloguj się</el-button
					>
				</el-form-item>
			</el-form>
			<p class="login-error-message">{{ errorMessage }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FirebaseService from "../service/FirebaseService";

@Component
export default class Login extends Vue {
	loginModel = {
		email: "",
		password: ""
	};

	loginRules = {
		email: [
			{
				required: true,
				message: "Login nie może być pusty",
				trigger: "change"
			}
		],
		password: [
			{
				required: true,
				message: "Hasło nie może być puste",
				trigger: "change"
			}
		]
	};

	errorMessage = "";

	validateLogin() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.$refs.loginForm as any).validate((valid: boolean) => {
			if (valid) {
				this.login();
			}
			return valid;
		});
	}

	login(): void {
		this.errorMessage = "";
		this.$store.commit("toggleLoadingSpinner", "Logowanie...");
		if (!this.$store.state.appState.firebaseConfigPresent) {
			this.errorMessage =
				"Połączenie z bazą nie zostało poprawnie zaincjalizowane";
			return;
		}
		FirebaseService.loginWithEmailAndPassword(
			this.loginModel.email,
			this.loginModel.password
		)
			.then(response => {
				if (response.user?.uid) {
					FirebaseService.getUserInfo(response.user?.uid)
						.then(user => {
							if (!user.isCmsUser) {
								this.errorMessage =
									"Ten użytkownik nie ma odpowiednich uprawnień";
								FirebaseService.logOut();
							}
						})
						.catch(exception => (this.errorMessage = exception));
				}
			})
			.catch(exception => (this.errorMessage = exception))
			.finally(() => this.$store.commit("toggleLoadingSpinner"));
	}
}
</script>
<style scoped lang="scss">
@use "src/loadingspinner";

.login-container {
	align-items: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
}

.login-panel {
	background-color: #ffffff;
	box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.4);
	height: 300px;
	width: 300px;
}

.login-error-message {
	color: #f56c6c;
}
</style>
