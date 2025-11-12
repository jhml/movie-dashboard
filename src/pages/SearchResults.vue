<template>
  <main class="search-results-page">
    <header class="results-header" aria-live="polite">
      <h2 v-if="query">Search results for “{{ query }}”</h2>
      <h2 v-else>Search shows</h2>
    </header>

    <div class="status" role="status" aria-live="polite">
      <span v-if="isLoading">Searching…</span>
      <span v-else-if="error" role="alert" class="error">{{ error }}</span>
    </div>

    <p class="sr-only" aria-live="polite" v-if="!isLoading && !error">
      {{ results.length }} result{{ results.length === 1 ? "" : "s" }}
    </p>

    <ul v-if="!isLoading && !error" class="shows results-list" role="list" aria-label="Search results">
      <ShowCard v-for="s in results" :key="s.id" :show="s" />
      <li v-if="!results.length" class="no-results" role="listitem">No results</li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import type { Show } from "@/types/common";
import { searchShows } from "@/services/shows.service";
import ShowCard from "@/components/shows/ShowCard.vue";

const route = useRoute();
const results = ref<Show[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const query = computed(() => String(route.query.q ?? "").trim());

async function runSearch(q: string) {
  const term = (q || "").trim();
  if (!term) {
    results.value = [];
    error.value = null;
    isLoading.value = false;
    return;
  }
  isLoading.value = true;
  error.value = null;
  try {
    const res = await searchShows(term);
    results.value = res ?? [];
  } catch (err: unknown) {
    results.value = [];
    error.value = err instanceof Error ? err.message : "Search failed";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => { if (query.value) runSearch(query.value); });
watch(query, (v) => runSearch(v));
</script>

<style scoped>
.search-results-page { max-width: 1240px; padding: 0 1rem 0 1rem; }

.center { text-align: center; color: #666; padding: 2rem 0; }
.error { color: #a00; }
.results-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
.no-results { color: #666; padding: 1rem; }

.sr-only {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0; padding: 0; margin: -1px;
}
</style>