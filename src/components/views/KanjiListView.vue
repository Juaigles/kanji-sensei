<script setup lang="ts">
import { ref } from 'vue';
import { useKanjiList } from '../../composable/useKanjiList';
import KanjiCard from '../kanjiCards/KanjiCards.vue';

const { 
  kanjiList, 
  isLoading, 
  error, 
  searchTerm,
  selectedGrade,
  selectedStrokes,
  sortBy,
  hasActiveFilters,
  clearFilters,
  // Pagination
  currentPage,
  itemsPerPage,
  itemsPerPageOptions,
  totalResults,
  totalPages,
  paginationInfo,
  goToPage,
  nextPage,
  prevPage,
  setItemsPerPage
} = useKanjiList();

// UI state
const isFiltersOpen = ref(false);

// Filter options
const gradeOptions = [
  { value: '', label: 'All grades' },
  { value: '1', label: 'Grade 1' },
  { value: '2', label: 'Grade 2' },
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '8', label: 'Secondary' },
];

const strokeOptions = [
  { value: '', label: 'All strokes' },
  { value: '1-5', label: '1-5 strokes' },
  { value: '6-10', label: '6-10 strokes' },
  { value: '11-15', label: '11-15 strokes' },
  { value: '16+', label: '16+ strokes' },
];

const sortOptions = [
  { value: 'character', label: 'By character' },
  { value: 'grade', label: 'By grade' },
  { value: 'strokes', label: 'By strokes' },
  { value: 'meaning', label: 'By meaning' },
];

// Toggle filters panel
const toggleFilters = () => {
  isFiltersOpen.value = !isFiltersOpen.value;
};

// Generate page numbers for pagination
const getVisiblePages = () => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  
  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i);
  }
  
  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }
  
  rangeWithDots.push(...range);
  
  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value);
  } else {
    if (totalPages.value > 1) {
      rangeWithDots.push(totalPages.value);
    }
  }
  
  return rangeWithDots.filter((page, index, arr) => arr.indexOf(page) === index);
};
</script>

<template>
    <div class="kanji-list-view">
        <div class="kanji-list-title">
            <h1>Explore Kanji</h1>
            <p>Discover the beauty and complexity of Japanese characters</p>
        </div>

        <!-- Search and Filter Section -->
        <div class="search-section">
            <!-- Main Search Bar -->
            <div class="search-bar">
                <div class="search-input-container">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <input 
                        v-model="searchTerm"
                        type="text" 
                        placeholder="Search by character, meaning, or reading..."
                        class="search-input"
                    />
                    <button 
                        v-if="searchTerm"
                        @click="searchTerm = ''"
                        class="clear-search"
                        title="Clear search"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <!-- Filter Toggle Button -->
                <button 
                    @click="toggleFilters"
                    class="filter-toggle"
                    :class="{ active: isFiltersOpen }"
                >
                    <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    <span>Filters</span>
                    <div class="filter-badge" v-if="selectedGrade || selectedStrokes">
                        {{ (selectedGrade ? 1 : 0) + (selectedStrokes ? 1 : 0) }}
                    </div>
                </button>
            </div>

            <!-- Advanced Filters Panel -->
            <div class="filters-panel" :class="{ open: isFiltersOpen }">
                <div class="filters-content">
                    <div class="filter-row">
                        <!-- Grade Filter -->
                        <div class="filter-group">
                            <label class="filter-label">Grade Level</label>
                            <select v-model="selectedGrade" class="filter-select">
                                <option v-for="option in gradeOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <!-- Strokes Filter -->
                        <div class="filter-group">
                            <label class="filter-label">Stroke Count</label>
                            <select v-model="selectedStrokes" class="filter-select">
                                <option v-for="option in strokeOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <!-- Sort By -->
                        <div class="filter-group">
                            <label class="filter-label">Sort By</label>
                            <select v-model="sortBy" class="filter-select">
                                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>

                        <!-- Clear Filters -->
                        <div class="filter-actions">
                            <button @click="clearFilters" class="clear-filters-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 6h18"></path>
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                                Clear All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Summary -->
            <div class="results-summary">
                <p class="results-count">
                    <span class="count-number">{{ totalResults }}</span> 
                    <span class="count-text">{{ totalResults === 1 ? 'kanji found' : 'kanjis found' }}</span>
                    <span v-if="totalPages > 1" class="page-info">
                        (Page {{ currentPage }} of {{ totalPages }})
                    </span>
                </p>
                
                <!-- Items per page selector -->
                <div class="per-page-selector">
                    <label class="per-page-label">Show:</label>
                    <select v-model="itemsPerPage" @change="setItemsPerPage(itemsPerPage)" class="per-page-select">
                        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                            {{ option }} per page
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Kanji List Container -->
        <div class="kanji-list-container">
            <div class="loading-container" v-if="isLoading">
                <div class="spinner"></div>
                <p class="loading-text">Loading kanji list...</p>
            </div>
            <p v-if="error" class="error-message">Error loading kanji list.</p>
            
            <!-- No Results Message -->
            <div v-else-if="!isLoading && totalResults === 0" class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No kanjis found</h3>
                <p>Try adjusting your search criteria or clearing the filters.</p>
                <button @click="clearFilters" class="clear-filters-btn secondary">
                    Clear all filters
                </button>
            </div>
            
            <!-- Kanji Grid with improved layout -->
            <div v-else class="kanji-grid-section">
                <!-- Grid header with pagination info -->
                <div class="grid-header">
                    <div class="showing-info">
                        <span class="showing-text">
                            Showing {{ paginationInfo.start }}-{{ paginationInfo.end }} of {{ paginationInfo.total }} kanjis
                        </span>
                    </div>
                </div>
                
                <!-- Improved Kanji Grid -->
                <div class="kanji-list">
                    <KanjiCard 
                        v-for="kanji in kanjiList"
                        :key="kanji.ka_id"
                        :id="kanji.ka_id"
                        :character="kanji.kanji.character"
                        :readings="[kanji.kanji.kunyomi.romaji]"
                        :meanings="kanji.kanji.meaning"
                        :name="kanji.meaning"
                    />
                </div>
                
                <!-- Pagination Component -->
                <div v-if="totalPages > 1" class="pagination-section">
                    <div class="pagination-controls">
                        <!-- Previous button -->
                        <button 
                            @click="prevPage" 
                            :disabled="!paginationInfo.hasPrevPage"
                            class="pagination-btn pagination-prev"
                            :class="{ disabled: !paginationInfo.hasPrevPage }"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                            Previous
                        </button>
                        
                        <!-- Page numbers -->
                        <div class="pagination-numbers">
                            <template v-for="page in getVisiblePages()">
                                <button 
                                    v-if="page !== '...'"
                                    :key="`page-${page}`"
                                    @click="goToPage(Number(page))"
                                    class="pagination-number"
                                    :class="{ active: page === currentPage }"
                                >
                                    {{ page }}
                                </button>
                                <span v-else :key="`dots-${page}`" class="pagination-dots">...</span>
                            </template>
                        </div>
                        
                        <!-- Next button -->
                        <button 
                            @click="nextPage" 
                            :disabled="!paginationInfo.hasNextPage"
                            class="pagination-btn pagination-next"
                            :class="{ disabled: !paginationInfo.hasNextPage }"
                        >
                            Next
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Quick jump -->
                    <div class="quick-jump">
                        <span class="jump-label">Go to page:</span>
                        <input 
                            type="number" 
                            :min="1" 
                            :max="totalPages"
                            v-model.number="currentPage"
                            @change="goToPage(currentPage)"
                            class="jump-input"
                        />
                        <span class="jump-total">of {{ totalPages }}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <router-link class="back-link" to="/">Back to Home</router-link>
    </div>
</template>

<style scoped>
.kanji-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.kanji-list-title {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.kanji-list-title h1 {
  font-size: 3rem;
  font-weight: 300;
  color: #2d3748;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.kanji-list-title p {
  font-size: 1.1rem;
  color: #718096;
  font-weight: 300;
  margin: 0;
}

/* ================================ */
/*        SEARCH & FILTERS          */
/* ================================ */
.search-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.05);
}

.search-bar {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.search-input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: #a0aec0;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: #a0aec0;
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  width: 32px;
  height: 32px;
  border: none;
  background: #f7fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background: #edf2f7;
  color: #4a5568;
}

.clear-search svg {
  width: 16px;
  height: 16px;
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #4a5568;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.filter-toggle:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-toggle.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

.filter-icon {
  width: 18px;
  height: 18px;
}

.filter-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e53e3e;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.filters-panel {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
}

.filters-panel.open {
  max-height: 200px;
  opacity: 1;
  margin-top: 1.5rem;
}

.filters-content {
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.filter-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  letter-spacing: 0.025em;
}

.filter-select {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.filter-actions {
  display: flex;
  align-items: end;
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  border-color: #f56565;
  color: #f56565;
  background: #fed7d7;
}

.clear-filters-btn.secondary {
  border-color: #667eea;
  color: #667eea;
  padding: 0.875rem 2rem;
  font-size: 1rem;
}

.clear-filters-btn.secondary:hover {
  background: #667eea;
  color: white;
}

.clear-filters-btn svg {
  width: 16px;
  height: 16px;
}

.results-summary {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-count {
  margin: 0;
  font-size: 0.95rem;
  color: #4a5568;
  font-weight: 500;
}

.count-number {
  font-weight: 700;
  color: #667eea;
  font-size: 1.1rem;
}

.count-text {
  color: #718096;
}

.page-info {
  color: #a0aec0;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.per-page-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.per-page-label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.per-page-select {
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  background: white;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.per-page-select:focus {
  outline: none;
  border-color: #667eea;
}

/* ================================ */
/*        IMPROVED GRID LAYOUT      */
/* ================================ */
.kanji-grid-section {
  margin-bottom: 2rem;
}

.grid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.showing-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.showing-text {
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
}

.kanji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  min-height: 400px;
}

/* ================================ */
/*        PAGINATION STYLES         */
/* ================================ */
.pagination-section {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.05);
  margin-top: 3rem;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  justify-content: center;
}

.pagination-btn:hover:not(.disabled) {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #a0aec0;
}

.pagination-btn svg {
  width: 16px;
  height: 16px;
}

.pagination-numbers {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.pagination-number {
  width: 40px;
  height: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-number:hover {
  border-color: #667eea;
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
}

.pagination-number.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.pagination-dots {
  padding: 0.5rem;
  color: #a0aec0;
  font-weight: 600;
}

.quick-jump {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.jump-label {
  font-size: 0.875rem;
  color: #4a5568;
  font-weight: 500;
}

.jump-input {
  width: 60px;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  transition: border-color 0.2s ease;
}

.jump-input:focus {
  outline: none;
  border-color: #667eea;
}

.jump-total {
  font-size: 0.875rem;
  color: #718096;
}

/* ================================ */
/*        KANJI LIST STYLES         */
/* ================================ */
.kanji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: #718096;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.5rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.no-results p {
  margin-bottom: 2rem;
  font-size: 1rem;
}

.error-message {
  color: #e53e3e;
  text-align: center;
  padding: 2rem;
  font-size: 1rem;
  font-weight: 500;
}

.back-link {
  display: inline-block;
  margin-bottom: 3rem;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.75rem 0;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.back-link::before {
  content: '← ';
  margin-right: 0.5rem;
}

.back-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: #667eea;
  transition: width 0.3s ease;
}

.back-link:hover {
  color: #667eea;
}

.back-link:hover::after {
  width: 100%;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  min-height: 400px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  text-align: center;
  font-size: 1rem;
  color: #718096;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.3px;
}

/* ================================ */
/*        RESPONSIVE DESIGN         */
/* ================================ */
@media (max-width: 768px) {
  .kanji-list-view {
    padding: 0 1rem;
  }
  
  .search-section {
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .search-bar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-toggle {
    width: 100%;
    justify-content: center;
  }
  
  .filter-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .filters-panel.open {
    max-height: 400px;
  }
  
  .results-summary {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .grid-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .kanji-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .kanji-list-title h1 {
    font-size: 2.5rem;
  }
  
  .loading-container {
    padding: 4rem 1rem;
  }
  
  .no-results {
    padding: 3rem 1rem;
  }
  
  .no-results-icon {
    font-size: 3rem;
  }
  
  .pagination-section {
    padding: 1.5rem;
  }
  
  .pagination-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pagination-numbers {
    order: 2;
  }
  
  .pagination-prev {
    order: 1;
  }
  
  .pagination-next {
    order: 3;
  }
  
  .quick-jump {
    flex-direction: column;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .search-input {
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    font-size: 0.9rem;
  }
  
  .search-icon {
    width: 18px;
    height: 18px;
    left: 0.75rem;
  }
  
  .filter-toggle {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
  
  .kanji-list-title h1 {
    font-size: 2rem;
  }
  
  .kanji-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .pagination-numbers {
    gap: 0.125rem;
  }
  
  .pagination-number {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
  
  .pagination-btn {
    min-width: 80px;
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .per-page-selector {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>
d