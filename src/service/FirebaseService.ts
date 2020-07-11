import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import store from "@/store/index";
import { FIRESTORE_COLLECTION } from "@/enums/FirestoreCollection";
import FirebaseUserDocument from "@/interfaces/firebase/FirebaseUserDocument";

export default class FirebaseService {
	private static firebaseAuthInstance: firebase.auth.Auth;
	private static firestoreInstance: firebase.firestore.Firestore;

	private static uiConfig = {
		signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
	};

	public static initializeFirebase(): void {
		import("@/firebase-config/firebase-config.json").then(config => {
			firebase.initializeApp(config);
			if (firebase.apps.length > 0) {
				console.log("Firebase initialized!");
				store.commit("setFirebaseConfigPresent", true);
				this.firebaseAuthInstance = firebase.auth();
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
				throw new Error("Wystapił problem ze znalezieniem użytkownika");
			})
			.catch(exception => {
				throw new Error(exception.message);
			});
	}

	public static getFirebaseAuthInstance(): firebase.auth.Auth {
		return this.firebaseAuthInstance;
	}
}
