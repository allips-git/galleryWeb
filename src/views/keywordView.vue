<template>
    <div class="flex flex-col gap-16 px-16 py-10 pb-16">
        <section>
            <div class="flex items-center gap-5 mb-5">
                <h1 class="text-2xl font-bold">{{ detail['info']['gkNm'] }}</h1>
            </div>
            <div class="grid grid-cols-8 gap-2 gap-y-10">
                <div class="w-full" v-for="(item, index) in detail['info']['productList']" :key="index">
                    <ProductCard :aspectRatio="true" :item="item" :gkCd="state['gkCd']"/>
                </div>
            </div>
        </section>
        <div class="fiex-add-btn">
            <Button label="신규 등록" size="large" icon="pi pi-plus" class="shadow-lg" @click="getPopup" severity="contrast"/>
            <Dialog v-model:visible="popup['pop']['productSet']" modal :dismissableMask="true" :style="{ width: 'calc(100% - 16px)', minWidth:'300px', maxWidth:'700px' }" class="custom-dialog-center">
                <template #header>
                    <div class="inline-flex items-center justify-center gap-2">
                        <span class="text-sm font-bold whitespace-nowrap">제품 선택</span>
                    </div>
                </template>
                <productSetPop/>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import Dialog from 'primevue/dialog';
import productSetPop from '@/views/include/productSet.vue'
import { onMounted } from 'vue';
import { useStateStore, usePopupStore, useProductStore, useDetailStore } from '@/stores';

const state     = useStateStore();
const popup     = usePopupStore();
const detail    = useDetailStore();
const product   = useProductStore();

const getPopup = async () => {
    await popup.getOpen('productSet');
    await product.setReset();
}

onMounted(() => {
    detail.getData();
});
</script>

<style>
</style>