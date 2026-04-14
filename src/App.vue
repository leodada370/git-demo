<script setup>
import { computed, ref } from 'vue'

import ConfirmDialog from './components/ConfirmDialog.vue'
import TaskComposer from './components/TaskComposer.vue'
import TaskGroup from './components/TaskGroup.vue'
import { useConfirmDialog } from './composables/useConfirmDialog'

const todayTasks = ref([
  {
    id: 1,
    title: '规划本周看板',
    description: '整理优先级，给本周任务建立清晰边界。',
    tag: '工作',
    variant: 'tag-soft',
    done: true,
  },
  {
    id: 2,
    title: '查看设计参考',
    description: '收集一版更稳定的视觉方向和色彩策略。',
    tag: '设计',
    variant: 'tag-warm',
    done: false,
  },
  {
    id: 3,
    title: '整理实现说明',
    description: '把需要后续接入的功能点提前标注出来。',
    tag: '草稿',
    variant: 'tag-ink',
    done: false,
  },
])

const laterTasks = ref([
  {
    id: 4,
    title: '优化移动端间距',
    description: '确保窄屏下卡片仍然保持呼吸感。',
    tag: '界面',
    variant: 'tag-muted',
    done: false,
    muted: true,
  },
  {
    id: 5,
    title: '补充最后润色',
    description: '收尾时统一阴影、圆角和层级表现。',
    tag: '润色',
    variant: 'tag-muted',
    done: false,
    muted: true,
  },
])

const taskSummary = computed(() => {
  const totalTasks = todayTasks.value.length + laterTasks.value.length
  const completedTasks = [...todayTasks.value, ...laterTasks.value].filter((task) => task.done)

  return {
    total: totalTasks,
    completed: completedTasks.length,
    remaining: totalTasks - completedTasks.length,
  }
})

const taskFilters = ['全部', '工作', '家庭', '学习']
const selectedFilter = ref('全部')

const filterTasks = (tasks) => {
  if (selectedFilter.value === '全部') {
    return tasks
  }

  return tasks.filter((task) => task.tag === selectedFilter.value)
}

const visibleTodayTasks = computed(() => filterTasks(todayTasks.value))
const visibleLaterTasks = computed(() => filterTasks(laterTasks.value))

let nextTaskId = 6
const taskTypeMap = {
  工作: {
    tag: '工作',
    variant: 'tag-soft',
  },
  家庭: {
    tag: '家庭',
    variant: 'tag-warm',
  },
  学习: {
    tag: '学习',
    variant: 'tag-ink',
  },
}

const { visible, options, confirm, handleConfirm, handleCancel } = useConfirmDialog()

const addTask = ({ title, description, type }) => {
  const selectedType = taskTypeMap[type] ?? taskTypeMap.工作
  const newTask = {
    id: nextTaskId,
    title,
    description: description || '暂无描述',
    tag: selectedType.tag,
    variant: selectedType.variant,
    done: false,
  }

  nextTaskId += 1
  todayTasks.value.unshift(newTask)
}

const deleteTask = (taskId) => {
  todayTasks.value = todayTasks.value.filter((task) => task.id !== taskId)
  laterTasks.value = laterTasks.value.filter((task) => task.id !== taskId)
}

const requestDeleteTask = async (taskId) => {
  const shouldDelete = await confirm({
    title: '确认删除任务',
    message: '删除后将无法恢复，确定要删除这个任务吗？',
    confirmText: '确定删除',
    cancelText: '取消',
  })

  if (shouldDelete) {
    deleteTask(taskId)
  }
}
</script>

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
          <strong>{{ taskSummary.total }}</strong>
          <small>当前关注任务</small>
        </article>
        <article class="stat-card">
          <span class="stat-label">已完成</span>
          <strong>{{ taskSummary.completed }}</strong>
          <small>已完成条目</small>
        </article>
        <article class="stat-card">
          <span class="stat-label">剩余</span>
          <strong>{{ taskSummary.remaining }}</strong>
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
            <button
              v-for="filter in taskFilters"
              :key="filter"
              type="button"
              class="filter-pill"
              :class="{ 'is-active': selectedFilter === filter }"
              @click="selectedFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
      </aside>

      <section class="list-panel">
        <TaskComposer @add="addTask" />

        <TaskGroup
          title="今天"
          :count="visibleTodayTasks.length"
          :items="visibleTodayTasks"
          @delete="requestDeleteTask"
        />
        <TaskGroup
          title="稍后"
          :count="visibleLaterTasks.length"
          :items="visibleLaterTasks"
          @delete="requestDeleteTask"
        />
      </section>
    </section>

    <ConfirmDialog
      :visible="visible"
      :title="options.title"
      :message="options.message"
      :confirm-text="options.confirmText"
      :cancel-text="options.cancelText"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
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
.composer-action {
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

@media (max-width: 1080px) {
  .hero-panel,
  .workspace {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
}
</style>
