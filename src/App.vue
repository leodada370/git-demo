<script setup></script>

<template>
  <main class="todo-app">
    <section class="hero-panel">
      <div class="hero-copy">
        <p class="eyebrow">每日规划</p>
        <h1>待办清单</h1>
        <p class="subtitle">
          一个简洁、克制但有层次感的待办界面，用来承载后续的任务管理功能。
        </p>
      </div>

      <div class="hero-stats" aria-label="任务概览">
        <article class="stat-card stat-primary">
          <span class="stat-label">今日</span>
          <strong>08</strong>
          <small>当前关注任务</small>
        </article>
        <article class="stat-card">
          <span class="stat-label">已完成</span>
          <strong>05</strong>
          <small>已完成条目</small>
        </article>
        <article class="stat-card">
          <span class="stat-label">剩余</span>
          <strong>03</strong>
          <small>待完成任务</small>
        </article>
      </div>
    </section>

    <section class="workspace">
      <aside class="side-panel">
        <div class="panel-block">
          <p class="panel-title">概览</p>
          <div class="progress-ring" aria-hidden="true">
            <div class="progress-ring__inner">
              <strong>63%</strong>
              <span>本周进度</span>
            </div>
          </div>
        </div>

        <div class="panel-block">
          <p class="panel-title">筛选</p>
          <div class="filter-list">
            <button type="button" class="filter-pill is-active">全部</button>
            <button type="button" class="filter-pill">工作</button>
            <button type="button" class="filter-pill">家庭</button>
            <button type="button" class="filter-pill">学习</button>
          </div>
        </div>
      </aside>

      <section class="list-panel">
        <div class="composer" aria-label="新任务输入预览">
          <div class="composer-input">
            <span class="composer-dot" aria-hidden="true"></span>
            <span class="composer-placeholder">添加一个新任务...</span>
          </div>
          <button type="button" class="composer-action">创建</button>
        </div>

        <div class="task-group">
          <div class="group-header">
            <h2>今天</h2>
            <span>4 项</span>
          </div>

          <article class="task-item is-done">
            <div class="task-check" aria-hidden="true"></div>
            <div class="task-content">
              <h3>规划本周看板</h3>
              <p>整理优先级，给本周任务建立清晰边界。</p>
            </div>
            <span class="task-tag tag-soft">工作</span>
          </article>

          <article class="task-item">
            <div class="task-check" aria-hidden="true"></div>
            <div class="task-content">
              <h3>查看设计参考</h3>
              <p>收集一版更稳定的视觉方向和色彩策略。</p>
            </div>
            <span class="task-tag tag-warm">设计</span>
          </article>

          <article class="task-item">
            <div class="task-check" aria-hidden="true"></div>
            <div class="task-content">
              <h3>整理实现说明</h3>
              <p>把需要后续接入的功能点提前标注出来。</p>
            </div>
            <span class="task-tag tag-ink">草稿</span>
          </article>
        </div>

        <div class="task-group">
          <div class="group-header">
            <h2>稍后</h2>
            <span>2 项</span>
          </div>

          <article class="task-item is-muted">
            <div class="task-check" aria-hidden="true"></div>
            <div class="task-content">
              <h3>优化移动端间距</h3>
              <p>确保窄屏下卡片仍然保持呼吸感。</p>
            </div>
            <span class="task-tag tag-muted">界面</span>
          </article>

          <article class="task-item is-muted">
            <div class="task-check" aria-hidden="true"></div>
            <div class="task-content">
              <h3>补充最后润色</h3>
              <p>收尾时统一阴影、圆角和层级表现。</p>
            </div>
            <span class="task-tag tag-muted">润色</span>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  font-family: Inter, 'Segoe UI', Helvetica, Arial, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(248, 180, 70, 0.22), transparent 36%),
    radial-gradient(circle at 85% 10%, rgba(96, 165, 250, 0.2), transparent 30%),
    linear-gradient(180deg, #f5f1ea 0%, #ecf1f5 100%);
  color: #1f2937;
}

:global(button) {
  font: inherit;
}

.todo-app {
  min-height: 100vh;
  padding: 32px;
}

.hero-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.9fr);
  gap: 24px;
  padding: 28px;
  border: 1px solid rgba(31, 41, 55, 0.08);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(18px);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.1);
}

.eyebrow,
.panel-title,
.stat-label,
.group-header span,
.subtitle,
.task-content p,
.task-tag,
.composer-placeholder,
.composer-action,
.filter-pill {
  letter-spacing: 0.01em;
}

.eyebrow {
  margin: 0 0 12px;
  color: #f97316;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

.hero-copy h1 {
  font-size: clamp(2.6rem, 5vw, 4.8rem);
  line-height: 0.95;
  color: #0f172a;
}

.subtitle {
  max-width: 38rem;
  margin-top: 16px;
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.stat-card {
  padding: 18px;
  border-radius: 22px;
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.stat-primary {
  background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  color: #f8fafc;
}

.stat-label,
.stat-card small {
  display: block;
}

.stat-label {
  margin-bottom: 10px;
  font-size: 0.76rem;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.72;
}

.stat-card strong {
  display: block;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1;
}

.stat-card small {
  margin-top: 12px;
  color: inherit;
  opacity: 0.72;
}

.workspace {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  margin-top: 24px;
}

.side-panel,
.list-panel {
  border-radius: 28px;
  border: 1px solid rgba(31, 41, 55, 0.08);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
}

.side-panel {
  padding: 22px;
}

.panel-block + .panel-block {
  margin-top: 24px;
}

.panel-title {
  margin-bottom: 14px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.progress-ring {
  display: grid;
  place-items: center;
  width: min(100%, 210px);
  aspect-ratio: 1;
  margin-inline: auto;
  border-radius: 50%;
  background:
    conic-gradient(#f97316 0 63%, rgba(226, 232, 240, 0.95) 63% 100%);
  padding: 12px;
}

.progress-ring__inner {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  text-align: center;
}

.progress-ring__inner strong {
  font-size: 2.1rem;
  color: #111827;
}

.progress-ring__inner span {
  margin-top: 6px;
  font-size: 0.88rem;
  color: #64748b;
}

.filter-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-pill,
.composer-action,
.task-tag {
  border: 0;
  border-radius: 999px;
}

.filter-pill {
  padding: 10px 14px;
  background: #f1f5f9;
  color: #475569;
}

.filter-pill.is-active {
  background: #111827;
  color: #f8fafc;
}

.list-panel {
  padding: 24px;
}

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
  background: #f8fafc;
  color: #111827;
  font-weight: 700;
}

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

.task-item + .task-item {
  margin-top: 12px;
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
  font-size: 0.8rem;
  font-weight: 700;
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

@media (max-width: 1080px) {
  .hero-panel,
  .workspace {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .progress-ring {
    width: min(100%, 260px);
  }
}

@media (max-width: 720px) {
  .todo-app {
    padding: 18px;
  }

  .hero-panel,
  .side-panel,
  .list-panel {
    border-radius: 24px;
  }

  .hero-panel {
    padding: 22px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .composer,
  .task-item {
    grid-template-columns: 1fr;
  }

  .composer {
    align-items: stretch;
  }

  .composer-action,
  .task-tag {
    width: fit-content;
  }
}
</style>
