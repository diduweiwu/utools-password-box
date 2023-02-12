<template>
  <n-list-item @dblclick="copyPassword" :key="passwordItem.id" @click.right="starPassword">
    <template #prefix>
      <n-space align="center" justify="start" style="width: 240px">
        <div style="width: 50px;" @click="fillPasswordToInput">
          <n-tag round style="cursor:pointer;">{{ indexNum + 1 }}</n-tag>
        </div>
        <n-ellipsis style="max-width: 200px">{{ passwordItem['passwordName'] }}</n-ellipsis>
      </n-space>
    </template>
    <n-space justify="space-between" align="center" class="password-item">
      <n-ellipsis style="max-width: 280px" v-if="isShowPlainPassword">{{ passwordItem['passwordContent'] }}</n-ellipsis>
      <n-text v-else>
        <n-icon :component="LockOutlined"/>
        **********
      </n-text>
    </n-space>
    <template #suffix>
      <n-space style="width: 175px;" justify="center" align="center">
        <n-button :focusable="false" size="small" ghost @click="isShowPlainPassword=!isShowPlainPassword">
          <n-icon v-if="isShowPlainPassword" :component="RemoveRedEyeOutlined"/>
          <n-icon v-else :component="RemoveRedEyeSharp"/>
        </n-button>
        <n-button :focusable="false" size="small" ghost @click="starPassword">
          <n-icon v-if="passwordItem.isStar" :component="StarOutlined"/>
          <n-icon v-else :component="StarOutlineTwotone"/>
        </n-button>
        <n-button :focusable="false" size="small" ghost @click="()=>$refs.passwordItemEdit.show(passwordItem)">
          <n-icon :component="EditCalendarFilled"/>
        </n-button>
        <n-popconfirm v-model:show="showDeleteConfirm" positive-text="确定" negative-text="算了"
                      :on-positive-click="deletePasswordItem">
          <template #trigger>
            <n-button :focusable="false" size="small" ghost type="error" @click="showDeleteConfirm=true">
              <n-icon :component="DeleteOutlineTwotone"/>
            </n-button>
          </template>
          确定删除吗？
        </n-popconfirm>
      </n-space>
    </template>
  </n-list-item>
  <PasswordItemEdit ref="passwordItemEdit" placement="left"/>
</template>

<script>
import {ref, toRefs} from "vue";
import {
  DeleteOutlineTwotone,
  EditCalendarFilled,
  LockOutlined,
  RemoveRedEyeOutlined,
  RemoveRedEyeSharp,
  StarOutlined,
  StarOutlineTwotone,
} from "@vicons/material";
import UsePasswordStorage from "./usePasswordStorage.js";
import {useMessage} from "naive-ui";
import PasswordItemEdit from "./PasswordItemEdit.vue";

export default {
  name: "PasswordItem",
  components: {PasswordItemEdit},
  props: {
    indexNum: {type: Number, default: 1},
    passwordItem: {type: Object, default: null}
  },
  setup(props) {
    const {passwordItem} = toRefs(props)
    const {deletePasswordItem, updatePasswordItem} = UsePasswordStorage()
    const {success} = useMessage()
    // 复制
    const copyPassword = () => {
      const copyResult = utools.copyText(passwordItem.value.passwordContent)
      success(copyResult ? '复制成功,去粘贴吧~' : '复制失败:(,请重试或者联系作者')
      if (copyResult) {
        utools.hideMainWindow()
      }
    }

    // 直接填充密码到输入框
    const fillPasswordToInput = () => {
      utools.hideMainWindowTypeString(passwordItem.value.passwordContent)
    }

    // 置顶收藏
    const starPassword = () => {
      passwordItem.value['isStar'] = !!passwordItem.value['isStar'] ? 0 : 1
      updatePasswordItem(passwordItem.value)
      success(passwordItem.value['isStar'] ? '已加入收藏' : '已取消收藏')
    }

    // 是否展示为明文密码
    const isShowPlainPassword = ref(false)
    const showDeleteConfirm = ref(false)

    return {
      isShowPlainPassword,
      showDeleteConfirm,
      deletePasswordItem: () => deletePasswordItem(passwordItem.value),
      copyPassword,
      fillPasswordToInput,
      starPassword,
      LockOutlined,
      RemoveRedEyeOutlined,
      RemoveRedEyeSharp,
      StarOutlined,
      StarOutlineTwotone,
      DeleteOutlineTwotone,
      EditCalendarFilled,
      PasswordItemEdit,
    }
  }
}
</script>

<style scoped>
.password-item {
  height: 40px;
}
</style>
