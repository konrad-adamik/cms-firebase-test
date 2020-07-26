<template>
	<div class="create-article-container">
		<custom-divider label="Informacje na temat artykułu" />
		<NewArticleHeader ref="newArticleHeader" />
		<custom-divider label="Treść artykułu" />
		<div class="article-content">
			<vue-editor
				class="content-editor"
				v-model="articleContent.contentBody"
			></vue-editor>
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
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewArticleHeader from "@/components/new-article/article-header/NewArticleHeader.vue";
import { VueEditor } from "vue2-editor";
import FirebaseService from "../service/FirebaseService";

@Component({
	components: {
		NewArticleHeader,
		VueEditor
	}
})
export default class CreateArticle extends Vue {
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
				.then(resposne => {
					console.log("SUCESS!", resposne);
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
.create-article-container {
	display: flex;
	flex-direction: column;
}

.article-content {
	height: calc(45vh + 50px);
	padding-left: 20px;
	padding-right: 20px;
}

.content-editor {
	height: 45vh;
}

.button-container {
	margin-top: 20px;
	display: flex;
	width: calc(100% - 40px);
	padding-left: 20px;
	justify-content: space-between;
}
</style>
