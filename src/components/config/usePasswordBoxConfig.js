import {ref} from "vue";
import {aesDecrypt, aesEncrypt, fetchPasswordItemList, updatePasswordItemList} from "../content/usePasswordStorage.js";
import {fetchConfig, updateConfig} from "../../js/useConfig.js";
import {useMessage} from "naive-ui";

export const configUnlockPasswordKey = 'configUnlockPassword'
export default function () {
    const configUnlockPassword = ref()
    const isShow = ref(false)
    const close = () => isShow.value = false

    const {success, error} = useMessage()
    const reloadConfigUnlockPassword = () => {
        const config = fetchConfig()
        const existedConfigUnlockPassword = config[configUnlockPasswordKey]
        if (!!existedConfigUnlockPassword) {
            configUnlockPassword.value = aesDecrypt(existedConfigUnlockPassword)
        }
    }
    const updateConfigUnlockPassword = () => {
        const config = fetchConfig()
        const passwordItemList = fetchPasswordItemList()

        let newConfigUnlockPassword = configUnlockPassword.value
        let oldConfigUnlockPassword = config[configUnlockPasswordKey]

        if (!!oldConfigUnlockPassword) {
            oldConfigUnlockPassword = aesDecrypt(oldConfigUnlockPassword)
        }

        if (oldConfigUnlockPassword !== newConfigUnlockPassword) {
            if (!!newConfigUnlockPassword) {
                newConfigUnlockPassword = aesEncrypt(newConfigUnlockPassword)
            }
            config[configUnlockPasswordKey] = newConfigUnlockPassword
        }

        updateConfig(config) ? success('更新成功') : error('更新失败')
        updatePasswordItemList(passwordItemList)
        close()
    }

    return {
        isShow,
        close,
        configUnlockPassword,
        reloadConfigUnlockPassword,
        updateConfigUnlockPassword,
    }
}
