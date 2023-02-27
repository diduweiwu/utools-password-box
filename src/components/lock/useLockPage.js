import {ref} from "vue";
import {fetchConfig} from "/src/js/useConfig.js";
import {useMessage} from "naive-ui";
import {aesEncrypt} from "/src/components/content/usePasswordStorage.js";

export default function () {
    const isLocked = ref(false)
    const unlockPassword = ref()
    const {success, error, warning} = useMessage()
    const unlock = (userUnlockPassword) => {
        const {configUnlockPassword} = fetchConfig()
        if (!configUnlockPassword) {
            return true
        }
        if (!userUnlockPassword) {
            return warning('请输入解锁密码')
        }

        if (aesEncrypt(userUnlockPassword) === configUnlockPassword) {
            success('解锁成功')
            isLocked.value = false
            // 解锁完成后，将焦点切换到子输入框
            utools.subInputFocus()
        } else {
            error('解锁密码错误')
        }
    }

    const initIsLocked = () => {
        const {configUnlockPassword} = fetchConfig()
        unlockPassword.value = ''
        isLocked.value = !!configUnlockPassword
    }

    return {
        isLocked,
        initIsLocked,
        unlock,
        unlockPassword,
    }
}
