

<template>
	<div>
		<h1 id="dashboard-title" class="title">Welcome to Flimpje, we bring you top 10 shows in every genre ever invented..</h1>
		<div v-if="showsStore.isLoading" role="status" aria-live="polite">Loading...</div>
		<div v-else-if="showsStore.error" role="alert" aria-live="assertive">
			{{ showsStore.error }}
		</div>
		<div v-else class="vis" >
            <ShowList
                v-for="(shows, genre) in showsStore.showsByGenre"
                :key="genre"
                :genre="genre"
                :shows="shows"
            />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { useShowsStore } from "@/stores/shows.store"
import ShowList from "@/components/shows/ShowList.vue"

const showsStore = useShowsStore()
onMounted(() => {
	showsStore.loadShows()
})
</script>

<style scoped>
    .vis {
        overflow: visible;
    }
		.title {
			font-size: 1.5rem;
		}
</style>
