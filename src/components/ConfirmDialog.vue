<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '确认操作',
  },
  message: {
    type: String,
    default: '确定要继续吗？',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
})

defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div v-if="visible" class="confirm-overlay" @click.self="$emit('cancel')">
        <div class="confirm-dialog" role="dialog" aria-modal="true" :aria-label="title">
          <div class="confirm-icon" aria-hidden="true">!</div>

          <div class="confirm-content">
            <h2>{{ title }}</h2>
            <p>{{ message }}</p>
          </div>

          <div class="confirm-actions">
            <button type="button" class="cancel-button" @click="$emit('cancel')">{{ cancelText }}</button>
            <button type="button" class="confirm-button" @click="$emit('confirm')">{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.52);
  backdrop-filter: blur(8px);
  z-index: 1000;
}

.confirm-dialog {
  width: min(100%, 420px);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  box-shadow: 0 28px 90px rgba(15, 23, 42, 0.3);
}

.confirm-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316, #ef4444);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
}

.confirm-content {
  margin-top: 18px;
}

.confirm-content h2 {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}

.confirm-content p {
  margin: 10px 0 0;
  line-height: 1.7;
  color: #475569;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-button,
.confirm-button {
  min-width: 88px;
  padding: 10px 16px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cancel-button {
  background: #e2e8f0;
  color: #334155;
}

.confirm-button {
  background: linear-gradient(135deg, #dc2626, #f97316);
  color: #ffffff;
}

.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.18s ease;
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .confirm-actions {
    flex-direction: column;
  }

  .cancel-button,
  .confirm-button {
    width: 100%;
  }
}
</style>