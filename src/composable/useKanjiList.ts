// src/composables/useKanjiList.ts
import { ref, onMounted, computed } from 'vue'
import type { Kanji } from '@/types/KanjiInfo'

export interface FilterOptions {
  searchTerm?: string;
  grade?: string;
  strokeRange?: string;
  sortBy?: string;
}

export function useKanjiList() {
  const kanjiList = ref<Kanji[]>([])
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)
  
  // Filter states
  const searchTerm = ref('')
  const selectedGrade = ref('')
  const selectedStrokes = ref('')
  const sortBy = ref('character')
  
  // Pagination states
  const currentPage = ref(1)
  const itemsPerPage = ref(12)
  const itemsPerPageOptions = [6, 12, 24, 48]

  const fetchKanjiList = async () => {
    isLoading.value = true
    try {
      const response = await fetch('https://kanjialive-api.p.rapidapi.com/api/public/kanji/all', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'e66d5436aemsh3a62b68cf742e35p12886fjsnf3de02134f9a',
          'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
        },
      })
      const result = await response.json()
      kanjiList.value = result
        .filter((k: Kanji) => k.grade && k.grade <= 6) // Expandido a grado 6 para más variedad
        .sort((a: Kanji, b: Kanji) => a.grade - b.grade)

    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  // Computed filtered list (before pagination)
  const filteredKanjiList = computed(() => {
    if (!kanjiList.value) return [];
    
    return kanjiList.value
      .filter(kanji => {
        // Search term filter
        const searchMatch = !searchTerm.value || 
          kanji.kanji.character.includes(searchTerm.value) ||
          kanji.meaning.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          kanji.kanji.meaning.english.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          kanji.kanji.kunyomi.romaji.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          kanji.kanji.onyomi.romaji.toLowerCase().includes(searchTerm.value.toLowerCase());
        
        // Grade filter
        const gradeMatch = !selectedGrade.value || kanji.grade.toString() === selectedGrade.value;
        
        // Strokes filter
        let strokeMatch = true;
        if (selectedStrokes.value) {
          const strokes = kanji.kstroke;
          switch (selectedStrokes.value) {
            case '1-5':
              strokeMatch = strokes >= 1 && strokes <= 5;
              break;
            case '6-10':
              strokeMatch = strokes >= 6 && strokes <= 10;
              break;
            case '11-15':
              strokeMatch = strokes >= 11 && strokes <= 15;
              break;
            case '16+':
              strokeMatch = strokes >= 16;
              break;
          }
        }
        
        return searchMatch && gradeMatch && strokeMatch;
      })
      .sort((a, b) => {
        switch (sortBy.value) {
          case 'grade':
            return a.grade - b.grade;
          case 'strokes':
            return a.kstroke - b.kstroke;
          case 'meaning':
            return a.meaning.localeCompare(b.meaning);
          default:
            return a.kanji.character.localeCompare(b.kanji.character);
        }
      });
  });

  // Pagination computed properties
  const totalResults = computed(() => filteredKanjiList.value.length);
  const totalPages = computed(() => Math.ceil(totalResults.value / itemsPerPage.value));
  
  // Paginated list
  const paginatedKanjiList = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredKanjiList.value.slice(startIndex, endIndex);
  });

  // Pagination info
  const paginationInfo = computed(() => {
    const start = totalResults.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1;
    const end = Math.min(currentPage.value * itemsPerPage.value, totalResults.value);
    return {
      start,
      end,
      total: totalResults.value,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      hasNextPage: currentPage.value < totalPages.value,
      hasPrevPage: currentPage.value > 1,
    };
  });

  // Pagination methods
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      goToPage(currentPage.value + 1);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      goToPage(currentPage.value - 1);
    }
  };

  const setItemsPerPage = (items: number) => {
    itemsPerPage.value = items;
    // Reset to first page when changing items per page
    currentPage.value = 1;
  };

  // Reset pagination when filters change
  const resetPagination = () => {
    currentPage.value = 1;
  };

  // Search methods
  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
    resetPagination();
  };

  const setGradeFilter = (grade: string) => {
    selectedGrade.value = grade;
    resetPagination();
  };

  const setStrokeFilter = (strokes: string) => {
    selectedStrokes.value = strokes;
    resetPagination();
  };

  const setSortBy = (sort: string) => {
    sortBy.value = sort;
    resetPagination();
  };

  // Apply multiple filters at once
  const applyFilters = (filters: FilterOptions) => {
    if (filters.searchTerm !== undefined) searchTerm.value = filters.searchTerm;
    if (filters.grade !== undefined) selectedGrade.value = filters.grade;
    if (filters.strokeRange !== undefined) selectedStrokes.value = filters.strokeRange;
    if (filters.sortBy !== undefined) sortBy.value = filters.sortBy;
    resetPagination();
  };

  // Clear all filters
  const clearFilters = () => {
    searchTerm.value = '';
    selectedGrade.value = '';
    selectedStrokes.value = '';
    sortBy.value = 'character';
    resetPagination();
  };

  // Get current filter state
  const getFilterState = () => ({
    searchTerm: searchTerm.value,
    selectedGrade: selectedGrade.value,
    selectedStrokes: selectedStrokes.value,
    sortBy: sortBy.value,
  });

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return !!(searchTerm.value || selectedGrade.value || selectedStrokes.value || sortBy.value !== 'character');
  });

  onMounted(fetchKanjiList)

  return {
    // Data
    kanjiList: paginatedKanjiList, // Return paginated list
    isLoading,
    error,
    
    // Pagination
    currentPage,
    itemsPerPage,
    itemsPerPageOptions,
    totalResults,
    totalPages,
    paginationInfo,
    
    // Filter states (for binding to UI)
    searchTerm,
    selectedGrade,
    selectedStrokes,
    sortBy,
    hasActiveFilters,
    
    // Methods
    setSearchTerm,
    setGradeFilter,
    setStrokeFilter,
    setSortBy,
    applyFilters,
    clearFilters,
    getFilterState,
    
    // Pagination methods
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage,
    resetPagination,
    
    // Raw data access if needed
    rawKanjiList: kanjiList,
    filteredKanjiList,
  }
}
