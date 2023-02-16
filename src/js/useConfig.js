const configKey = 'config'

/**
 * 获取配置信息
 * @returns {*|{}}
 */
export const fetchConfig = () => {
    return utools.dbStorage.getItem(configKey) || {}
}

/**
 * 更新配置信息
 * @param config
 * @returns {boolean}
 */
export const updateConfig = (config) => {
    if (!config) {
        return false
    }
    utools.dbStorage.setItem(configKey, config)
    return true
}


