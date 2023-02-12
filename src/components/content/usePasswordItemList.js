import {ref} from "vue";
import UsePasswordStorage from "./usePasswordStorage.js";

export default function () {
    const passwordItemList = ref([])

    const keyWord = ref()

    const {fetchPasswordItemList, deletePasswordItem} = UsePasswordStorage()
    const reloadPasswordItemList = () => {
        let fullPasswordItemList = fetchPasswordItemList()

        const filterStr = keyWord.value
        if (typeof filterStr !== "undefined" && !!(filterStr.trim())) {
            fullPasswordItemList = fullPasswordItemList.filter(v => v.passwordName.indexOf(filterStr) > -1)
        }
        passwordItemList.value = fullPasswordItemList
    }

    // 进入列表的时候,初始化进行筛选
    utools.onPluginEnter(({type, payload}) => {
        utools.setSubInput(({text}) => keyWord.value = text, "回车搜索密码项名称,双击复制密码，鼠标右击收藏～");
        if (type === 'over') {
            utools.setSubInputValue(payload)
            keyWord.value = payload
        }
        reloadPasswordItemList()
    })
    addEventListener('keydown', (event) => {
        // 回车的时候，进行搜索
        if (event.code === 'Enter') {
            reloadPasswordItemList()
        }
    });


    return {
        passwordItemList,
        reloadPasswordItemList,
        deletePasswordItem,
    }
}
