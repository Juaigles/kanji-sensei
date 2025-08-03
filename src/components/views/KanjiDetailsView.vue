<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useKanjiDetails } from '../../composable/useKanjiDetails';
import { Kanji } from '../../types/KanjiInfo';

const router = useRouter();
const { kanji, isLoading, error, fetchKanjiDetails } = useKanjiDetails();

const id = ref(router.currentRoute.value.params.id as string);

const playAudio = (event: Event, audioSrc: string) => {
    // Buscar el elemento audio más cercano al botón
    const button = event.target as HTMLElement;
    const audioElement = button.closest('.example-card')?.querySelector('audio') as HTMLAudioElement;
    
    if (audioElement) {
        audioElement.src = audioSrc;
        audioElement.play().catch(console.error);
    }
};

onMounted(() => {
    fetchKanjiDetails(id.value);
    console.log('Fetching kanji details for ID:', kanji);
});
</script>

<template>
    <div>
        <router-link class="back-link" to="/kanji">← Back to list</router-link>

        <div class="">
            <div class="loading-container" v-if="isLoading">
                <div class="spinner"></div>
                <p class="loading-text">Loading kanji details...</p>
            </div>
            <p class="error-text" v-if="error">Error loading kanji details.</p>
            <div class="kanji-details">
                <h1 class="text-center">Kanji Details: {{ kanji ? kanji.kanji.character : 'Unknown' }}</h1>
                <div class="kanji-header">
                    <div class="kanji-info">
                        <label for="" class="kanji-label">
                            Kanji:
                            <span class="kanji-character">{{ kanji?.kanji.character }}</span>
                        </label>
                        <label for="" class="kanji-label">
                            Romaji: <span class="kanji-kname">{{ kanji?.kname }}</span>
                        </label>
                        <label for="" class="kanji-label">
                            Strokes: <span class="kanji-kstroke">{{ kanji?.kstroke }}</span>
                        </label>
                        <label for="" class="kanji-label">
                            Grade: <span class="kanji-grade">{{ kanji?.grade }}</span>
                        </label>
                             <label for="" class="kanji-label">
                            Meaning: <span class="kanji-grade">{{ kanji?.kanji.meaning.english }}</span>
                        </label>     <label for="" class="kanji-label">
                            Kunyomi: <span class="kanji-grade">{{ kanji?.kanji.kunyomi.hiragana }}</span>
                        </label>     <label for="" class="kanji-label">
                            Onyomi: <span class="kanji-grade">{{ kanji?.kanji.onyomi.katakana }}</span>
                        </label>
                    </div>
                    <div class="kanji-radical">
                        <div class="radical-info">
                            <label>Radical: {{ kanji?.radical.character }}</label>
                            <label>Radical strokes: <span>{{ kanji?.radical.strokes }}</span></label>
                            <label>Order: <span>{{ kanji?.rad_order }}</span></label>
                            <label>Meaning: <span>{{ kanji?.radical.meaning.english }}</span></label>
                            <label>Name (Hiragana): <span>{{ kanji?.radical.name.hiragana }}</span></label>
                            <label>Name (Romaji): <span>{{ kanji?.radical.name.romaji }}</span></label>
                        </div>
                        <div class="radical-animation">
                            <img v-for="(animation, index) in kanji?.radical.animation" :key="index" :src="animation" />
                        </div>
                    </div>

                </div>
                <div class="kanji-readings">
                    <h3 class="text-center">Readings</h3>
                    <div class="readings">
                        <div class="readings-kunyomi">
                            <h4>Kunyomi:</h4>
                           <div class="kunyomi-info">
                            <span >Romaji: {{ kanji?.kanji.kunyomi.romaji }}</span>
                            <span >Hiragana: {{ kanji?.kanji.kunyomi.hiragana }}</span>
                           </div>
                        </div>
                        <div class="readings-onyomi">
                            <h4>Onyomi:</h4>
                            <div class="onyomi-info">
                                <span>Romaji: {{ kanji?.kanji.onyomi.romaji }}</span>
                                <span>Katakana: {{ kanji?.kanji.onyomi.katakana }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 class="text-center">Stroke Count: {{ kanji?.kanji.strokes.count }}</h3>
                <div class="kanji-strokes">
                    <div class="stroke-images">
                        <img class="stroke-image" v-for="(stroke, index) in kanji?.kanji.strokes.images" :src="stroke" :key="index" />
                    </div>
                </div>
                <h3 class="text-center">Video</h3>
                <div class="kanji-video">
                    <video controls width="320" height="240" v-if="kanji?.kanji.video">
                        <source :src="kanji.kanji.video.webm" type="video/webm">
                    </video>
                </div>
                <section class="examples-section">
                    <div class="section-header">
                        <h3 class="section-title">Usage examples</h3>
                        <p class="section-subtitle">Discover how this kanji is used in context</p>
                    </div>
                    <div class="examples-grid">
                        <div v-for="(example, index) in kanji?.examples" :key="index" class="example-card">
                            <div class="card-header">
                                <div class="example-number">{{ String(index + 1).padStart(2, '0') }}</div>
                                <div class="card-actions">
                                    <button class="audio-button" @click="playAudio($event, example.audio.mp3)" title="Play audio">
                                        <svg class="audio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="card-content">
                                <div class="japanese-section">
                                    <div class="japanese-text-container">
                                        <span class="japanese-text">{{ example.japanese }}</span>
                                        <div class="reading-indicator">
                                            <span class="indicator-dot"></span>
                                            <span class="indicator-text">Japanese reading</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="translation-section">
                                    <div class="translation-label">English meaning</div>
                                    <p class="translation-text">{{ example.meaning.english }}</p>
                                </div>
                            </div>
                            
                            <audio :ref="`audio-${index}`" preload="none">
                                <source :src="example.audio.mp3" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    </div>
</template>

<style scoped>
.kunyomi-info, .onyomi-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* Examples Section */
.examples-section {
    margin-top: 5rem;
    padding: 2rem 0;
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
}

.section-title {
    font-size: 2.25rem;
    font-weight: 500;
    color: #1a202c;
    margin-bottom: 0.75rem;
    letter-spacing: -0.025em;
}

.section-subtitle {
    font-size: 1.1rem;
    color: #718096;
    font-weight: 400;
    margin: 0;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
}

.examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2.5rem;
    margin-top: 3rem;
}

.example-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.example-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #cbd5e0;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem 1rem;
    background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
    border-bottom: 1px solid #e2e8f0;
}

.example-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 12px;
    letter-spacing: 0.025em;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.card-actions {
    display: flex;
    gap: 0.5rem;
}

.audio-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #4a5568;
    position: relative;
    overflow: hidden;
}

.audio-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: left 0.3s ease;
    z-index: 0;
}

.audio-button:hover::before {
    left: 0;
}

.audio-button:hover {
    color: white;
    border-color: transparent;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.audio-icon {
    width: 18px;
    height: 18px;
    stroke-width: 2.5;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
}

.audio-button:hover .audio-icon {
    animation: pulse 1.5s infinite;
}

.card-content {
    padding: 2rem;
}

.japanese-section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #f7fafc;
}

.japanese-text-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.japanese-text {
    font-size: 2rem;
    font-weight: 500;
    color: #1a202c;
    font-family: 'Hiragino Sans', 'Yu Gothic', 'Noto Sans CJK JP', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.3;
    letter-spacing: 0.025em;
}

.reading-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    flex-shrink: 0;
}

.indicator-text {
    font-size: 0.875rem;
    color: #718096;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.translation-section {
    position: relative;
}

.translation-label {
    font-size: 0.75rem;
    color: #a0aec0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.translation-label::before {
    content: '';
    width: 20px;
    height: 1px;
    background: #e2e8f0;
}

.translation-text {
    font-size: 1.125rem;
    color: #2d3748;
    line-height: 1.7;
    margin: 0;
    font-weight: 400;
    letter-spacing: 0.01em;
}

/* Hide default audio element */
audio {
    display: none;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

/* Hover state for entire card */
.example-card:hover .example-number {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.example-card:hover .japanese-text {
    color: #667eea;
}

.example-card:hover .indicator-dot {
    animation: pulse 1.5s infinite;
}

@media (max-width: 768px) {
    .examples-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .example-card {
        border-radius: 12px;
    }
    
    .card-header {
        padding: 1.25rem 1.5rem 0.75rem;
    }
    
    .card-content {
        padding: 1.5rem;
    }
    
    .japanese-text {
        font-size: 1.75rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .translation-text {
        font-size: 1rem;
    }
    
    .examples-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .examples-section {
        margin-top: 3rem;
        padding: 1rem 0;
    }
    
    .section-header {
        margin-bottom: 2.5rem;
    }
    
    .card-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        padding: 1rem 1.25rem;
    }
    
    .card-actions {
        align-self: flex-end;
    }
    
    .japanese-text {
        font-size: 1.5rem;
    }
}
.kanji-video {
    margin: 2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 254, 0.8) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
}
.stroke-image{
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 8px;
    background: white;
}
.stroke-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;

}
.text-center {
    text-align: center;
    font-size: 2.5rem;
    color: #2d3748;
    font-weight: 300;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
}
.kanji-readings {
    margin-bottom: 16px;
}
.readings-kunyomi, .readings-onyomi {
    flex: 1;
    padding: 1.5rem;
    border: none;
    border-radius: 15px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 254, 0.8) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
    font-size: 1.1rem;
}
.kanji-strokes {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    border-radius: 20px;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 254, 0.8) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
    margin-bottom: 2rem;
}
.readings {
    display: flex;
    margin-bottom: 16px;
    gap: 16px;

}
.kanji-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem;
    border: none;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 249, 254, 0.7) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
    margin-bottom: 2rem;
}

label {
    font-weight: bold;
}

.radical-animation {
    display: flex;
    align-items: center;
    gap: 8px;
}

.radical-animation img {
    width: 100px;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 8px;
}

.kanji-radical {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    width: fit-content;
    padding: 1.5rem;
    border-radius: 15px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 254, 0.8) 100%);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
}
.radical-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
}

.kanji-details {
    border: 1px solid #ccc;
    padding: 16px;
    margin-top: 16px;
}
.kanji-details-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
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
.error-text {
    text-align: center;
    font-size: 1.2em;
    color: red;
    margin-top: 16px;
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

.kanji-details h1 {
    font-size: 2em;
    margin-bottom: 16px;
}

.kanji-details h3 {
    font-size: 1.5em;
    margin-bottom: 12px;
}

.kanji-info {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.1rem;
    padding: 1.5rem;
    border: none;
    border-radius: 15px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 249, 254, 0.8) 100%);
    backdrop-filter: blur(10px);
    width: 100%;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
}
.kanji-caracter {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}
.kanji-label {
    font-weight: 600;
    margin-bottom: 8px;
    border: none;
    padding: 12px 16px;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
}

.kanji-label:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
.kanji-character {
    font-size: 2em;
    font-weight: bold;
    color: #333;
    text-align: center;

}
</style>
