<script>
import {darkTheme, useOsTheme} from "naive-ui";
import {computed, onMounted, ref} from "vue";
import FunctionSection from "./components/function/FunctionSection.vue";
import ContentSection from "./components/content/PasswordItemList.vue";
import About from "./components/about/About.vue";
import LockPage from "./components/lock/LockPage.vue";


export default {
  components: {LockPage, About, ContentSection, FunctionSection},
  setup() {

    const osThemeRef = useOsTheme();

    const lockPageRef = ref()
    // 切换到后台立即加锁
    utools.onPluginOut(({type, payload}) => {
      lockPageRef.value.initIsLocked()
    })
    // 初次加载也加锁
    onMounted(() => lockPageRef.value.initIsLocked())

    return {
      theme: computed(() => osThemeRef.value === "dark" ? darkTheme : null),
      lockPageRef,
    }
  }
}
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider placement="top" container-style="margin-top:50px" :duration="1500" :max="3">
      <n-layout position="absolute">
        <n-layout-header style="height: 50px;padding:0 10px" bordered>
          <FunctionSection/>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 60px;">
          <n-layout content-style="padding: 0 10px;" :native-scrollbar="false">
            <LockPage ref="lockPageRef"/>
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
