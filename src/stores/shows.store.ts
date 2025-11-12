import { defineStore } from 'pinia'
import type { Show } from "@/types/common";
import { fetchAllShows} from '@/services/shows.service'

interface ShowsState {
	shows: Show[]
	isLoading: boolean
	error: string | null
}

export const useShowsStore = defineStore('shows', {
	state: (): ShowsState => ({
		shows: [],
		isLoading: false,
		error: null,
	}),
	getters: {
		showsByGenre: (state) => {
			const grouped: Record<string, Show[]> = {}
			state.shows.forEach((show) => {
				show.genres.forEach((genre) => {
					if (!grouped[genre]) grouped[genre] = []
					grouped[genre].push(show)
				})
			})
			Object.keys(grouped).forEach((genre) => {
				if (grouped[genre]) {
					grouped[genre].sort((a, b) => {
						const ra = a.rating?.average ?? 0
						const rb = b.rating?.average ?? 0
						return rb - ra
					})
					grouped[genre] = grouped[genre].slice(0, 10)
				}
			})
			return grouped
		},
	},
	actions: {
		async loadShows() {
			if (this.shows.length) return
			this.isLoading = true
			this.error = null
			try {
				this.shows = await fetchAllShows()
			} catch (err: unknown) {
				this.error = err instanceof Error ? err.message : 'Possibly a buzz'
			} finally {
				this.isLoading = false
			}
		},
	},
})
