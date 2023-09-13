<template>
  <n-list ref="passwordItemListContainer" hoverable
          v-if="passwordItemList&&passwordItemList.length"
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
import {emitter, GROUP_FILTER_EVENT} from "/src/js/eventBus.js";
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

    /**
     * 焦点没有在密码项上面,锁定后台事件
     */
    window.addEventListener('focusin', (e) => {
      const classList = e.target.classList || []
      if (classList.contains("password-list-item")) {
        window.isPasswordItemListLocked = false
        return
      }
      window.isPasswordItemListLocked = true
    })

    useKeypress({
      keyEvent: "keyup",
      keyBinds: [
        {
          keyCode: "down",
          success: () => !window.isPasswordItemListLocked && increaseSelectedIndex(1)
        },
        {
          keyCode: "up",
          success: () => !window.isPasswordItemListLocked && decreaseSelectedIndex(1)
        },
        {
          keyCode: "page down",
          success: () => !window.isPasswordItemListLocked && increaseSelectedIndex(5)
        },
        {
          keyCode: "page up",
          success: () => !window.isPasswordItemListLocked && decreaseSelectedIndex(5)
        },
        {
          keyCode: "end",
          success: () => !window.isPasswordItemListLocked && increaseSelectedIndex(102400000)
        },
        {
          keyCode: "home",
          success: () => !window.isPasswordItemListLocked && decreaseSelectedIndex(102400000)
        },
      ]
    })

    return {
      selectedIndex,
      passwordItemList,
      passwordItemListContainer,
      increaseSelectedIndex,
      decreaseSelectedIndex,
    }
  }
}
</script>

<style scoped>

</style>
