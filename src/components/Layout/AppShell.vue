<template>
	<div class="app-shell">
		<AppHeader />
		<main class="app-main">
			<div class="container">
				<slot />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import AppHeader from  "@/components/Layout/AppHeader.vue";
</script>

<style scoped>
.app-shell {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.app-main {
	flex: 1;
	max-width: 1240px;
	margin: 100px auto 0 auto;
	
	width: 100%;
}
.container {
	padding: 0 10px;
}
@media (max-width: 920px) {
	.app-main {
		margin-top: 150px;
		max-width: 100%;
		overflow: hidden;
	}
 }
</style>
