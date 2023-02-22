import {ref} from "vue";
import {aesDecrypt, aesEncrypt, fetchPasswordItemList, updatePasswordItemList} from "../content/usePasswordStorage.js";
import {fetchConfig, updateConfig} from "../../js/useConfig.js";
import {useMessage} from "naive-ui";

export const configUnlockPasswordKey = 'configUnlockPassword'

const fetchCurrentUnlockPassword = () => {
    const config = fetchConfig()
    const existedConfigUnlockPassword = config[configUnlockPasswordKey]
    if (!!existedConfigUnlockPassword) {
        return aesDecrypt(existedConfigUnlockPassword)
    }

    return ""
}

export default function () {
    const formConfig = ref({
        userOldUnlockPassword: '',
        userNewUnlockPassword: '',
        existUnlockPassword: '',
    })

    const isShow = ref(false)
    const close = () => isShow.value = false

    const {success, error} = useMessage()

    const updateConfigUnlockPassword = () => {
        const config = fetchConfig()
        const oldConfigUnlockPassword = fetchCurrentUnlockPassword()

        const passwordItemList = fetchPasswordItemList()
        // 判断旧密码与用户输入的旧密码是否相等
        if (!!oldConfigUnlockPassword && formConfig.value['userOldUnlockPassword'] !== oldConfigUnlockPassword) {
            error('旧密码不匹配,请重新输入')
            return
        }

        let newConfigUnlockPassword = formConfig.value['userNewUnlockPassword']

        // 比对新旧密码不一样则更新
        if (oldConfigUnlockPassword !== newConfigUnlockPassword) {
            if (!!newConfigUnlockPassword) {
                newConfigUnlockPassword = aesEncrypt(newConfigUnlockPassword)
            }
            config[configUnlockPasswordKey] = newConfigUnlockPassword
        }

        updateConfig(config) ? success('更新成功') : error('更新失败')
        // 触发更新密码项操作
        updatePasswordItemList(passwordItemList)
        close()
    }

    const reloadConfigUnlockPassword = () =>
        Object.assign(formConfig.value, {
            existUnlockPassword: fetchCurrentUnlockPassword(),
            userOldUnlockPassword: '',
            userNewUnlockPassword: ''
        })

    return {
        isShow,
        close,
        formConfig,
        reloadConfigUnlockPassword,
        updateConfigUnlockPassword,
    }
}
