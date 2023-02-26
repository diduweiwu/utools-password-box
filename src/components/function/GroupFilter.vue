<template>
  <n-select style="width: 150px;" @update:value="onUpdate"
            v-model:value="selectGroup" clearable filterable
            :options="groups" placeholder="分组">
    <template #empty>暂无分组信息</template>
  </n-select>
</template>

<script>
import {onMounted, ref} from "vue";
import {fetchPasswordItemList, passwordUpdateEvent} from "../content/usePasswordStorage.js";
import {emitter, GROUP_FILTER_EVENT, SUB_INPUT_UPDATE_EVENT} from "../../js/eventBus.js";

export default {
  name: "GroupFilter",
  setup() {
    const groups = ref([])
    const selectGroup = ref(null)
    // 重新加载分组信息
    const reloadGroups = () => {
      selectGroup.value = null;
      const items = fetchPasswordItemList()
      groups.value = items.flatMap(item => item.groups || []).map(group => ({label: group, value: group}))
    }

    onMounted(() => {
      reloadGroups()
      // 密码信息更新后，需要重新加载分组信息
      emitter.on(passwordUpdateEvent, reloadGroups)
      emitter.on(SUB_INPUT_UPDATE_EVENT, () => emitter.emit(GROUP_FILTER_EVENT, selectGroup.value))
    })

    const onUpdate = (value) => emitter.emit(GROUP_FILTER_EVENT, value)

    return {
      groups,
      onUpdate,
      selectGroup,
    }
  }
}
</script>

<style scoped>

</style>
