<script setup lang="ts">
import { ref } from 'vue'
import Timer from './components/Timer.vue'
import Tasks from './components/Tasks.vue'
import AudioSettings from './components/AudioSettings.vue'

const showAudioSettings = ref(false)
</script>

<template>
  <div id="app">
    <header>
      <h1><span class="check">✔</span> Pomofocus</h1>
      <nav>
        <button class="nav-button" @click="showAudioSettings = true">
          <span class="icon">🔊</span>
          Audio
        </button>
        <button class="nav-button">
          <span class="icon">📊</span>
          Report
        </button>
        <button class="nav-button">
          <span class="icon">⚙</span>
          Setting
        </button>
        <button class="nav-button">
          <span class="icon">👤</span>
          Sign In
        </button>
        <button class="nav-button">
          <span class="icon">⋮</span>
        </button>
      </nav>
    </header>
    <main>
      <Timer />
      <Tasks />
    </main>
    
    <!-- Audio Settings Modal -->
    <AudioSettings 
      :is-open="showAudioSettings" 
      @close="showAudioSettings = false" 
    />
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  color: #fff;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

header h1 {
  font-size: 22px;
  font-weight: bold;
}

.check {
  margin-right: 5px;
}

.nav-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.icon {
  margin-right: 5px;
}
</style>
