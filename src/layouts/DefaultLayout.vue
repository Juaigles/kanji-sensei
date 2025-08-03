<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">
          <span class="logo-kanji">漢字</span>
          <span class="logo-text">Sensei</span>
        </h1>
        <nav class="nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/kanji/">Explore</router-link>
        </nav>
      </div>
    </header>

    <main>
      <router-view /> <!-- Aquí se inyectan las vistas -->
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h3 class="footer-logo">
              <span class="footer-kanji">漢字先生</span>
            </h3>
            <p class="footer-tagline">Learn Japanese with elegance</p>
          </div>
          <div class="footer-nav">
            <div class="footer-links">
              <router-link to="/">Home</router-link>
              <router-link to="/kanji/">Explore</router-link>
              <a href="#" @click.prevent>About us</a>
              <a href="#" @click.prevent>Contact</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 Kanji Sensei</p>
          <p class="footer-love">Made with ❤️ for Japanese learners</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 0;
  font-weight: 300;
  text-decoration: none;
}

.logo-kanji {
  font-size: 2rem;
  font-weight: 400;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text {
  font-size: 1.8rem;
  color: #2d3748;
  font-weight: 300;
  letter-spacing: -0.5px;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #667eea;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: #667eea;
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fafbfc;
}

main {
  flex: 1;
  padding: 3rem 2rem;
  background: transparent;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.footer {
  background: #2d3748;
  color: #e2e8f0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 1rem;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(226, 232, 240, 0.1);
}

.footer-brand {
  flex: 1;
}

.footer-logo {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 300;
}

.footer-kanji {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-tagline {
  margin: 0;
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 300;
}

.footer-nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  transition: all 0.3s ease;
  position: relative;
}

.footer-links a:hover {
  color: #667eea;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 0;
  font-size: 0.85rem;
}

.footer-bottom p {
  margin: 0;
  color: #718096;
}

.footer-love {
  font-style: italic;
}

@media (max-width: 768px) {
  .header-content {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    gap: 1.5rem;
  }
  
  .footer-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  
  .footer-nav {
    justify-content: flex-start;
  }
  
  .footer-links {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  main {
    padding: 2rem 1rem;
  }
}
</style>
