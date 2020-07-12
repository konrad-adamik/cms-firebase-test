import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FIRESTORE_COLLECTION } from "@/enums/FirestoreCollection";
import FirebaseUserDocument from "@/interfaces/firebase/FirebaseUserDocument";

import router from "@/router/index";
import store from "@/store/index";

export default class FirebaseService {
	private static firebaseAuthInstance: firebase.auth.Auth;
	private static firestoreInstance: firebase.firestore.Firestore;

	public static initializeFirebase(): void {
		import("@/firebase-config/firebase-config.json").then(config => {
			firebase.initializeApp(config);
			if (firebase.apps.length > 0) {
				console.log("Firebase initialized!");
				store.commit("setFirebaseConfigPresent", true);
				this.firebaseAuthInstance = firebase.auth();
				this.firebaseAuthInstance.onAuthStateChanged(user => {
					if (user) {
						store.commit("setUserLoggedIn", true);
						store.commit("setUserEmail", user.email);
						router.replace("/menu");
					} else {
						store.commit("setUserLoggedIn", false);
						store.commit("setUserEmail", "");
						router.replace("/login");
					}
				});
				this.firestoreInstance = firebase.firestore();
			}
		});
	}

	public static loginWithEmailAndPassword(
		email: string,
		password: string
	): Promise<firebase.auth.UserCredential> {
		return this.firebaseAuthInstance
			.signInWithEmailAndPassword(email, password)
			.then(firebaseResponse => {
				return firebaseResponse;
			})
			.catch(firebaseErrorResponse => {
				throw new Error(firebaseErrorResponse.message);
			});
	}

	public static logOut(): Promise<void> {
		return this.firebaseAuthInstance.signOut();
	}

	public static getUserInfo(
		userId: string | undefined
	): Promise<FirebaseUserDocument> {
		return this.firestoreInstance
			.collection(FIRESTORE_COLLECTION.USERS)
			.where("id", "==", userId)
			.limit(1)
			.get()
			.then(querySnapshot => {
				if (!querySnapshot.empty) {
					const user: FirebaseUserDocument = querySnapshot.docs[0].data() as FirebaseUserDocument;
					return user;
				}
				throw new Error(
					"Wystapił problem z pobraniem danych dla użytkownika"
				);
			})
			.catch(exception => {
				throw new Error(exception.message);
			});
	}

	public static getFirebaseAuthInstance(): firebase.auth.Auth {
		return this.firebaseAuthInstance;
	}
}
