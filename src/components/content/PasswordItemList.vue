<template>
  <n-list hoverable v-if="passwordItemList&&passwordItemList.length" clickable>
    <template v-for="(passwordItem,index) in passwordItemList">
      <PasswordItem :key="passwordItem.id" :index-num="index" :password-item="passwordItem" v-if="!!passwordItem"/>
    </template>
    <template #footer>
      我是有底线的～
    </template>
  </n-list>
  <n-empty v-else description="暂无密码项"/>
</template>

<script>
import PasswordItem from "./PasswordItem.vue";
import UsePasswordItemList from "./usePasswordItemList.js";
import {onMounted} from "vue";
import {emitter, GROUP_FILTER_EVENT} from "/src/js/eventBus.js";
import {passwordUpdateEvent} from "/src/components/content/usePasswordStorage.js";
import PasswordItemEdit from "./PasswordItemEdit.vue";
import LockPage from "../lock/LockPage.vue";

export default {
  name: "ContentSection",
  components: {LockPage, PasswordItemEdit, PasswordItem},
  setup() {
    const {passwordItemList, reloadPasswordItemList} = UsePasswordItemList()

    onMounted(() => {
      reloadPasswordItemList()
      emitter.on(passwordUpdateEvent, reloadPasswordItemList)
      emitter.on(GROUP_FILTER_EVENT, filterGroup=> reloadPasswordItemList({filterGroup}))
    })

    return {
      passwordItemList,
      focus: () => console.log('123')
    }
  }
}
</script>

<style scoped>

</style>
