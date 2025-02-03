<template>
    <div class="flex flex-col gap-16 px-16 py-10">
        <section v-for="(item, index) in main['list']" :key="index">
            <div class="flex items-center gap-5 mb-5">
                <h1 class="text-2xl font-bold">{{ item['gkNm'] }}</h1>
                <Button label="모두보기" icon="pi pi-arrow-up-right" size="small" @click="getMove(item['gkCd'])" severity="contrast"/>
            </div>

            <div class="flex gap-2">
                <div class="w-[calc(12.5%-0.5rem)]" v-for="(product, pIndex) in item['productList']" :key="pIndex">
                    <ProductCard :aspectRatio="true" :item="product" />
                </div>
            </div>
        </section>
        <div class="fiex-add-btn">
            <Button label="신규 등록" size="large" icon="pi pi-plus" class="shadow-lg" @click="popup.getOpen('productSet')" severity="contrast"/>
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
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useStateStore, usePopupStore, useMainStore } from '@/stores';

const router    = useRouter();
const state     = useStateStore();
const popup     = usePopupStore();
const main      = useMainStore();

const getMove = async (gkCd: string) => {
    await state.setGkCd(gkCd);
    router.push('/detail');
};

onMounted(() => {
    main.getData();
});

</script>

<style>

</style>
