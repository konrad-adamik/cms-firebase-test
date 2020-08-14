<template>
	<div>
		<div class="create-article-container">
			<div class="section-container">
				<section class="article-header-section">
					<divider label="Informacje na temat artykułu" />
					<NewArticleHeader ref="newArticleHeader" />
				</section>
				<section class="article-content-section">
					<divider label="Treść artykułu" />
					<div class="article-content">
						<vue-editor
							class="content-editor"
							v-model="articleContent.contentBody"
						></vue-editor>
					</div>
				</section>
			</div>
			<div class="button-container">
				<el-button type="primary" @click="onCancelClicked"
					>Anuluj</el-button
				>
				<el-button type="primary" @click="onCreateArticleClicked"
					>Stwórz nowy artykuł</el-button
				>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { VueEditor } from "vue2-editor";

import NewArticleHeader from "@/components/new-article/article-header/NewArticleHeader.vue";
import TheDialogUtils from "@/utils/TheDialogUtils";

import FirebaseService from "../service/FirebaseService";

@Component({
	components: {
		NewArticleHeader,
		VueEditor
	}
})
export default class CreateArticle extends Vue {
	private theDialogUtils = new TheDialogUtils();

	private articleContent = {
		contentBody: ""
	};

	private onCancelClicked(): void {
		this.$router.back();
	}

	private onCreateArticleClicked(): void {
		const isArticleHeaderValid = (this.$refs
			.newArticleHeader as NewArticleHeader).validate();

		if (isArticleHeaderValid) {
			this.$store.commit(
				"toggleLoadingSpinner",
				"Tworzenie nowego artykułu..."
			);
			FirebaseService.createNewArticle({
				articleHeader: (this.$refs
					.newArticleHeader as NewArticleHeader).getNewArticleHeader(),
				articleContent: {
					...(this.$refs
						.newArticleHeader as NewArticleHeader).getNewArticleContentPart(),
					contentBody: this.articleContent.contentBody
				}
			})
				.then(() => {
					this.theDialogUtils.showDialogWithMessage({
						title: "Sukces",
						message: "Poprawnie dodano nowy artykuł.",
						width: "20%",
						buttonList: [
							{
								name: "Powrót do menu",
								click: () => {
									this.theDialogUtils.hideDialog();
									this.$router.back();
								}
							},
							{
								name: "Dodaj kolejny artykuł",
								click: () => {
									this.theDialogUtils.hideDialog();
									this.articleContent.contentBody = "";
								},
								type: "primary"
							}
						]
					});
				})
				.catch(exception => {
					throw new Error(exception.message);
				})
				.finally(() => {
					this.$store.commit("toggleLoadingSpinner");
				});
		}
	}

	private onAddRelatedArticlesClicked(): void {
		// TODO: add related articles
	}
}
</script>
<style scoped lang="scss">
$content-editor-width: 450px;

.create-article-container {
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	justify-content: space-between;
	padding-right: 20px;
}

.section-container {
	display: flex;
}

.article-header-section {
	width: calc(100% - #{$content-editor-width});
}

.article-content-section {
	width: $content-editor-width;
}

.article-content {
	display: flex;
	height: calc(90% - 50px);
	justify-content: center;
}

.content-editor {
	height: 90%;
	padding-left: 20px;
	padding-right: 20px;
}

.button-container {
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	padding-left: 20px;
	width: calc(100% - 40px);
}

@media screen and (max-width: 1100px) {
	.section-container {
		flex-direction: column;
		align-items: center;
	}
	.article-content {
		display: flex;
		height: 900px;
		justify-content: center;
	}

	.article-header-section {
		width: 100% !important;
	}

	.article-content-section {
		width: 100% !important;
	}

	.content-editor {
		height: 750px;
		width: $content-editor-width;
	}
}
</style>
