<template>
  <div class="audio-settings" v-if="isOpen">
    <div class="settings-overlay" @click="closeSettings"></div>
    <div class="settings-panel">
      <div class="settings-header">
        <h3>Audio Settings</h3>
        <button class="close-btn" @click="closeSettings">×</button>
      </div>
      
      <div class="settings-content">
        <!-- Master Audio Toggle -->
        <div class="setting-group">
          <label class="setting-label">
            <input 
              type="checkbox" 
              v-model="config.enabled"
              @change="updateEnabled"
            >
            Enable Audio
          </label>
        </div>

        <!-- Volume Control -->
        <div class="setting-group" v-if="config.enabled">
          <label class="setting-label">Volume</label>
          <div class="volume-control">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              v-model="config.volume"
              @input="updateVolume"
              class="volume-slider"
            >
            <span class="volume-value">{{ Math.round(config.volume * 100) }}%</span>
          </div>
        </div>

        <!-- Background Music -->
        <div class="setting-group" v-if="config.enabled">
          <label class="setting-label">
            <input 
              type="checkbox" 
              v-model="config.backgroundMusic"
              @change="updateBackgroundMusic"
            >
            Background Music
          </label>
          
          <div class="music-options" v-if="config.backgroundMusic">
            <button 
              v-for="music in backgroundMusicOptions" 
              :key="music.type"
              :class="{ active: currentBackgroundMusic === music.type }"
              @click="playBackgroundMusic(music.type)"
              class="music-btn"
            >
              {{ music.label }}
            </button>
            <button 
              @click="stopBackgroundMusic"
              class="stop-btn"
            >
              Stop Music
            </button>
          </div>
        </div>

        <!-- Ambient Sounds -->
        <div class="setting-group" v-if="config.enabled">
          <label class="setting-label">
            <input 
              type="checkbox" 
              v-model="config.ambientSounds"
              @change="updateAmbientSounds"
            >
            Ambient Sounds
          </label>
          
          <div class="ambient-options" v-if="config.ambientSounds">
            <button 
              v-for="sound in ambientSoundOptions" 
              :key="sound.type"
              :class="{ active: currentAmbientSound === sound.type }"
              @click="playAmbientSound(sound.type)"
              class="ambient-btn"
            >
              {{ sound.label }}
            </button>
            <button 
              @click="stopAmbientSound"
              class="stop-btn"
            >
              Stop Ambient
            </button>
          </div>
        </div>

        <!-- Test Sounds -->
        <div class="setting-group" v-if="config.enabled">
          <label class="setting-label">Test Sounds</label>
          <div class="test-sounds">
            <button @click="testTimerEnd" class="test-btn">Timer End</button>
            <button @click="testBreakStart" class="test-btn">Break Start</button>
            <button @click="testWorkStart" class="test-btn">Work Start</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { audioService, type AudioConfig } from '../services/audioService'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const config = reactive<AudioConfig>(audioService.getConfig())
const currentBackgroundMusic = ref<string | null>(null)
const currentAmbientSound = ref<string | null>(null)

const backgroundMusicOptions = [
  { type: 'focus', label: 'Focus Music' },
  { type: 'relax', label: 'Relax Music' }
]

const ambientSoundOptions = [
  { type: 'rain', label: 'Rain' },
  { type: 'nature', label: 'Nature' },
  { type: 'cafe', label: 'Cafe' }
]

const closeSettings = () => {
  emit('close')
}

const updateEnabled = () => {
  audioService.setEnabled(config.enabled)
}

const updateVolume = () => {
  audioService.setVolume(config.volume)
}

const updateBackgroundMusic = () => {
  audioService.setBackgroundMusic(config.backgroundMusic)
  if (!config.backgroundMusic) {
    currentBackgroundMusic.value = null
  }
}

const updateAmbientSounds = () => {
  audioService.setAmbientSounds(config.ambientSounds)
  if (!config.ambientSounds) {
    currentAmbientSound.value = null
  }
}

const playBackgroundMusic = (type: string) => {
  currentBackgroundMusic.value = type
  audioService.startBackgroundMusic(type as 'focus' | 'relax')
}

const stopBackgroundMusic = () => {
  currentBackgroundMusic.value = null
  audioService.stopBackgroundMusic()
}

const playAmbientSound = (type: string) => {
  currentAmbientSound.value = type
  audioService.startAmbientSound(type as 'rain' | 'nature' | 'cafe')
}

const stopAmbientSound = () => {
  currentAmbientSound.value = null
  audioService.stopAmbientSound()
}

const testTimerEnd = () => {
  audioService.playTimerEnd()
}

const testBreakStart = () => {
  audioService.playBreakStart()
}

const testWorkStart = () => {
  audioService.playWorkStart()
}

// Watch for config changes and sync with service
watch(() => audioService.getConfig(), (newConfig) => {
  Object.assign(config, newConfig)
}, { deep: true })
</script>

<style scoped>
.audio-settings {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.settings-panel {
  position: relative;
  background: #2c3e50;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.settings-header h3 {
  margin: 0;
  color: #fff;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.setting-group {
  margin-bottom: 24px;
}

.setting-label {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
}

.setting-label input[type="checkbox"] {
  margin-right: 12px;
  width: 18px;
  height: 18px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 16px;
}

.volume-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
}

.volume-value {
  color: #fff;
  font-size: 14px;
  min-width: 40px;
  text-align: right;
}

.music-options,
.ambient-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.music-btn,
.ambient-btn,
.test-btn,
.stop-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.music-btn:hover,
.ambient-btn:hover,
.test-btn:hover,
.stop-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.music-btn.active,
.ambient-btn.active {
  background: #3498db;
  border-color: #3498db;
}

.stop-btn {
  background: #e74c3c;
  border-color: #e74c3c;
}

.stop-btn:hover {
  background: #c0392b;
}

.test-sounds {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.test-btn {
  flex: 1;
}
</style> 