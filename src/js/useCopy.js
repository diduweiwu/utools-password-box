import {useMessage} from "naive-ui";

export default function () {
    const {success, warning} = useMessage()
    const copyContent = (content) => {
        if (!content) {
            return warning('复制的内容是空的哦~')
        }
        const copyResult = utools.copyText(content)
        success(copyResult ? '复制成功,去粘贴吧~' : '复制失败:(,请重试或者联系作者')
        if (copyResult) {
            utools.hideMainWindow()
        }
    }

    return {
        copyContent,
    }
}
