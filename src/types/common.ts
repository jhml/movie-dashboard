export interface Show {
	id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime?: number
  averageRuntime?: number
  premiered?: string
  ended?: string | null
  officialSite?: string | null
  schedule: { time?: string; days?: string[] }
  rating: { average: number | null }
  weight?: number
  network?: {
    id: number
    name: string
    country: { name: string; code: string; timezone: string }
    officialSite?: string
  } | null
  webChannel: null | Record<string, unknown>
  dvdCountry: null | Record<string, unknown> | null
  image?: { medium?: string; original?: string } | null
  summary?: string | null
  updated?: number
  _links?: {
    self?: { href: string }
	}
}