<template>
	<div class="menu-container">
		<div class="menu-grid">
			<MenuCard
				v-for="(item, index) in menuEntryList"
				:key="index"
				:title="item.title"
				:disabled="item.disabled"
				:menu-clicked="item.menuClicked"
			>
				<i
					slot="menu-card-icon"
					:class="item.icon"
					aria-hidden="true"
				></i>
			</MenuCard>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuCard from "@/components/menu-card/MenuCard.vue";
import MenuCardEntry from "@/interfaces/MenuCardEntry";

@Component({
	components: {
		MenuCard
	}
})
export default class Menu extends Vue {
	menuEntryList: Array<MenuCardEntry> = [
		{
			title: "Dodaj nowy artykuł",
			disabled: false,
			icon: "fa fa-plus fa-3x",
			menuClicked: this.onAddArticleClicked
		},
		{
			title: "Edytuj artykuł",
			disabled: true,
			icon: "fa fa-edit fa-3x",
			menuClicked: this.onEditArticleClicked
		},
		{
			title: "Przeglądaj artykuły",
			disabled: true,
			icon: "fa fa-eye fa-3x",
			menuClicked: this.onViewArticlesClicked
		}
	];

	onAddArticleClicked(): void {
		console.log("add article!");
	}
	onEditArticleClicked(): void {
		console.log("edit article!");
	}
	onViewArticlesClicked(): void {
		console.log("view articles");
	}
}
</script>
<style scoped lang="scss">
.menu-container {
	display: flex;
	align-items: center;
	justify-content: center;
}

.menu-grid {
	display: grid;
	grid-template-columns: repeat(3, 280px);
	grid-template-rows: repeat(2, 280px);
	row-gap: 15px;
	column-gap: 15px;
}
</style>
