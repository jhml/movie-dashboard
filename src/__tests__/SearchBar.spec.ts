import { describe, it, expect, vi, afterEach } from "vitest"
import { mount } from "@vue/test-utils"

const mockPush = vi.fn()
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: mockPush }),
  RouterLink: { props: ["to"], template: '<a :href="to"><slot/></a>' },
}))

import SearchBar from "@/components/common/SearchBar.vue"

describe("SearchBar", () => {
  afterEach(() => {
    mockPush.mockReset()
  })

  it("navigates to search route on submit with trimmed query", async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find("input.search-input")
    await input.setValue("  test query  ")
    await wrapper.find("form").trigger("submit.prevent")
    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith({ name: "search", query: { q: "test query" } })
  })

  it("does nothing on empty submit", async () => {
    const wrapper = mount(SearchBar)
    await wrapper.find("form").trigger("submit.prevent")
    expect(mockPush).not.toHaveBeenCalled()
  })
})