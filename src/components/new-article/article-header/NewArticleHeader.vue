<template>
	<el-form
		class="new-article-header"
		ref="newArticleForm"
		size="mini"
		label-position="top"
		label-width="auto"
		:rules="newArticleRules"
		:model="newArticleModel"
		@submit.native.prevent="this.submit"
	>
		<el-form-item label="Autor" prop="author">
			<el-input v-model="newArticleModel.author" />
		</el-form-item>
		<el-form-item label="Tytuł" prop="title">
			<el-input style="grid-row: 2" v-model="newArticleModel.title" />
		</el-form-item>
		<el-form-item label="Data" prop="date">
			<el-input type="datetime-local" v-model="newArticleModel.date" />
		</el-form-item>
		<el-form-item label="Adres URL obrazu" prop="imageUrl">
			<el-input v-model="newArticleModel.imageUrl" />
		</el-form-item>
		<el-form-item class="new-article-serie" label="Seria" prop="serie">
			<el-select v-model.number="newArticleModel.serie" placeholder="">
				<el-option
					v-for="item in serieOptionList"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				>
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Liczba żółwików" prop="turtles">
			<el-input-number
				type="number"
				v-model.number="newArticleModel.turtles"
			/>
		</el-form-item>
		<el-form-item
			style=" grid-column: 4; grid-row: 1 / span 2;"
			label="Opis"
			prop="description"
		>
			<el-input
				type="textarea"
				resize="none"
				rows="6"
				v-model="newArticleModel.description"
			/>
		</el-form-item>
		<el-form-item
			style=" grid-column: 5; grid-row: 1 / span 2;"
			label="Notatka autora"
			prop="authorNote"
		>
			<el-input
				type="textarea"
				resize="none"
				rows="6"
				v-model="newArticleModel.authorNote"
			/>
		</el-form-item>
		<el-form-item
			style=" grid-column: 6; grid-row: 1 / span 2;"
			label="Notatka do artykułów powiązanych"
			prop="relatedNote"
		>
			<el-input
				type="textarea"
				resize="none"
				rows="6"
				v-model="newArticleModel.relatedNote"
			/>
		</el-form-item>
		<div class="add-related-articles-button">
			<el-button
				class=""
				type="primary"
				@click="onAddRelatedArticlesClicked"
				>Dodaj powiązane artykuły</el-button
			>
		</div>
	</el-form>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectOption from "@/interfaces/SelectOption";
import {
	ArticleHeader,
	ArticleContent
} from "@/interfaces/firebase/FirebaseArticleDocument";
import FirebaseService from "../../../service/FirebaseService";
import moment from "moment";

@Component
export default class NewArticleHeader extends Vue {
	private validateTurtles = (
		rule: any,
		value: number,
		callback: Function
	) => {
		if (value < 0) {
			callback(new Error("Liczba zółwików nie może być ujemna"));
		}
		if (value === null || value === undefined) {
			callback(new Error("To pole nie może być puste"));
		}
		callback();
	};

	private serieOptionList: Array<SelectOption> = [];

	private newArticleModel = {
		author: "",
		date: moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL),
		description: "",
		imageUrl: "",
		title: "",
		serie: undefined,
		turtles: 0,
		authorNote: "",
		relatedArticles: [],
		relatedNote: ""
	};

	private newArticleRules = {
		author: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		description: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		imageUrl: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		title: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		serie: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		date: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		turtles: [
			{
				required: true,
				validator: this.validateTurtles,
				trigger: "change"
			}
		],
		authorNote: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		],
		relatedNote: [
			{
				required: true,
				message: "To pole nie może być puste",
				trigger: "change"
			}
		]
	};

	beforeMount(): void {
		this.getSeriesOptions();
	}

	private getSeriesOptions(): void {
		FirebaseService.getSeries().then(response => {
			this.serieOptionList = response.map(serie => {
				return {
					key: serie.id,
					label: serie.title,
					value: serie.id
				};
			});
		});
	}

	validate(): boolean {
		let isArticleHeaderValid = false;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(this.$refs.newArticleForm as any).validate((valid: boolean) => {
			console.log("VALID?", valid);
			isArticleHeaderValid = valid;
			return valid;
		});
		return isArticleHeaderValid;
	}

	getNewArticleHeader(): ArticleHeader {
		return {
			author: this.newArticleModel.author,
			date: this.newArticleModel.date,
			description: this.newArticleModel.description,
			imageUrl: this.newArticleModel.imageUrl,
			title: this.newArticleModel.title,
			serie: this.newArticleModel.serie,
			turtles: this.newArticleModel.turtles
		};
	}

	getNewArticleContentPart(): ArticleContent {
		return {
			authorNote: this.newArticleModel.authorNote,
			relatedNote: this.newArticleModel.relatedNote,
			relatedArticles: this.newArticleModel.relatedArticles,
			contentBody: ""
		};
	}

	onAddRelatedArticlesClicked(): void {
		// TODO: show articles modal
	}
}
</script>
<style scoped lang="scss">
.new-article-header {
	display: grid;
	grid-template-columns: repeat((7, auto));
	grid-template-rows: repeat((2, auto));
	height: 160px;
	column-gap: 15px;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 18px;
}

.new-article-serie {
	div {
		width: 100%;
	}
}

.add-related-articles-button {
	align-self: center;
	grid-row: 1 / span 2;
	grid-column: 7;
}
</style>
