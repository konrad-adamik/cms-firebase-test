export default interface FirebaseUserDocument {
	avatarId: number;
	bookmarked: Array<String>;
	id: string;
	isCmsUser: boolean;
	liked: Array<String>;
	nickname: string;
}
