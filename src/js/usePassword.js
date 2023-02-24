import generator from "secure-random-password";

/**
 * 生成随机密码
 * @returns {string}
 */
export function genPassword() {
    return generator.randomString({length: 20, numbers: true})
}
