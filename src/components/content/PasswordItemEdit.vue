<template>
  <div>
    <n-drawer v-model:show="isShow" :on-after-leave="close" width="90%" :close-on-esc="false">
      <n-drawer-content>
        <template #header>
          密码编辑
        </template>
        <n-form ref="formRef" :model='model' :rules="rules" label-placement="left" label-width="80"
                require-mark-placement="left">
          <n-form-item label="名称" path="passwordName">
            <n-input placeholder="请输入密码项名称" maxlength="100" v-model:value="model.passwordName" show-count/>
          </n-form-item>
          <n-form-item label="账号" path="passwordUserName">
            <n-input :resizable="false" maxlength="100" placeholder="请输入账号名称，纯key类型，该项可以留空" show-count
                     v-model:value="model.passwordUserName"/>
          </n-form-item>
          <n-form-item label="密码" path="passwordContent">
            <n-input-group>
              <n-input type="password" :resizable="false" maxlength="2048" placeholder="请输入密码内容" show-count
                       show-password-on="click"
                       v-model:value="model.passwordContent"/>
              <n-button @click="()=>model.passwordContent=genPassword()">生成</n-button>
            </n-input-group>
          </n-form-item>
          <n-form-item label="加入收藏" label-placement="left">
            <n-radio-group v-model:value="model.isStar" name="isStar" :default-value="0">
              <n-radio :value="0">否</n-radio>
              <n-radio :value="1">是</n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="所属应用">
            <n-input placeholder="该密码项所属的网站，APP" maxlength="250" show-count v-model:value="model.application"/>
          </n-form-item>

          <n-form-item label="备注说明">
            <n-input type="textarea" :rows="2" placeholder="该密码项的相关描述" maxlength="5000"
                     show-count v-model:value="model.description"/>
          </n-form-item>
          <n-form-item label="所属分组">
            <n-space size="small">
              <n-dynamic-tags v-model:value="model.groups"/>
              <n-button size="small" @click="()=>$refs.passwordGroupSelect.show()" :focusable="false">选择</n-button>
            </n-space>
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space align="center">
            <n-button type="primary" @click="onSave">保存</n-button>
            <n-button type="default" @click="close">关闭</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>

    <password-group-select ref="passwordGroupSelect" :callback="handleSelected"/>
  </div>
</template>

<script>
import {ref} from "vue";
import {emitter} from "/src/js/eventBus.js";
import UsePasswordStorage from "./usePasswordStorage.js";
import {useMessage} from "naive-ui";
import {genPassword} from "/src/js/usePassword.js";
import PasswordGroupSelect from "./PasswordGroupSelect.vue";


export default {
  name: "PasswordItemEdit",
  components: {PasswordGroupSelect},
  setup() {
    const isShow = ref(false)

    const model = ref({
      passwordName: '',
      passwordContent: '',
      groups: [],
      isStar: 0,
    })

    const rules = ref({
      passwordName: {
        required: true,
        max: 100,
        message: '请输入密码项名称',
      },
      passwordContent: {
        required: true,
        max: 2048,
        message: '请输入密码内容',
      },
    })

    const {success} = useMessage()
    const {updatePasswordItem} = UsePasswordStorage()
    const formRef = ref()

    const close = () => isShow.value = false

    const onSave = () => {
      formRef.value?.validate(errors => {
        if (!errors) {
          updatePasswordItem(model.value)
          success('保存成功')
          close()
        }
      })
    }

    const {warning} = useMessage()
    const handleSelected = (group) => {
      if (!group) {
        return true
      }

      if (!model.value.groups) {
        model.value.groups = []
      }

      if (model.value.groups.includes(group)) {
        warning('已经添加了这个分组啦~')
        return false
      }
      model.value.groups.push(group)
      return true
    }

    return {
      isShow,
      formRef,
      onClose: () => emitter.emit('onPasswordUpdate'),
      onSave,
      show: (passwordItem = {}) => {
        model.value = JSON.parse(JSON.stringify(passwordItem))
        isShow.value = true
      },
      close,
      rules,
      model,
      genPassword,
      handleSelected,
    }
  }
}
</script>

<style scoped>

</style>
