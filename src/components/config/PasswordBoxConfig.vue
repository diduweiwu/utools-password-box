<template>
  <n-drawer v-model:show="isShow" placement="left" width="90%">
    <n-drawer-content title="全局配置">
      <n-form>
        <n-form-item v-if="formConfig['existUnlockPassword']" label="旧锁定密码">
          <n-input type="password" show-password-on="click" placeholder="请输入旧密码" clearable maxlength="50"
                   show-count
                   v-model:value="formConfig['userOldUnlockPassword']"/>
        </n-form-item>
        <n-form-item label="新锁定密码">
          <n-input type="password" show-password-on="click"
                   placeholder="请输入新锁定密码,置空即可清除密码(密码无价,请努力记住锁定密码)" clearable
                   maxlength="50"
                   show-count
                   v-model:value="formConfig['userNewUnlockPassword']"></n-input>
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
      formConfig,
      reloadConfigUnlockPassword,
    } = UsePasswordBoxConfig()

    return {
      isShow,
      show: () => {
        isShow.value = true;
        reloadConfigUnlockPassword()
      },
      close,
      updateConfigUnlockPassword,
      formConfig,
    }
  }
}
</script>

<style scoped>

</style>
