import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { FIRESTORE_COLLECTION } from "@/enums/FirestoreCollection";
import FirebaseUserDocument from "@/interfaces/firebase/FirebaseUserDocument";

import router from "@/router/index";
import store from "@/store/index";
import { Article } from "@/interfaces/firebase/FirebaseArticleDocument";
import FirebaseSerieDocument from "@/interfaces/firebase/FirebaseSerieDocument";
import Serie from "@/interfaces/Serie";

export default class FirebaseService {
	private static firebaseAuthInstance: firebase.auth.Auth;
	private static firestoreInstance: firebase.firestore.Firestore;

	public static initializeFirebase(): void {
		import("@/firebase-config/firebase-config.json").then(config => {
			firebase.initializeApp(config);
			if (firebase.apps.length > 0) {
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
	public static getSeries(): Promise<Array<Serie>> {
		return this.firestoreInstance
			.collection(FIRESTORE_COLLECTION.SERIES)
			.get()
			.then(querySnapshot => {
				if (!querySnapshot.empty) {
					const series: Array<Serie> = [];
					querySnapshot.docs.forEach(doc => {
						const firebaseSerie = doc.data() as FirebaseSerieDocument;
						series.push({
							id: parseInt(doc.id, 10),
							title: firebaseSerie.title
						});
					});
					return series;
				}
				throw new Error("Wystapił problem z pobraniem serii");
			})
			.catch(exception => {
				throw new Error(exception.message);
			});
	}

	public static createNewArticle(article: Article): Promise<boolean> {
		return this.firestoreInstance
			.collection(FIRESTORE_COLLECTION.ARTICLES)
			.add({
				...article.articleHeader,
				date: firebase.firestore.Timestamp.fromDate(
					new Date(article.articleHeader.date)
				)
			})
			.then(response => {
				return response
					.collection(FIRESTORE_COLLECTION.ARTICLE_CONTENT)
					.add(article.articleContent)
					.then(() => {
						return true;
					})
					.catch(exception => {
						throw new Error(exception.message);
					});
			})
			.catch(exception => {
				throw new Error(exception.message);
			});
	}

	public static getFirebaseAuthInstance(): firebase.auth.Auth {
		return this.firebaseAuthInstance;
	}
}
