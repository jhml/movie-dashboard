<template>
  <main class="show-detail">
    <header class="detail-header">
      <button class="back-btn" @click="goBack" aria-label="Go back">← Back</button>
      <h2 v-if="show">{{ show.name }}</h2>
    </header>

    <section v-if="isLoading" class="center">Loading…</section>
    <section v-else-if="error" class="center error">{{ error }}</section>

    <article v-else-if="show" class="detail-grid">
      <figure class="poster-wrap">
        <img :src="imageSrc" :alt="show.name + ' poster'" class="poster" />
        <figcaption class="meta-short">
          <div class="rating"><img src="@/assets/star-icon.png" alt="Rating" class="rating-icon" /> {{ show.rating?.average ?? "N/A" }}</div>
          <div class="genres" v-if="show.genres?.length">Genres: {{ show.genres.join(", ") }}</div>
          <div class="info">
            <span v-if="show.premiered">Premiered: {{ show.premiered }}</span>
            <span v-if="show.runtime"> • {{ show.runtime }}m</span>
          </div>
        </figcaption>
      </figure>

      <div class="detail-body">
        <div class="pill-row">
          <span class="pill" v-if="show.status">Status: {{ show.status }}</span>
          <span class="pill" v-if="show.language">Lang: {{ show.language }}</span>
          <a v-if="show.officialSite" :href="show.officialSite" target="_blank" rel="noopener" class="pill">Official site</a>
        </div>

        <section class="summary" v-if="show.summary" v-html="show.summary"></section>

        <dl class="additional">
          <div>
            <dt>Network</dt>
            <dd>{{ show.network?.name ?? show.webChannel?.name ?? "—" }}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{{ show.type ?? "—" }}</dd>
          </div>
          <div>
            <dt>Official site</dt>
            <dd>
              <a v-if="show.officialSite" :href="show.officialSite" target="_blank" rel="noopener">{{ show.officialSite }}</a>
              <span v-else>—</span>
            </dd>
          </div>
        </dl>
      </div>
    </article>

    <section v-else class="center">Show not found</section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { Show } from "@/types/common";
import { fetchShowById } from "@/services/shows.service";

const props = defineProps<{ id: string | number }>();
const router = useRouter();
const show = ref<Show | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const imageSrc = computed(() => {
  return show.value?.image?.original ?? show.value?.image?.medium ?? "@assets/placeholder.webp";
});

function goBack() {
  if (window.history.length > 1) router.back();
  else router.push({ path: "/" });
}

async function fetchForId(idIn: string | number) {
  const idNum = Number(idIn);
  if (!Number.isFinite(idNum) || idNum <= 0) {
    error.value = "Invalid show id";
    show.value = null;
    return;
  }

  isLoading.value = true;
  error.value = null;
  show.value = null;

  try {
    const data = await fetchShowById(idNum);
    show.value = data;
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Failed to load show";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => fetchForId(props.id));
watch(() => props.id, (v) => fetchForId(v));
</script>

<style scoped>
.show-detail {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1rem;
  color: #111;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.back-btn {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  cursor: pointer;
}
.back-btn:hover { background: rgba(0,0,0,0.02); }

.detail-grid {
  display: grid;
  grid-template-columns: 14rem 1fr;
  gap: 1rem;
  align-items: start;
}

.poster {
  width: 100%;
  border-radius: 0.5rem;
  display: block;
  object-fit: cover;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.12);
}

.meta-short {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #333;
}

.pill-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}
.pill {
  background: #ffe2a8;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.summary {
  line-height: 1.45;
  color: #222;
  margin-bottom: 1rem;
}

.additional {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.5rem 1rem;
  font-size: 0.95rem;
}
.additional dt { font-weight: 600; margin-bottom: 0.25rem; }
.additional dd { margin: 0; color: #444; }

.center { text-align: center; padding: 2rem 0; color: #666; }
.error { color: #a00; }
.rating-icon { width: 1rem; }

@media (max-width: 920px) {
  .detail-grid { grid-template-columns: 1fr; }
  .poster { height: 20rem; object-fit: cover; }
}
</style>