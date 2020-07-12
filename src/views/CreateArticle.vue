<template>
	<div class="create-article-container">
		<custom-divider label="Informacje na temat artykułu" />
		<div class="article-header">
			<custom-input label="Autor" v-model="articleHeader.author" />
			<custom-input
				style="grid-row: 2"
				label="Tytuł"
				v-model="articleHeader.title"
			/>
			<custom-input
				type="datetime-local"
				label="Data"
				v-model="articleHeader.date"
			/>
			<custom-input
				style="grid-row: 2"
				label="Adres url obrazka"
				v-model="articleHeader.imageUrl"
			/>
			<custom-select
				label="Kategoria"
				v-model.number="articleHeader.serie"
				:select-options="serieSelectOptions"
			/>
			<custom-input
				style="grid-row: 2"
				label="Żółwiki"
				type="number"
				v-model.number="articleHeader.turtles"
			/>
			<custom-textarea label="Opis" v-model="articleHeader.description" />
			<custom-textarea
				label="Notatka autora"
				v-model="articleContent.authorNote"
			/>
			<custom-textarea
				label="Related note"
				v-model="articleContent.relatedNote"
			/>
			<custom-button
				class="add-articles-button"
				buttonText="Dodaj powiązane artykuły"
				@click="onAddRelatedArticlesClicked"
			/>
		</div>
		<custom-divider label="Treść artykułu" />
		<div class="article-content">
			<vue-editor
				class="content-editor"
				v-model="articleContent.contentBody"
			></vue-editor>
		</div>
		<div class="button-container">
			<custom-button buttonText="Anuluj" @click="onCancelClicked" />
			<custom-button
				:disabled="isCreateArticleDisbled"
				buttonText="Stwórz artykuł"
				@click="onCreateArticleClicked"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ArticleHeader, ArticleContent } from "@/interfaces/Article";
import { VueEditor } from "vue2-editor";
import moment from "moment";

@Component({
	components: {
		VueEditor
	}
})
export default class CreateArticle extends Vue {
	get isCreateArticleDisbled(): boolean {
		if (
			!this.articleHeader.author ||
			!this.articleHeader.date ||
			!this.articleHeader.description ||
			!this.articleHeader.imageUrl ||
			!this.articleHeader.title ||
			!this.articleHeader.serie ||
			!!this.articleHeader.turtles ||
			!this.articleContent.contentBody
		) {
			return true;
		}
		return false;
	}

	private articleHeader: ArticleHeader = {
		author: "",
		date: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
		description: "",
		imageUrl: "",
		title: "",
		serie: 0,
		turtles: 0
	};

	private articleContent: ArticleContent = {
		authorNote: "",
		contentBody: "",
		relatedArticles: [],
		relatedNote: ""
	};

	private serieSelectOptions = [
		{
			value: 0,
			label: ""
		},
		{
			value: 1,
			label: "Waga snu w optymalnym rozwoju sylwetki"
		}
	];

	private onCancelClicked(): void {
		this.$router.back();
	}

	private onCreateArticleClicked(): void {
		if (!this.isCreateArticleDisbled) {
			console.log("AA");
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

.article-header {
	display: grid;
	grid-template-columns: repeat((7, calc((100% / 7) - 15px)));
	grid-template-rows: repeat((2, 80px));
	height: 160px;
	column-gap: 15px;
	padding-left: 20px;
	padding-right: 20px;
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
