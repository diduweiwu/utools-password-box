<template>
  <n-drawer v-model:show="isLocked" width="100%" :close-on-esc="false">
    <n-drawer-content>
      <n-space vertical justify="center" align="center" style="height: 80%;width: 100%;">
        <n-text>⚠ 已锁定,请输入解锁密码</n-text>
        <n-input v-model:value="unlockPassword" :internal-force-focus="true" placeholder="请输入密码回车" @keyup.enter="()=>unlock(unlockPassword)"/>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import useLockPage from "./useLockPage.js";
import {onMounted} from "vue";

export default {
  name: "LockPage",
  setup() {
    const {isLocked, show, unlock, unlockPassword, initIsLocked} = useLockPage()

    onMounted(initIsLocked)

    return {
      isLocked,
      show,
      unlock,
      unlockPassword,
    }
  }
}
</script>

<style scoped>

</style>
