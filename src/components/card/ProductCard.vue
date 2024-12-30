<template>
    <div class="relative w-full group"
    >
      <img :src="item.image" :alt="item.alt" class="z-50 rounded-lg"
        :class="{ 'aspect-[3/4]': aspectRatio }"
        @mouseover="appearTooltip"

      />
      <div class="flex items-center justify-between mt-2">
        <p class=""
        >제품명</p>
        <button class="flex items-center justify-center size-6">
          <span class="pi pi-ellipsis-v !text-sm"></span>
        </button>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">컬러 12개</p>

              <!-- 툴팁 -->
              <transition name="fade">
                <div
                v-show="showTooltip"
                @mouseleave="hideTooltip"
                class="transition-all duration-300 w-[120%] h-auto bg-white rounded-lg shadow-md tooltip dark:bg-netblack"
                @click="productSetPopup = true"
            >
            <!-- :class="{'opacity-100  w-[120%] h-[120%] scale-150': showTooltip, 'opacity-0 w-full h-full': !showTooltip}" -->
                <img :src="item.image" :alt="item.alt" class="rounded-lg aspect-[16/9] object-cover" />

                <ul class="flex flex-col gap-2 p-4">
                    <li><h2 class="text-xl font-bold">제품명 입니다아</h2></li>
                    <li v-for="(detail, index) in productDetails" :key="index" class="flex justify-between text-sm">
                        <p class="text-gray-600 dark:text-gray-300">{{ detail.label }}</p>
                        <p class="font-bold" :class="{ 'text-blue-500 font-bold': detail.label === '암막율' || detail.label === '기타 부속' }">{{ detail.value }}</p>
                    </li>
                </ul>
                <div class="p-4 border-t border-gray-300 border-dashed">
                    <p class="mb-1 text-sm font-bold text-gray-600 dark:text-gray-300">제품특성</p>
                    <p class="text-sm">- 폴리 린넨 혼합 제품, 방염 가능</p>
                </div>
            </div>
        </transition>
    </div>
    <Dialog v-model:visible="productSetPopup" modal :dismissableMask="true" :style="{ width: 'calc(100% - 16px)', minWidth:'300px', maxWidth:'700px' }" class="custom-dialog-center">
        <template #header>
            <div class="inline-flex items-center justify-center gap-2">
                <span class="text-sm font-bold whitespace-nowrap ">제품 선택</span>
            </div>
        </template>
        <productSetPop/>
    </Dialog>
  </template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import Dialog from 'primevue/dialog';
import productSetPop from '@/views/include/productSet.vue'


const showTooltip = ref(false)

const hideTooltip = () => {
    setTimeout(() => {
        showTooltip.value = false; // 약간의 지연 후 툴팁 숨김
    }, 100); // 100ms 후에 툴팁 숨김
};

const appearTooltip = () => {
    setTimeout(() => {
        showTooltip.value = true; // 약간의 지연 후 툴팁 숨김
    }, 100); // 100ms 후에 툴팁 숨김
};

const props = defineProps({
item: {
    type: Object,
    required: true
},
aspectRatio: {
    type: Boolean,
    required: true
}
});

const productSetPopup = ref(false);

const productDetails = ref([
  { label: 'code.No', value: '202104041085100' },
  { label: '재질', value: '폴리 80% / 린넨 20%' },
  { label: '암막율', value: '68%' },
  { label: '기타 부속', value: '아노다이징 알루미늄' },
  { label: '재질', value: '한국' },
]);




</script>

<style scoped>
.tooltip {
position: absolute; /* 툴팁 위치 설정 */
border-radius: 0.25rem; /* 테두리 둥글게 */
z-index: 10; /* 다른 요소 위에 표시 */
white-space: nowrap; /* 텍스트 줄바꿈 방지 */
top: 50%;
left: 50%;
transform: translateX(-50%) translateY(-50%);
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s, visibility 0.2s; /* 애니메이션 효과 */
}
.fade-enter, .fade-leave-to {
    opacity: 0; /* 초기 및 종료 상태 */
    visibility: hidden; /* 숨김 상태로 변경 */
}
.fade-leave-active {
    visibility: visible; /* 떠나는 동안은 보이도록 설정 */
}
</style>
