import {ref} from "vue";
import UsePasswordStorage from "./usePasswordStorage.js";
import {emitter, SUB_INPUT_UPDATE_EVENT} from "../../js/eventBus.js";

export default function () {
    const passwordItemList = ref([])

    const keyWord = ref()

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
        passwordItemList,
        reloadPasswordItemList,
        deletePasswordItem,
    }
}
