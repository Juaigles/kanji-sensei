<script setup lang="ts">
import { ref } from 'vue';

</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-kanji">漢字</span>
          <span class="title-text">を学ぼう</span>
        </h1>
        <p class="hero-subtitle">Discover the beauty of Japanese characters</p>
        <p class="hero-description">
          A minimalist and effective learning experience to master kanji
        </p>
        <router-link class="cta-button" to="/kanji">
          Start now
        </router-link>
      </div>
    </section>
    
    <section class="features">
      <div class="feature">
        <div class="feature-number">01</div>
        <h3 class="feature-title">Explore</h3>
        <p class="feature-description">Browse through a carefully curated collection of kanji characters</p>
      </div>
      <div class="feature">
        <div class="feature-number">02</div>
        <h3 class="feature-title">Learn</h3>
        <p class="feature-description">Understand the meaning, reading and context of each character</p>
      </div>
      <div class="feature">
        <div class="feature-number">03</div>
        <h3 class="feature-title">Master</h3>
        <p class="feature-description">Practice stroke order and perfect your writing</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero {
  text-align: center;
  padding: 6rem 0 8rem;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  line-height: 1.1;
}

.title-kanji {
  display: block;
  font-size: 5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.title-text {
  display: block;
  font-size: 2rem;
  color: #4a5568;
  font-weight: 300;
  letter-spacing: 0.1em;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 1rem;
  color: #718096;
  line-height: 1.7;
  margin-bottom: 3rem;
  font-weight: 300;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #2d3748;
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  border-radius: 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: left 0.3s ease;
  z-index: -1;
}

.cta-button:hover::before {
  left: 0;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 55, 72, 0.2);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 4rem;
  padding: 4rem 0;
  margin-top: 4rem;
  border-top: 1px solid #e2e8f0;
}

.feature {
  text-align: left;
  position: relative;
}

.feature-number {
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  position: relative;
}

.feature-number::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 2rem;
  width: 3rem;
  height: 1px;
  background: #e2e8f0;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.feature-description {
  font-size: 1rem;
  color: #718096;
  line-height: 1.7;
  font-weight: 300;
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 6rem;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .title-kanji {
    font-size: 4rem;
  }
  
  .title-text {
    font-size: 1.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
  }
  
  .features {
    gap: 3rem;
    grid-template-columns: 1fr;
  }
  
  .home-view {
    padding: 0 1rem;
  }
}
</style>
