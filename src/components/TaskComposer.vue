<template>
  <div class="composer" aria-label="新任务输入预览">
    <div class="composer-input">
      <span class="composer-dot" aria-hidden="true"></span>
      <span class="composer-placeholder">添加一个新任务...</span>
    </div>
    <button type="button" class="composer-action">创建</button>
  </div>
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

.composer-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316, #fbbf24);
  box-shadow: 0 0 0 6px rgba(249, 115, 22, 0.14);
}

.composer-placeholder {
  font-size: 0.98rem;
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

  .composer-action {
    width: fit-content;
  }
}
</style>
