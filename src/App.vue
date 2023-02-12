<script>
import {darkTheme, useOsTheme} from "naive-ui";
import {computed} from "vue";
import FunctionSection from "./components/function/FunctionSection.vue";
import ContentSection from "./components/content/PasswordItemList.vue";
import About from "./components/about/About.vue";


export default {
  components: {About, ContentSection, FunctionSection},
  setup() {

    const osThemeRef = useOsTheme();

    return {
      theme: computed(() => osThemeRef.value === "dark" ? darkTheme : null),
    }
  }
}
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider placement="top" container-style="margin-top:50px" :duration="1500" closable>
      <n-layout position="absolute">
        <n-layout-header style="height: 50px;padding:0 10px" bordered>
          <FunctionSection/>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 60px;">
          <n-layout content-style="padding: 0 10px;" :native-scrollbar="false">
            <ContentSection/>
          </n-layout>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>

</template>

<style scoped>

</style>

<style>

</style>
