<template>
  <div class="timer-container">
    <div class="timer">
      <div class="tabs">
        <button
          v-for="mode in modes"
          :key="mode.name"
          :class="{ active: currentMode === mode.name }"
          @click="changeMode(mode.name as Mode)"
        >
          {{ mode.label }}
        </button>
      </div>
      <div class="time">{{ formattedTime }}</div>
      <button class="start-button" @click="toggleTimer">
        {{ isActive ? 'PAUSE' : 'START' }}
      </button>
    </div>
    <div class="focus-message">
      <p>#{{ pomodoroCount }}</p>
      <p>{{ focusMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { audioService } from '../services/audioService'

type Mode = 'Pomodoro' | 'Short Break' | 'Long Break'

const modes = [
  { name: 'Pomodoro', label: 'Pomodoro', time: 25 * 60 },
  { name: 'Short Break', label: 'Short Break', time: 5 * 60 },
  { name: 'Long Break', label: 'Long Break', time: 15 * 60 },
]

const currentMode = ref<Mode>('Pomodoro')
const timeRemaining = ref(modes[0].time)
const isActive = ref(false)
const timer = ref<number | null>(null)
const pomodoroCount = ref(1)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60)
  const seconds = timeRemaining.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const focusMessage = computed(() => {
  return currentMode.value === 'Pomodoro' ? 'Time to focus!' : 'Time for a break!'
})

const changeMode = (modeName: Mode) => {
  const previousMode = currentMode.value
  currentMode.value = modeName
  const mode = modes.find((m) => m.name === modeName)
  if (mode) {
    timeRemaining.value = mode.time
  }
  if (isActive.value) {
    toggleTimer()
  }
  
  // Play appropriate sound when mode changes
  if (previousMode !== modeName) {
    if (modeName === 'Pomodoro') {
      audioService.playWorkStart()
      // Start focus music if enabled
      const config = audioService.getConfig()
      if (config.backgroundMusic) {
        audioService.startBackgroundMusic('focus')
      }
    } else {
      audioService.playBreakStart()
      // Start relax music if enabled
      const config = audioService.getConfig()
      if (config.backgroundMusic) {
        audioService.startBackgroundMusic('relax')
      }
    }
  }
}

const toggleTimer = () => {
  isActive.value = !isActive.value
  if (isActive.value) {
    // Play work start sound when starting a Pomodoro session
    if (currentMode.value === 'Pomodoro') {
      audioService.playWorkStart()
    }
    
    timer.value = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
      } else {
        clearInterval(timer.value as number)
        timer.value = null
        isActive.value = false
        
        // Play timer end sound
        audioService.playTimerEnd()
        
        if (currentMode.value === 'Pomodoro') {
          pomodoroCount.value++
          changeMode('Short Break')
        } else {
          changeMode('Pomodoro')
        }
        
        // Show notification
        showNotification()
      }
    }, 1000)
  } else {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }
}

const showNotification = () => {
  // Try to use browser notifications if available
  if ('Notification' in window && Notification.permission === 'granted') {
    const title = currentMode.value === 'Pomodoro' ? 'Break Time!' : 'Back to Work!'
    const body = currentMode.value === 'Pomodoro' 
      ? 'Great job! Time for a short break.' 
      : 'Break is over. Time to focus again!'
    
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    })
  } else {
    // Fallback to alert
    const message = currentMode.value === 'Pomodoro' 
      ? 'Break Time! Great job!' 
      : 'Break is over. Time to focus again!'
    alert(message)
  }
}

const requestNotificationPermission = async () => {
  if ('Notification' in window && Notification.permission === 'default') {
    await Notification.requestPermission()
  }
}

onMounted(() => {
  requestNotificationPermission()
  
  // Load saved state from localStorage
  const savedState = localStorage.getItem('pomodoro-state')
  if (savedState) {
    try {
      const state = JSON.parse(savedState)
      currentMode.value = state.currentMode || 'Pomodoro'
      pomodoroCount.value = state.pomodoroCount || 1
      
      const mode = modes.find((m) => m.name === currentMode.value)
      if (mode) {
        timeRemaining.value = mode.time
      }
    } catch (e) {
      console.warn('Failed to load saved state:', e)
    }
  }
})

onUnmounted(() => {
  // Save state to localStorage
  const state = {
    currentMode: currentMode.value,
    pomodoroCount: pomodoroCount.value
  }
  localStorage.setItem('pomodoro-state', JSON.stringify(state))
  
  // Clean up timer
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<style scoped>
.timer-container {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
}

.tabs {
  margin-bottom: 20px;
}

.tabs button {
  background: none;
  border: none;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
}

.tabs button.active {
  background-color: #fff;
  color: #ba4949;
}

.time {
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 20px;
}

.start-button {
  background-color: #fff;
  color: #ba4949;
  border: none;
  padding: 15px 40px;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s;
}

.start-button:active {
    transform: scale(0.98);
}

.focus-message {
  margin-top: 20px;
}
</style> 