import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {
    create,
    NButton,
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NEllipsis,
    NEmpty,
    NForm,
    NFormItem,
    NIcon,
    NInput,
    NLayout,
    NLayoutHeader,
    NList,
    NListItem,
    NMessageProvider,
    NPopconfirm,
    NRadio,
    NRadioGroup,
    NResult,
    NSpace,
    NTag,
    NText,
} from 'naive-ui'

const naive = create({
    components: [
        NButton,
        NLayout,
        NLayoutHeader,
        NMessageProvider,
        NDrawer,
        NDrawerContent,
        NForm,
        NFormItem,
        NInput,
        NPopconfirm,
        NEllipsis,
        NRadio,
        NRadioGroup,
        NResult,
        NSpace,
        NList,
        NListItem,
        NTag,
        NText,
        NEmpty,
        NIcon,
        NConfigProvider,
    ]
})
createApp(App).use(naive).mount('#app')
