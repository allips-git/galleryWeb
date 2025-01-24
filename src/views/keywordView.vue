<template>
    <div class="flex flex-col gap-16 px-16 py-10 pb-16">
        <section>
            <div class="flex items-center gap-5 mb-5">
                <h1 class="text-2xl font-bold">{{ detail['info']['gkNm'] }}</h1>
            </div>
            <div class="grid grid-cols-8 gap-2 gap-y-10">
                <div class="w-full" v-for="(item, index) in detail['info']['productList']" :key="index">
                    <ProductCard :aspectRatio="true" :item="item" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/card/ProductCard.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDetailStore } from '@/stores';

const router = useRouter();
const detail = useDetailStore();

onMounted(() => {
    detail.getData();
});
</script>

<style>
</style>