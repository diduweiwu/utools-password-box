const crypto = require('crypto');
/**
 * 全局函数(preload种可以调用electron/node函数)
 */
window.md5 = (str) => crypto.createHash('md5').update(str).digest('hex')

window.encrypt = (plainText, key, outputEncoding = "base64") => {
    const cipher = crypto.createCipheriv("aes-128-ecb", key, null);
    return Buffer.concat([cipher.update(plainText), cipher.final()]).toString(outputEncoding);
}

window.decrypt = (cipherText, key, outputEncoding = "utf8") => {
    const cipher = crypto.createDecipheriv("aes-128-ecb", key, null);
    return Buffer.concat([cipher.update(Buffer.from(cipherText, "base64")), cipher.final()]).toString(outputEncoding);
}

window.copyContent = (content) => {
    const copyResult = utools.copyText(content)
    success(copyResult ? '复制成功,去粘贴吧~' : '复制失败:(,请重试或者联系作者')
    if (copyResult) {
        utools.hideMainWindow()
    }
}
