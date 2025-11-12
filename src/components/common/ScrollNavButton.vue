<template>
  <button
    :class="btnClass"
    :aria-label="ariaLabel || defaultLabel"
    :disabled="disabled"
    @click="emitClick"
    type="button"
  >
    <span aria-hidden="true">{{ icon }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  side: { type: String as () => "left" | "right", required: true },
  ariaLabel: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits<{ (e: "click"): void }>();

function emitClick() {
  if (!props.disabled) emit("click");
}

const btnClass = computed(() => (props.side === "left" ? "left-scroll-btn" : "right-scroll-btn"));
const icon = computed(() => (props.side === "left" ? "‹" : "›"));
const defaultLabel = computed(() => (props.side === "left" ? "Scroll left" : "Scroll right"));
</script>

<style scoped>
.left-scroll-btn,
.right-scroll-btn {
  position: absolute;
  top: 55%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.9);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 30;
  font-size: 1.25rem;
  transition: background 0.18s ease, transform 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.left-scroll-btn { left: 0.5rem; }
.right-scroll-btn { right: 0.5rem; }

.left-scroll-btn:disabled,
.right-scroll-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.left-scroll-btn:not(:disabled):hover,
.right-scroll-btn:not(:disabled):hover,
.left-scroll-btn:not(:disabled):focus,
.right-scroll-btn:not(:disabled):focus {
  background: #777;
  transform: translateY(-50%) scale(1.05);
  outline: none;
}
</style>