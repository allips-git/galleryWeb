<template>
  <div class="flex flex-col gap-16 px-16 py-10">
    <section>
      <div class="flex items-center gap-5 mb-5">
        <h1 class="text-2xl font-bold">블라인드</h1>
        <Button label="모두보기" icon="pi pi-arrow-up-right" size="small" @click="goToBlind" severity="contrast"/>
      </div>

      <div class="flex gap-2">
        <div class="w-[calc(12.5%-0.5rem)]" v-for="(item, index) in slides" :key="index">
          <ProductCard :aspectRatio="true" :item="item" />
        </div>
      </div>

    </section>

    <section>
      <div class="flex items-center gap-5 mb-5">
        <h1 class="text-2xl font-bold">커튼</h1>
        <Button label="모두보기" icon="pi pi-arrow-up-right" size="small" @click="goToCurtain" severity="contrast"/>
      </div>

      <div class="flex gap-2">
        <div class="w-[calc(12.5%-0.5rem)]" v-for="(item, index) in slides2" :key="index">
          <ProductCard :aspectRatio="true" :item="item" />
        </div>
      </div>
    </section>
    <div class="fiex-add-btn">
        <Button label="신규 등록" size="large" icon="pi pi-plus" class="shadow-lg" @click="productSetPopup = true" severity="contrast"/>
        <Dialog v-model:visible="productSetPopup" modal :dismissableMask="true" :style="{ width: 'calc(100% - 16px)', minWidth:'300px', maxWidth:'700px' }" class="custom-dialog-center">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="text-sm font-bold whitespace-nowrap ">제품 선택</span>
            </div>
        </template>
        <productSetPop/>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/card/ProductCard.vue';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import productSetPop from '@/views/include/productSet.vue'

const productSetPopup = ref(false);


const slides = ref([
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_06.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_07.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_08.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_08.png', alt: 'Slide 1' },
]);


const slides2 = ref([
    { image: '/src/assets/imgs/test_09.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_10.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_11.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_13.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_13.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_07.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
]);

const router = useRouter(); // 라우터 인스턴스 가져오기

const goToCurtain = () => {
  router.push('/curtain'); // 경로 이동
};

const goToBlind = () => {
  router.push('/blind'); // 경로 이동
};

</script>

<style>

</style>
