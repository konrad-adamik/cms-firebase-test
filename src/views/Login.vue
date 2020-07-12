<template>
	<div class="login-container ">
		<div class="login-panel">
			<div class="login-form">
				<custom-input
					autocomplete="nope"
					label="E-mail"
					v-model="email"
					:keyup-enter="onLoginClicked"
				/>
				<custom-input
					autocomplete="new-password"
					type="password"
					label="Hasło"
					v-model="password"
					:keyup-enter="onLoginClicked"
				/>
				<custom-button
					buttonText="Zaloguj się"
					@click="onLoginClicked"
				/>
			</div>
			<p class="login-error-message">{{ errorMessage }}</p>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FirebaseService from "../service/FirebaseService";

@Component
export default class Login extends Vue {
	email = "";
	errorMessage = "";
	password = "";

	onLoginClicked(): void {
		this.errorMessage = "";
		this.$store.commit("toggleLoadingSpinner", "Logowanie...");
		if (!this.$store.state.appState.firebaseConfigPresent) {
			this.errorMessage =
				"Połączenie z bazą nie zostało poprawnie zaincjalizowane";
			return;
		}
		FirebaseService.loginWithEmailAndPassword(this.email, this.password)
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
	color: #05063e;
}
</style>
