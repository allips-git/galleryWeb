<template>
    <div class="relative w-full group">
        <img :src="getImage()" class="z-50 rounded-lg" :class="{ 'aspect-[3/4]': aspectRatio }" @mouseover="appearTooltip"/>
        <div class="flex items-center justify-between mt-2">
            <p class="">{{ item['itemNm'] }}</p>
            <button class="flex items-center justify-center size-6">
                <span class="pi pi-ellipsis-v !text-sm"></span>
            </button>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">컬러 {{ item['cnt'] }}개</p>

        <!-- 툴팁 -->
        <transition name="fade">
            <div v-show="showTooltip" @mouseleave="hideTooltip"
                class="transition-all duration-300 w-[120%] h-auto bg-white rounded-lg shadow-md tooltip dark:bg-netblack" @click="getInfo">
                <!-- :class="{'opacity-100  w-[120%] h-[120%] scale-150': showTooltip, 'opacity-0 w-full h-full': !showTooltip}" -->
                <img :src="getImage()" :alt="item.alt" class="rounded-lg aspect-[16/9] object-cover" />

                <ul class="flex flex-col gap-2 p-4">
                    <li><h2 class="text-xl font-bold">{{ item['itemNm'] }}</h2></li>
                    <li class="flex justify-between text-sm">
                        <p class="text-gray-600 dark:text-gray-300">code.No</p>
                        <p class="font-bold">{{ item['itemCd'] }}</p>
                    </li>
                    <li class="flex justify-between text-sm">
                        <p class="text-gray-600 dark:text-gray-300">재질</p>
                        <p class="font-bold">{{ item['texture'] }}</p>
                    </li>
                    <li class="flex justify-between text-sm">
                        <p class="text-gray-600 dark:text-gray-300">암막율</p>
                        <p class="font-bold text-blue-500 font-bold">{{ item['rate'] }}%</p>
                    </li>
                    <li class="flex justify-between text-sm">
                        <p class="text-gray-600 dark:text-gray-300">기타 부속</p>
                        <p class="font-bold text-blue-500 font-bold">{{ item['etc'] }}</p>
                    </li>
                </ul>
                <div class="p-4 border-t border-gray-300 border-dashed">
                    <p class="mb-1 text-sm font-bold text-gray-600 dark:text-gray-300">제품특성</p>
                    <p class="text-sm">- {{ item['prodChar'] }}</p>
                </div>
            </div>
        </transition>
    </div>
  </template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import { usePopupStore, useProductStore } from '@/stores';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    gkCd: {
        type: String,
        required: true
    },
    aspectRatio: {
        type: Boolean,
        required: true
    }
});

const popup     = usePopupStore();
const product   = useProductStore();

const showTooltip = ref(false)

const hideTooltip = () => {
    showTooltip.value = false; // 약간의 지연 후 툴팁 숨김
};

const appearTooltip = () => {
    showTooltip.value = true; // 약간의 지연 후 툴팁 숨김
};

const getImage = () => {
    return `https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/${props.item['filePath']}`;
}

const getInfo = async () => {
    await popup.getOpen('productSet');
    await product.getInfo(props['gkCd'], props.item['itemCd']);
}
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
