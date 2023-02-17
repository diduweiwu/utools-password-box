<template>
  <n-drawer v-model:show="isShow" style="width: 90%" placement="left">
    <n-drawer-content>
      <n-result status="404" title="这里只是一个兴趣使然的开发者" description="生活总归需要点乐趣">
        <template #footer>
          <n-list>
            <n-list-item>双击序号-直接填充密码</n-list-item>
            <n-list-item>双击名称项-复制账号</n-list-item>
            <n-list-item>双击密码项-复制密码</n-list-item>
            <n-list-item>鼠标右击加入收藏（收藏后会置顶）</n-list-item>
            <n-list-item>功能区域五个按钮功能依次是:显示密码,查看详情,加入收藏,编辑,删除</n-list-item>
            <n-list-item>源码地址: <a href="https://github.com/diduweiwu/utools-password-box">https://github.com/diduweiwu/utools-password-box</a>
            </n-list-item>
          </n-list>
        </template>
      </n-result>
    </n-drawer-content>
  </n-drawer>

</template>

<script>
import {ref} from "vue";

export default {
  name: "About",
  setup() {
    const isShow = ref(false)

    return {
      isShow,
      show: () => isShow.value = true,
    }
  }
}
</script>

<style scoped>

</style>
