import {emitter} from "/src/js/eventBus.js";
import {fetchConfig} from "../../js/useConfig.js";
import {configUnlockPasswordKey} from "../config/usePasswordBoxConfig.js";

const passwordItemMapKey = 'passwordItemMap'

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

function decryptPassword(passwordItem, isLocked = false) {
    if (!passwordItem) {
        return passwordItem
    }
    // 已经上锁，则解锁
    if (isLocked) {
        passwordItem['passwordContent'] = aesDecrypt(passwordItem['passwordContent'])
    }
    return passwordItem
}

function encryptPassword(passwordItem, isLocked = false) {
    if (!passwordItem) {
        return passwordItem
    }
    // 已经上锁，则解锁
    if (isLocked) {
        passwordItem['passwordContent'] = aesEncrypt(passwordItem['passwordContent'])
    }
    return passwordItem
}

export function fetchPasswordItemList() {
    const config = fetchConfig()
    const isLocked = !!config[configUnlockPasswordKey]
    // 先按收藏的排序在最前面，然后按照创建日期倒排序
    // 密码项id/名称/内容 必须都存在才会展示
    return Object.values(fetchPasswordItemMap()).map(passwordItem => decryptPassword(passwordItem, isLocked)).sort(passwordListSort).filter(validFilter)
}

function updatePasswordItemMap(passwordItemMap = {}) {
    const config = fetchConfig()
    const isLocked = !!config[configUnlockPasswordKey]
    const newPasswordItemMap = Object.fromEntries(Object.values(passwordItemMap).filter(validFilter).map(v => encryptPassword(v, isLocked)).map(v => [v.id, v]))
    utools.dbStorage.setItem(passwordItemMapKey, newPasswordItemMap)
    emitter.emit(passwordUpdateEvent)
}

export function updatePasswordItem(passwordItem) {
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

export function updatePasswordItemList(passwordItemList = []) {
    if (!(passwordItemList && passwordItemList.length)) {
        return
    }

    const passwordItemMap = fetchPasswordItemMap()
    for (let passwordItem of passwordItemList) {
        passwordItemMap[passwordItem['id']] = passwordItem
    }

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

const secret = import.meta.env.VITE_SECRET

export function aesEncrypt(plainText, userSecret = secret) {
    try {
        return encrypt(plainText, userSecret)
    } catch (e) {
        return plainText;
    }
}

export function aesDecrypt(plainText, userSecret = secret) {
    try {
        return decrypt(plainText, userSecret)
    } catch (e) {
        return plainText;
    }
}

export default function () {
    return {
        fetchPasswordItemMap,
        fetchPasswordItemList,
        updatePasswordItemMap,
        updatePasswordItem,
        updatePasswordItemList,
        deletePasswordItem,
        aesEncrypt,
        aesDecrypt,
    }
}
