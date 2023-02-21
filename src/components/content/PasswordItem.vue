<template>
  <n-list-item :key="passwordItem.id" @click.right="starPassword">
    <template #prefix>
      <n-space align="center" justify="start" style="width: 240px">
        <n-popover placement="right">
          双击直接填充密码
          <template #trigger>
            <div style="width: 50px;" @dblclick="fillPasswordToInput">
              <n-tag round style="cursor:pointer;">{{ indexNum + 1 }}</n-tag>
            </div>
          </template>
        </n-popover>
        <n-popover>
          双击直接复制账号
          <template #trigger>
            <div style="max-width: 175px;cursor:pointer;" @dblclick="()=>copyContent(passwordItem['passwordUserName'])">
              <n-text type="info">
                <n-ellipsis>
                  {{ passwordItem['passwordName'] }}
                </n-ellipsis>
              </n-text>
            </div>
          </template>
        </n-popover>
      </n-space>
    </template>
    <n-space vertical justify="space-between" size="small">
      <n-space align="center" class="password-item"
               @dblclick="()=>copyContent(passwordItem['passwordContent'])">
        <n-popover>
          双击直接复制密码
          <template #trigger>
            <n-ellipsis style="max-width: 280px" v-if="isShowPlainPassword">
              {{ passwordItem['passwordContent'] }}
            </n-ellipsis>
            <n-text v-else>
              <n-icon :component="LockOutlined"/>
              **********
            </n-text>
          </template>
        </n-popover>
      </n-space>
      <template v-if="passwordItem['groups']&&passwordItem['groups'].length">
        <n-space>
          <n-tag size="small" type="info" v-for="group in passwordItem['groups']">{{ group }}</n-tag>
        </n-space>
      </template>

    </n-space>
    <template #suffix>
      <n-space style="width: 175px;" justify="center" align="center">
        <n-popover>
          显示密码
          <template #trigger>
            <n-button :focusable="false" size="tiny" ghost @click="isShowPlainPassword=!isShowPlainPassword">
              <n-icon v-if="isShowPlainPassword" :component="RemoveRedEyeOutlined"/>
              <n-icon v-else :component="RemoveRedEyeSharp"/>
            </n-button>
          </template>
        </n-popover>
        <n-popover>
          查看详情
          <template #trigger>
            <n-button :focusable="false" size="tiny" ghost @click="()=>$refs.passwordItemView.show(passwordItem)">
              <n-icon :component="DocumentScannerOutlined"/>
            </n-button>
          </template>
        </n-popover>

        <n-popover>
          {{ passwordItem.isStar ? '取消收藏' : '加入收藏' }}
          <template #trigger>
            <n-button :focusable="false" size="tiny" ghost @click="starPassword">
              <n-icon v-if="passwordItem.isStar" :component="StarOutlined"/>
              <n-icon v-else :component="StarOutlineTwotone"/>
            </n-button>
          </template>
        </n-popover>
        <n-popover>
          编辑详情
          <template #trigger>
            <n-button :focusable="false" size="tiny" ghost @click="()=>$refs.passwordItemEdit.show(passwordItem)">
              <n-icon :component="EditCalendarFilled"/>
            </n-button>
          </template>
        </n-popover>
        <n-popover>
          删除
          <template #trigger>
            <n-popconfirm v-model:show="showDeleteConfirm" positive-text="确定" negative-text="算了"
                          :on-positive-click="deletePasswordItem">
              <template #trigger>
                <n-button :focusable="false" size="tiny" ghost type="error" @click="showDeleteConfirm=true">
                  <n-icon :component="DeleteOutlineTwotone"/>
                </n-button>
              </template>
              确定删除吗？
            </n-popconfirm>
          </template>
        </n-popover>
      </n-space>
    </template>
  </n-list-item>
  <PasswordItemEdit ref="passwordItemEdit" placement="left"/>
  <PasswordItemView ref="passwordItemView" placement="bottom"/>
</template>

<script>
import {ref, toRefs} from "vue";
import {
  DeleteOutlineTwotone,
  DocumentScannerOutlined,
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
import PasswordItemView from "./PasswordItemView.vue";
import useCopy from "../../js/useCopy.js";

export default {
  name: "PasswordItem",
  components: {PasswordItemView, PasswordItemEdit},
  props: {
    indexNum: {type: Number, default: 1},
    passwordItem: {type: Object, default: null}
  },
  setup(props) {
    const {passwordItem} = toRefs(props)
    const {deletePasswordItem, updatePasswordItem} = UsePasswordStorage()
    const {success} = useMessage()

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

    const {copyContent} = useCopy()

    return {
      isShowPlainPassword,
      showDeleteConfirm,
      deletePasswordItem: () => deletePasswordItem(passwordItem.value),
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
      DocumentScannerOutlined,
      copyContent,
    }
  }
}
</script>

<style scoped>
.password-item {
  height: 40px;
}
</style>
