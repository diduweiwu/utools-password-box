const passwordItemMapKey = 'passwordItemMap'
import {emitter} from "/src/js/eventBus.js";

function fetchPasswordItemMap() {
    return utools.dbStorage.getItem(passwordItemMapKey) || {}
}

const passwordListSort = (v1, v2) => {
    // 先按是否置顶收藏排序
    if ((v2.isStar || 0) > (v1.isStar || 0)) {
        return 1;
    }

    // 再按创建时间倒排序
    return (v2.createdAt || 0) - (v1.createdAt || 0)
}

const validFilter = (v) => v.id && v.passwordName && v.passwordContent

export function fetchPasswordItemList() {
    // 先按收藏的排序在最前面，然后按照创建日期倒排序
    // 密码项id/名称/内容 必须都存在才会展示
    return Object.values(fetchPasswordItemMap()).sort(passwordListSort).filter(validFilter)
}

function updatePasswordItemMap(passwordItemMap = {}) {
    const newPasswordItemMap = Object.fromEntries(Object.values(passwordItemMap).filter(validFilter).map(v => [v.id, v]))
    utools.dbStorage.setItem(passwordItemMapKey, newPasswordItemMap)
    emitter.emit(passwordUpdateEvent)
}

function updatePasswordItem(passwordItem) {
    if (!passwordItem) {
        return
    }

    const id = passwordItem['id']
    if (!id) {
        passwordItem['createdAt'] = new Date().getTime()
        passwordItem['id'] = window.crypto.randomUUID()
    }

    if (!(passwordItem.id && passwordItem.passwordName && passwordItem.passwordContent)) {
        return
    }

    const passwordItemMap = fetchPasswordItemMap()
    passwordItemMap[passwordItem['id']] = passwordItem

    updatePasswordItemMap(JSON.parse(JSON.stringify(passwordItemMap)))
}

function deletePasswordItem(passwordItem) {
    if (!passwordItem) {
        return true
    }

    const id = passwordItem['id']
    if (!id) {
        return true
    }
    const passwordItemMap = fetchPasswordItemMap()
    delete passwordItemMap[id]
    updatePasswordItemMap(JSON.parse(JSON.stringify(passwordItemMap)))
}

export const passwordUpdateEvent = 'passwordUpdateEvent'

export default function () {
    return {
        fetchPasswordItemMap,
        fetchPasswordItemList,
        updatePasswordItemMap,
        updatePasswordItem,
        deletePasswordItem,
    }
}
