import { ref } from 'vue'

const helpMode = ref(false)

export function useHelpMode() {
  function toggleHelpMode() {
    helpMode.value = !helpMode.value
  }

  function setHelpMode(value: boolean) {
    helpMode.value = value
  }

  return {
    helpMode,
    toggleHelpMode,
    setHelpMode
  }
}
