<template>
  <n-drawer v-model:show="isLocked" width="100%" :close-on-esc="false" @after-leave="afterLeave" auto-focus
            @after-enter="afterEnter">
    <n-drawer-content>
      <n-space vertical justify="center" align="center" style="height: 80%;width: 100%;">
        <n-text>⚠ 已锁定,请输入解锁密码</n-text>
        <n-input-group>
          <n-input type="password" v-model:value="unlockPassword" show-password-on="click"
                   placeholder="请输入密码后回车"
                   @keyup.enter="()=>unlock(unlockPassword)"/>
          <n-button :focusable="false" @click="()=>unlock(unlockPassword)">解锁</n-button>
        </n-input-group>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import useLockPage from "./useLockPage.js";

export default {
  name: "LockPage",
  setup() {
    const {isLocked, unlock, unlockPassword, initIsLocked} = useLockPage()

    const afterEnter = () => utools.subInputBlur()
    const afterLeave = () => utools.subInputFocus()

    return {
      isLocked,
      initIsLocked,
      unlock,
      unlockPassword,
      afterEnter,
      afterLeave,
    }
  }
}
</script>

<style scoped>

</style>
