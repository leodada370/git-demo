<script setup>
const emit = defineEmits(['delete'])

defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="task-item" :class="{ 'is-done': item.done, 'is-muted': item.muted }">
    <div class="task-check" aria-hidden="true"></div>
    <div class="task-content">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
    <div class="task-actions">
      <span class="task-tag" :class="item.variant">{{ item.tag }}</span>
      <button type="button" class="delete-button" @click="emit('delete', item.id)">删除</button>
    </div>
  </li>
</template>

<style scoped>
.task-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 18px 18px;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.16);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
}

.task-item.is-done {
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}

.task-item.is-muted {
  background: #fbfdff;
}

.task-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.is-done .task-check {
  border-color: #22c55e;
  background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
}

.task-content h3 {
  font-size: 1rem;
  color: #0f172a;
}

.task-content p {
  margin-top: 6px;
  font-size: 0.93rem;
  line-height: 1.6;
  color: #64748b;
}

.task-tag {
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.task-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.delete-button {
  padding: 8px 12px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #b91c1c;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
}

.delete-button:hover {
  background: rgba(254, 226, 226, 0.9);
  border-color: rgba(248, 113, 113, 0.35);
}

.tag-soft {
  background: rgba(251, 146, 60, 0.14);
  color: #c2410c;
}

.tag-warm {
  background: rgba(251, 191, 36, 0.18);
  color: #a16207;
}

.tag-ink {
  background: rgba(99, 102, 241, 0.12);
  color: #4f46e5;
}

.tag-muted {
  background: #e2e8f0;
  color: #475569;
}

@media (max-width: 720px) {
  .task-item {
    grid-template-columns: 1fr;
  }

  .task-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .task-tag {
    width: fit-content;
  }
}
</style>