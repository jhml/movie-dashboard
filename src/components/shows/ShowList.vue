<template>
    <div class="show-list">
        <h2 class="genre-title" :id="`genre-${genre}`">{{ genre }}</h2>
        <ScrollNavButton side="left" @click="scroll(-1)" />

        <ul class="shows" :aria-labelledby="`genre-${genre}`" ref="listRef" role="list">
            <ShowCard v-for="show in shows" :key="show.id" :show="show" />
        </ul>

        <ScrollNavButton side="right" @click="scroll(1)" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Show } from "@/types/common";
import ScrollNavButton from "@/components/common/ScrollNavButton.vue";
import ShowCard from "./ShowCard.vue";

const { genre, shows } = defineProps<{ genre: string; shows: Show[] }>();

const listRef = ref<HTMLElement | null>(null);

//scroll 80% width of page at a time
function scroll(direction: -1 | 1) {
  const el = listRef.value;
  if (!el) return;
  const amount = Math.round(el.clientWidth * 0.8) * direction;
  el.scrollBy({ left: amount, behavior: "smooth" });
}
</script>

<style scoped>
.show-list {
    height: 22rem;
    position: relative; 
}

.genre-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0;
  width:fit-content;
  background: #ffe2a8;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.9rem;
}

.shows {
  height: 22rem;
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  overflow-x: auto;       
  overflow-y: visible;    
  align-items: flex-start;
  scroll-behavior: smooth;
  list-style: none;
  padding: 0;
  margin: 0;
}

.shows::-webkit-scrollbar {
  height: 0;
}
.shows {
  scrollbar-width: none;  
}

@media (max-width: 920px) {
  .show-list {
    height: 18rem;
  }
}
@media (max-width: 480px){
  .show-list {
    height:18rem;
  }
}
</style>