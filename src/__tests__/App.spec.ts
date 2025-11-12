// HomePage.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import HomePage from "@/pages/HomePage.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { createPinia } from "pinia";

describe("HomePage", () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div />" } },
      ],
    });

    router.push("/");
    await router.isReady();
  });

  it("mounts and renders homepage title", async () => {
    const pinia = createPinia();

    const wrapper = mount(HomePage, {
      global: {
        plugins: [pinia, router],
        stubs: { RouterLink: true, RouterView: true },
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("Welcome to Flimpje");
  });
});
