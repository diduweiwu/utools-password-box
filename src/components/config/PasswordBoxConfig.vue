<template>
  <n-drawer v-model:show="isShow" placement="left" width="90%">
    <n-drawer-content title="全局配置">
      <n-form>
        <n-form-item label="锁定密码(清空并保存成功即可去除锁定)">
          <n-input placeholder="请输入全局锁定密码" clearable maxlength="50" show-count
                   v-model:value="configUnlockPassword"></n-input>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space>
          <n-button :focusable="false" type="primary" @click="updateConfigUnlockPassword">保存</n-button>
          <n-button :focusable="false" type="default" @click="close">取消</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import UsePasswordBoxConfig from "./usePasswordBoxConfig.js";

export default {
  name: "PasswordBoxConfig",
  setup() {

    const {
      isShow,
      close,
      updateConfigUnlockPassword,
      configUnlockPassword,
      reloadConfigUnlockPassword,
    } = UsePasswordBoxConfig()

    return {
      isShow,
      show: () => {
        reloadConfigUnlockPassword()
        isShow.value = true
      },
      close,
      updateConfigUnlockPassword,
      configUnlockPassword,
    }
  }
}
</script>

<style scoped>

</style>
