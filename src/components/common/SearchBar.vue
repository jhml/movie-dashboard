<template>
  <form class="search-bar" @submit.prevent="onSubmit" role="search" aria-label="Search shows">
    <input
      v-model="q"
      type="search"
      placeholder="Search shows, titles..."
      aria-label="Enter text to search shows, titles and more"
      class="search-input"
    />
    <button type="submit" class="search-btn" aria-label="Search">
      <img alt="Search button" class="search-btn-img" src="@/assets/search-icon.png" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const q = ref("");

function onSubmit() {
  const term = (q.value || "").trim();
  if (!term) return;
  router.push({ name: 'search', query: { q: term } });
  q.value = "";
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 36rem;
  width: 100%;
  background: #FFF;
  padding: 0.25rem;
  border-radius: 50px;
  box-shadow: 0 4px 14px rgba(16,24,40,0.06);
  border: 1px solid rgba(16,24,40,0.06);
}

.search-input {
  flex: 1 1 auto;
  border: none;
  background: transparent;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  color: #0f1724;
  outline: none;
  border-radius: 999px;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-btn {
  display: inline-grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  background: #ff4500;
  border: none;
  color: #fff;
  border-radius: 999px;
  cursor: pointer;
  padding: 0;
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
  box-shadow: 0 6px 18px rgba(255,69,0,0.12);
}

.search-btn-img {
  width:1.5rem;
}

.search-btn:hover,
.search-btn:focus {
  transform: translateY(-1px);
  background: #ff5f2a;
  outline: none;
  box-shadow: 0 10px 22px rgba(255,69,0,0.14);
}

.search-input:focus-visible {
  box-shadow: 0 0 0 4px rgba(255,69,0,0.08);
  border-radius: 999px;
}

@media (max-width: 480px) {
  .search-bar {
    max-width: 100%;
    padding: 0.15rem;
  }
  .search-btn {
    width: 2.1rem;
    height: 2.1rem;
  }
  .search-input {
    font-size: 0.9rem;
  }
}
</style>