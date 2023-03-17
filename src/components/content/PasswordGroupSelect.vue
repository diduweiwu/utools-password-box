<template>
  <n-drawer v-model:show="isShow" placement="right" width="60%">
    <n-drawer-content>
      <n-layout position="absolute">
        <n-layout-header style="height: 64px; padding: 12px" bordered>
          <n-input v-model:value="keyWord" placeholder="请输入关键字过滤" clearable/>
        </n-layout-header>
        <n-layout has-sider position="absolute" style="top: 64px;">
          <n-layout content-style="padding: 6px 12px;">
            <n-list clickable hoverable>
              <n-list-item v-for="group in dynamicGroups" :key="group" @click="()=>handleSelected(group)">{{
                  group
                }}
              </n-list-item>
            </n-list>
          </n-layout>
        </n-layout>
      </n-layout>

    </n-drawer-content>
  </n-drawer>
</template>

<script>
import {computed, ref} from "vue";
import {fetchPasswordItemList} from "./usePasswordStorage.js";

export default {
  name: "PasswordGroupSelect",
  props: {
    callback: {type: Function, default: null},
  },
  setup(props) {
    const {callback} = props

    const keyWord = ref()
    const isShow = ref(false)
    const groups = ref([])
    const dynamicGroups = computed(() => {
      if (!keyWord.value) {
        return groups.value
      }
      return groups.value.filter(v => v.indexOf(keyWord.value) > -1)
    })

    // 重新加载分组信息
    const reloadGroups = () => {
      const items = fetchPasswordItemList()
      groups.value = Array.from(new Set(items.flatMap(item => item.groups || [])))
    }
    const show = () => {
      reloadGroups()
      keyWord.value = null
      isShow.value = true
    }

    const handleSelected = (group) => {
      if (!(callback && callback(group))) {
        return
      }

      isShow.value = false
    }

    return {
      isShow,
      show,
      handleSelected,
      keyWord,
      dynamicGroups,
    }
  }
}
</script>

<style scoped>

</style>
