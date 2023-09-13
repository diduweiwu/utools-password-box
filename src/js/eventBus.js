import mitt from "mitt";

export const emitter = mitt()

// 分组筛选事件
export const GROUP_FILTER_EVENT = 'GROUP_FILTER_EVENT'

// 子输入框更新事件
export const SUB_INPUT_UPDATE_EVENT = 'SUB_INPUT_UPDATE_EVENT'
