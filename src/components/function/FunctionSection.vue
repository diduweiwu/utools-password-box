<template>
  <PasswordItemEdit ref="passwordItemEdit"/>
  <About ref="about"/>
  <n-space justify="space-between" align="center" style="height: 50px;">
    <n-button @click="()=>passwordItemEdit.show()">
      添加
      <template #icon>
        <n-icon :component="PlusRound"/>
      </template>
    </n-button>
    <n-button :focusable="false" text round @click="()=>$refs.about.show()">
      <template #icon>
        <n-icon :component="InfoOutlined"/>
      </template>
    </n-button>
  </n-space>
</template>

<script>
import {PlusRound,InfoOutlined} from "@vicons/material";
import PasswordItemEdit from "/src/components/content/PasswordItemEdit.vue";
import About from "/src/components/about/About.vue";

import {ref} from "vue";

export default {
  name: "FunctionSection",
  components: {PasswordItemEdit, PlusRound,InfoOutlined, About},
  setup() {

    return {
      PlusRound,InfoOutlined,
      PasswordItemEdit,
      passwordItemEdit: ref(),
      About,
    }
  }
}
</script>

<style scoped>

</style>
