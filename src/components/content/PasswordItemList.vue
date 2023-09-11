<template>
  <n-list ref="passwordItemListContainer" autofocus hoverable v-if="passwordItemList&&passwordItemList.length"
          clickable>
    <template v-for="(passwordItem,index) in passwordItemList">
      <PasswordItem :selected-index="selectedIndex" :key="passwordItem.id" :index-num="index"
                    :password-item="passwordItem" v-if="!!passwordItem"/>
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
import {onMounted, ref} from "vue";
import {emitter, GROUP_FILTER_EVENT, UNLOCK_SUCCESSFULLY} from "/src/js/eventBus.js";
import {passwordUpdateEvent} from "/src/components/content/usePasswordStorage.js";
import PasswordItemEdit from "./PasswordItemEdit.vue";
import LockPage from "../lock/LockPage.vue";
import {useKeypress} from "vue3-keypress";

export default {
  name: "ContentSection",
  components: {LockPage, PasswordItemEdit, PasswordItem},
  setup() {
    const {
      selectedIndex,
      passwordItemList,
      reloadPasswordItemList,
      increaseSelectedIndex,
      decreaseSelectedIndex
    } = UsePasswordItemList()

    const passwordItemListContainer = ref(null)

    onMounted(() => {
      reloadPasswordItemList()
      emitter.on(passwordUpdateEvent, reloadPasswordItemList)
      emitter.on(GROUP_FILTER_EVENT, filterGroup => reloadPasswordItemList({filterGroup}))
    })

    useKeypress({
      keyEvent: "keyup",
      keyBinds: [
        {
          keyCode: "down",
          success: () => increaseSelectedIndex(1)
        },
        {
          keyCode: "up",
          success: () => decreaseSelectedIndex(1)
        },
        {
          keyCode: "page down",
          success: () => increaseSelectedIndex(5)
        },
        {
          keyCode: "page up",
          success: () => decreaseSelectedIndex(5)
        },
        {
          keyCode: "end",
          success: () => increaseSelectedIndex(102400000)
        },
        {
          keyCode: "home",
          success: () => decreaseSelectedIndex(102400000)
        },
      ]
    })

    // 解锁成功,重置选择项
    emitter.on(UNLOCK_SUCCESSFULLY, () => selectedIndex.value = -1)

    return {
      selectedIndex,
      passwordItemList,
      passwordItemListContainer,
      increaseSelectedIndex,
      decreaseSelectedIndex
    }
  }
}
</script>

<style scoped>

</style>
