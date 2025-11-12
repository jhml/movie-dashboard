import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", name: "Movie Dashboard", component: () => import("@/pages/HomePage.vue") },
		{ path: "/search", name: "search", component: () => import("@/pages/SearchResults.vue") },
		{
			path: "/show/:id/:slug",
			name: "show-detail",
			component: () => import("@/pages/ShowDetail.vue"),
			props: true
		}
	],
})

export default router
