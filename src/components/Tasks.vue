<template>
  <div class="tasks-container">
    <div class="tasks-header">
      <h2>Tasks</h2>
      <button>...</button>
    </div>
    <div class="add-task">
      <button>Add Task</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tasks logic will go here
</script>

<style scoped>
.tasks-container {
  margin-top: 20px;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.tasks-header h2 {
  font-size: 20px;
}

.tasks-header button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.add-task {
  margin-top: 20px;
}

.add-task button {
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.4);
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
</style> 