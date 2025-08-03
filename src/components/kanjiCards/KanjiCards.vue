import { Kanji } from '../../types/KanjiInfo';
<script setup lang="ts">
defineProps<{
    id: string;
    character: string;
    readings: string[];
    name: string;
}>();

</script>

<template>
<router-link :to="`/kanji/${character}`" class="kanji-item">
    <span class="kanji-character">{{ character }} </span>
    <span class="kanji-name">({{ name }})</span>
</router-link>
</template>

<style scoped>
.kanji-item {
    color: #333;
    font-size: 1.2em;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: background-color 0.3s;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0;
    text-decoration: none;


}
.kanji-character {
    font-size: 2em;
    font-weight: bold;
}
.kanji-name {
    font-size: 1.5em;
    font-weight: normal;
}

.kanji-item:hover {
    background-color: #f0f0f0;
}
</style>
