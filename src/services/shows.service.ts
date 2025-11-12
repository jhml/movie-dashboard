const BASE_URL = 'https://api.tvmaze.com'
import type { Show } from "@/types/common"


export async function fetchAllShows(): Promise<Show[]> {
	const res = await fetch(`${BASE_URL}/shows`)
	if (!res.ok) throw new Error('Failed to fetch shows')
	return res.json()
}

export async function searchShows(query: string): Promise<Show[]> {
	const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
	if (!res.ok) throw new Error('Failed to search shows')
	const data = (await res.json()) as Array<{ score?: number; show: Show }>
	return data.map((item) => item.show)
}

export async function fetchShowById(id: number): Promise<Show> {
	const res = await fetch(`${BASE_URL}/shows/${id}`)
	if (!res.ok) throw new Error('Show not found')
	return res.json()
}
