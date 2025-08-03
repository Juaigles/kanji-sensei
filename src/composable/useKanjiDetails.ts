// src/composables/useKanjiList.ts
import { ref, onMounted } from 'vue'
import type { Kanji } from '@/types/KanjiInfo'

export function useKanjiDetails() {
  const kanji = ref<Kanji | null>(null)
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const fetchKanjiDetails = async (id: string) => {
    isLoading.value = true
    try {
      const response = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${id}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'e66d5436aemsh3a62b68cf742e35p12886fjsnf3de02134f9a',
          'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
        },
      })
      const result = await response.json()
      kanji.value = result
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    kanji,
    isLoading,
    error,
    fetchKanjiDetails,
  }

}
