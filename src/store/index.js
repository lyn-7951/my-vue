import {createPinia} from "pinia";
import TIMPlugin from '@/store/plugin/TIM-plugin'
import {mSocketIoPlugin} from '@/store/plugin/mSocketIo-plugin'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(TIMPlugin)
pinia.use(mSocketIoPlugin)
pinia.use(piniaPluginPersistedstate)

export default pinia
