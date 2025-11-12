<template>
	<header class="app-header">
		<RouterLink to="/" class="logo">
				<img alt="Flimpje" src="@/assets/logo.png"  />
		</RouterLink>
		<div class="search-wrap">
			<SearchBar />
		</div>
		<nav class="nav">
			<RouterLink to="/">Home</RouterLink>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import SearchBar from "@/components/common/SearchBar.vue"
</script>

<style scoped>
.app-header {
	position: fixed;
	top:0;
	left:0;
	right:0;
	z-index: 100;
	width:100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ffe2a8;
	box-shadow: 0 1px 3px rgba(0,0,0,0.08);
	gap: 0.5rem;
	place-items: center;
}

.logo,
.nav {
	z-index: 2;
}

.logo {
	padding:1rem 0rem;
	margin: 0 0 0 1rem;
}
.logo img {
	display: block;
}

.search-wrap {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width: min(320px, 60%);
	max-width: calc(100% - 4rem); 
	z-index: 1;
	display: flex;
	justify-content: center;
}

.nav {
	display: flex;
	margin: 0 1rem 0 0;
}
.nav a.router-link-active {
	font-weight: 600;
	color: var(--color-accent);
}

@media (max-width: 920px) {
	.app-header {
		flex-wrap: wrap;
	}
	.search-wrap {
		position: static;
		transform: none;
		width: 100%;
		margin:0 auto;
		order: 2;
	}
	.logo { order: 1; margin: 0 auto; }
	.nav { order: 3; width: 100%; justify-content: center; margin-bottom: 1rem; }
}
</style>
