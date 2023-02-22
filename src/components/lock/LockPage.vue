<template>
  <n-drawer v-model:show="isLocked" width="100%" :close-on-esc="false">
    <n-drawer-content>
      <n-space vertical justify="center" align="center" style="height: 80%;width: 100%;">
        <n-text>⚠ 已锁定,请输入解锁密码</n-text>
        <n-input-group>
          <n-input v-model:value="unlockPassword" type="password" show-password-on="click" :autofocus="true"
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

    return {
      isLocked,
      initIsLocked,
      unlock,
      unlockPassword,
    }
  }
}
</script>

<style scoped>

</style>
