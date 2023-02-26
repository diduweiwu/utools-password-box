<template>
  <n-drawer v-model:show="isShow" height="90%" :close-on-esc="false">
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
        <n-descriptions-item label="所属应用">
          <n-text>
            {{ passwordItem['application'] }}
          </n-text>
        </n-descriptions-item>
        <n-descriptions-item label="描述">
          <n-text>
            {{ passwordItem['description'] }}
          </n-text>
        </n-descriptions-item>
        <n-descriptions-item label="所属分组">
         <n-space>
           <template v-for="group in passwordItem['groups']">
             <n-tag>
               {{ group }}
             </n-tag>
           </template>
         </n-space>
        </n-descriptions-item>
      </n-descriptions>

      <template #footer>
        <n-space>
          <n-button @click="()=>copyContent(passwordItem.passwordUserName)" :focusable="false">复制账号</n-button>
          <n-button @click="()=>copyContent(passwordItem.passwordContent)" :focusable="false">复制密码</n-button>
          <n-button @click="isShowPlainPassword=!isShowPlainPassword" :focusable="false" type="primary">
            {{ isShowPlainPassword ? '隐藏' : '显示' }}密码
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
import useCopy from "../../js/useCopy.js";

export default {
  name: "PasswordItemView",

  setup() {
    const isShow = ref(false)
    const isShowPlainPassword = ref(false)
    const passwordItem = ref({})

    const close = () => isShow.value = false
    const {copyContent} = useCopy()

    return {
      isShow,
      isShowPlainPassword,
      show: (initPasswordItem) => {
        passwordItem.value = initPasswordItem || {}
        isShow.value = true
      },
      copyContent,
      close,
      passwordItem,
      LockOutlined,
    }
  }
}
</script>

<style scoped>

</style>
