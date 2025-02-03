import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import type { App } from 'vue';

// import { useDataStore } from './modules/data';
// import { usePopupStore } from './modules/popup';
import { useLoginStore } from './modules/login';
import { useStateStore } from './modules/state';
import { usePopupStore } from './modules/popup';
import { useMainStore } from './modules/main';
import { useDetailStore } from './modules/detail';
import { useProductStore } from './modules/product';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export function setupStore(app: App) {
    app.use(pinia);
}

export {
    pinia,
    useLoginStore,
    useStateStore,
    usePopupStore,
    useMainStore,
    useDetailStore,
    useProductStore
};