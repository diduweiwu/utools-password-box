<template>
  <PasswordItemEdit ref="passwordItemEdit"/>
  <PasswordBoxConfig ref="passwordBoxConfig"/>
  <About ref="about"/>
  <n-space justify="space-between" align="center" style="height: 50px;">
    <n-button @click="()=>passwordItemEdit.show()">
      添加
      <template #icon>
        <n-icon :component="PlusRound"/>
      </template>
    </n-button>
    <n-space align="center">
      <GroupFilter/>
      <n-button ghost :focusable="false" @click="()=>$refs.passwordBoxConfig.show()">
        <template #icon>
          <n-icon :component="SettingsRound"/>
        </template>
      </n-button>
      <n-button ghost :focusable="false" @click="()=>$refs.about.show()">
        <template #icon>
          <n-icon :component="InfoOutlined"/>
        </template>
      </n-button>
    </n-space>
  </n-space>
</template>

<script>
import {InfoOutlined, PlusRound, SettingsRound} from "@vicons/material";
import PasswordItemEdit from "/src/components/content/PasswordItemEdit.vue";
import About from "/src/components/about/About.vue";

import {ref} from "vue";
import PasswordBoxConfig from "../config/PasswordBoxConfig.vue";
import GroupFilter from "./GroupFilter.vue";

export default {
  name: "FunctionSection",
  components: {GroupFilter, PasswordBoxConfig, PasswordItemEdit, PlusRound, InfoOutlined, SettingsRound, About},
  setup() {

    return {
      PlusRound, InfoOutlined,
      PasswordItemEdit,
      passwordItemEdit: ref(),
      About,
      SettingsRound,
    }
  }
}
</script>

<style scoped>

</style>
