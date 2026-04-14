import { reactive, ref } from 'vue'

export function useConfirmDialog() {
  const visible = ref(false)
  const options = reactive({
    title: '确认操作',
    message: '确定要继续吗？',
    confirmText: '确定',
    cancelText: '取消',
  })

  let resolvePromise = null

  const closeDialog = (result) => {
    visible.value = false

    if (resolvePromise) {
      resolvePromise(result)
      resolvePromise = null
    }
  }

  const confirm = (nextOptions = {}) =>
    new Promise((resolve) => {
      options.title = nextOptions.title ?? '确认操作'
      options.message = nextOptions.message ?? '确定要继续吗？'
      options.confirmText = nextOptions.confirmText ?? '确定'
      options.cancelText = nextOptions.cancelText ?? '取消'

      resolvePromise = resolve
      visible.value = true
    })

  const handleConfirm = () => closeDialog(true)

  const handleCancel = () => closeDialog(false)

  return {
    visible,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  }
}