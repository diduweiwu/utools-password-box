<template>
  <n-drawer v-model:show="isShow" height="80%" :close-on-esc="false">
    <n-drawer-content>
      <template #header>
        详情
      </template>
      <n-descriptions bordered :column="1" label-placement="left" label-style="width:100px">
        <n-descriptions-item label="名称">
          <n-text>
            {{ passwordItem['passwordName'] }}
          </n-text>
        </n-descriptions-item>
        <n-descriptions-item label="账号">
          <n-text>
            {{ passwordItem['passwordUserName'] }}
          </n-text>
        </n-descriptions-item>
        <n-descriptions-item label="密码">
          <n-text>
            {{ isShowPlainPassword ? passwordItem['passwordContent'] : '**********' }}
          </n-text>
        </n-descriptions-item>
        <n-descriptions-item label="描述">
          <n-text>
            {{ passwordItem['description'] }}
          </n-text>
        </n-descriptions-item>
      </n-descriptions>

      <template #footer>
        <n-space>
          <n-button @click="isShowPlainPassword=!isShowPlainPassword" :focusable="false" type="primary">
            {{ isShowPlainPassword ? '隐藏' : '显示' }}
          </n-button>
          <n-button @click="close" :focusable="false">关闭</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {ref} from "vue";
import {LockOutlined} from "@vicons/material";

export default {
  name: "PasswordItemView",

  setup() {
    const isShow = ref(false)
    const isShowPlainPassword = ref(false)
    const passwordItem = ref({})

    const close = () => isShow.value = false

    return {
      isShow,
      isShowPlainPassword,
      show: (initPasswordItem) => {
        passwordItem.value = initPasswordItem || {}
        isShow.value = true
      },
      close,
      passwordItem,
      LockOutlined,
    }
  }
}
</script>

<style scoped>

</style>
