import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import ShowCard from "@/components/shows/ShowCard.vue"
import type { Show } from "@/types/common"

const show28 = {
  id: 28,
  name: "Example Show 28",
  image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/28/28.jpg", original: "" },
  rating: { average: 8.2 },
} as Show

describe("ShowCard", () => {
  it("renders image, name and links to detail route", () => {
    const wrapper = mount(ShowCard, {
      props: { show: show28 },
      global: {
        stubs: {
          RouterLink: {
            props: ["to"],
            template: `<a :href="to"><slot /></a>`,
          },
        },
      },
    })

    const a = wrapper.find("a")
    expect(a.exists()).toBe(true)
    expect(a.attributes("href")).toContain(`/show/${show28.id}/`)

    const img = wrapper.find("img.poster")
    expect(img.exists()).toBe(true)
    expect(img.attributes("src")).toBe(show28.image?.medium)

    expect(wrapper.text()).toContain(show28.name)
  })
})