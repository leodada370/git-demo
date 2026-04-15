<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const title = ref('')
const description = ref('')
const type = ref('工作')
const titleError = ref('')

const validateTitle = (value) => {
  if (!value.trim()) {
    return '任务标题不能为空'
  }

  if (/\s/.test(value)) {
    return '任务标题不能包含空格'
  }

  return ''
}

const submitTask = () => {
  const nextTitle = title.value
  const nextDescription = description.value.trim()
  const error = validateTitle(nextTitle)

  if (error) {
    titleError.value = error
    return
  }

  titleError.value = ''

  emit('add', {
    title: nextTitle.trim(),
    description: nextDescription,
    type: type.value,
  })

  title.value = ''
  description.value = ''
  type.value = '工作'
}
</script>

<template>
  <form class="composer" aria-label="新任务输入表单" @submit.prevent="submitTask">
    <label class="composer-input">
      <span class="composer-dot" aria-hidden="true"></span>
      <input
        v-model="title"
        type="text"
        class="composer-field"
        :class="{ 'composer-field--invalid': titleError }"
        placeholder="添加一个新任务..."
        @input="titleError = ''"
      />
    </label>
    <p v-if="titleError" class="composer-error">{{ titleError }}</p>

    <label class="composer-input composer-input--secondary">
      <span class="composer-dot composer-dot--subtle" aria-hidden="true"></span>
      <input v-model="description" type="text" class="composer-field" placeholder="可选：添加任务描述" />
    </label>

    <label class="composer-select-wrap">
      <span class="composer-select-label">任务类型</span>
      <select v-model="type" class="composer-select">
        <option value="工作">工作</option>
        <option value="家庭">家庭</option>
        <option value="学习">学习</option>
      </select>
    </label>

    <button type="submit" class="composer-action">创建</button>
  </form>
</template>

<style scoped>
.composer {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.94));
}

.composer-input {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-height: 56px;
  padding: 0 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(248, 250, 252, 0.72);
}

.composer-input--secondary {
  background: rgba(255, 255, 255, 0.06);
}

.composer-select-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 130px;
  color: rgba(248, 250, 252, 0.82);
}

.composer-select-label {
  font-size: 0.8rem;
  font-weight: 700;
}

.composer-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316, #fbbf24);
  box-shadow: 0 0 0 6px rgba(249, 115, 22, 0.14);
}

.composer-dot--subtle {
  background: linear-gradient(135deg, #60a5fa, #818cf8);
  box-shadow: 0 0 0 6px rgba(96, 165, 250, 0.14);
}

.composer-placeholder {
  font-size: 0.98rem;
}

.composer-field {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: #f8fafc;
  font: inherit;
}

.composer-field::placeholder {
  color: rgba(248, 250, 252, 0.5);
}

.composer-field--invalid {
  color: #fecaca;
}

.composer-error {
  margin: 0;
  color: #fecaca;
  font-size: 0.85rem;
}

.composer-select {
  width: 100%;
  min-height: 56px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  color: #f8fafc;
  font: inherit;
  outline: none;
}

.composer-select option {
  color: #0f172a;
}

.composer-action {
  padding: 14px 20px;
  border: 0;
  border-radius: 999px;
  background: #f8fafc;
  color: #111827;
  font: inherit;
  font-weight: 700;
}

@media (max-width: 720px) {
  .composer {
    align-items: stretch;
    flex-direction: column;
  }

  .composer-input {
    width: 100%;
  }

  .composer-select-wrap {
    width: 100%;
  }

  .composer-action {
    width: 100%;
  }
}
</style>
