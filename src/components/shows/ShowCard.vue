<template>
  <li class="show-card">
    <RouterLink :to="`/show/${show.id}/${slug}`" class="show-card-link" :aria-label="`Open ${show.name} details`">
      <div class="show-card-content">
        <img
          v-if="show.image?.medium"
          :src="show.image.medium"
          :alt="show.name"
          class="poster"
          decoding="async"
          loading="lazy"
        />
        <div class="show-card-short-detail">
          {{ show.name }}
          <div v-if="show.rating?.average">
            {{ show.rating.average }}
            <img alt="Rating" class="star-icon" src="@/assets/star-icon.png"  />
          </div>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { toSlug } from "@/utils/slug";
import type { Show } from "@/types/common";

const props = defineProps<{ show: Show }>();
const slug = computed(() => toSlug(props.show.name));
</script>

<style scoped>
.show-card {
  background-color: #464646;
  flex: 0 0 auto;
  width: 12rem;
  margin-top: 1rem;
  height: 16.5rem;
  border-radius: 0.5rem;
  overflow: visible;               
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  will-change: transform;
  transform-origin: center;
  display: block;
}

.show-card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
  border-radius: inherit;
}

.show-card:hover,
.show-card:focus-within {
  transform: scale(1.05);
  z-index: 10;
}

.show-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  background: #242424;
  color: #fff;
  border-radius: 0.5rem;
  overflow: hidden; 
  box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,0.06);
}

.show-card-short-detail {
  padding:0.3rem;
  text-align: center;
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0.25rem;
}
.star-icon {
  width:1rem;
}
@media (max-width: 920px) {
  .show-card {
    width:11rem;
    height:15rem;
  }
}
@media (max-width: 480px){
  .show-card {
    width: 10rem;
    height: 13.5rem;
  }
}
</style>