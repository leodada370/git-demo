<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="task-group">
    <div class="group-header">
      <h2>{{ title }}</h2>
      <span>{{ count }} 项</span>
    </div>

    <ul class="task-list">
      <TaskItem v-for="item in items" :key="item.id" :item="item" />
    </ul>
  </section>
</template>

<style scoped>
.task-group {
  margin-top: 24px;
}

.task-group + .task-group {
  margin-top: 20px;
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.group-header h2 {
  font-size: 1.05rem;
  color: #0f172a;
}

.group-header span {
  font-size: 0.88rem;
  color: #64748b;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list :deep(.task-item + .task-item) {
  margin-top: 12px;
}
</style>
