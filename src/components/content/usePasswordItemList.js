import {ref} from "vue";
import UsePasswordStorage from "./usePasswordStorage.js";
import {emitter, SUB_INPUT_UPDATE_EVENT} from "../../js/eventBus.js";

export default function () {
    const passwordItemList = ref([])

    const keyWord = ref()

    // 当前选中的条目行号,从0开始
    const selectedIndex = ref(-1);

    const {fetchPasswordItemList, deletePasswordItem} = UsePasswordStorage()
    const reloadPasswordItemList = (config = {filterGroup: ''}) => {
        let fullPasswordItemList = fetchPasswordItemList()
        const {filterGroup} = config

        const filterStr = keyWord.value
        if (typeof filterStr !== "undefined" && !!(filterStr.trim())) {
            fullPasswordItemList = fullPasswordItemList.filter(v => v.passwordName.toLocaleLowerCase().indexOf(filterStr.toLocaleLowerCase()) > -1)
        }

        if (!!filterGroup) {
            fullPasswordItemList = fullPasswordItemList.filter(v => (v.groups || []).indexOf(filterGroup) > -1)
        }

        passwordItemList.value = fullPasswordItemList
    }

    /**
     * 增加选择的序号
     */
    const increaseSelectedIndex = (step = 1) => {
        selectedIndex.value = Math.min(selectedIndex.value + step, passwordItemList.value.length - 1)
    }

    /**
     * 减少选择的序号
     */
    const decreaseSelectedIndex = (step = 1) => {
        selectedIndex.value = Math.max(selectedIndex.value - step, 0)
    }

    // 进入列表的时候,初始化进行筛选
    utools.onPluginEnter(({type, payload}) => {
        utools.setSubInput(({text}) => {
            keyWord.value = text
            emitter.emit(SUB_INPUT_UPDATE_EVENT)
        }, "输入关键字搜索,双击序号填充密码,单击名称查看详情,双击复制密码,右击收藏～");

        if (type === 'over') {
            utools.setSubInputValue(payload)
            keyWord.value = text
            emitter.emit(SUB_INPUT_UPDATE_EVENT)
        }
    })

    return {
        selectedIndex,
        passwordItemList,
        increaseSelectedIndex,
        decreaseSelectedIndex,
        reloadPasswordItemList,
        deletePasswordItem,
    }
}
