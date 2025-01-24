<template>
    <div class="pb-20">
      <section class="px-5">
        <div class="flex items-center justify-between">
            <h1 class="py-3 text-2xl font-bold">제품명</h1>
            <Button icon="pi pi-ellipsis-v" size="large" text  plain @click="togglemorePopover" severity="contrast"/>
            <Popover class="custom-popover-listbox" ref="morePopover" dismissable>
                <ul class="w-[150px]">
                    <li class="w-full px-3 py-2 text-red-500 hover:bg-red-50">제품 삭제</li>
                </ul>
            </Popover>
        </div>

        <ul class="flex flex-col gap-4">
            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">code No</p>
                <IconField class="w-full max-w-96" @click="codeTablePopup = true">
                    <InputIcon class="pi pi-search" />
                    <InputText placeholder="제품 찾기" class="w-full "/>
                </IconField>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">재질</p>
                <InputText placeholder="재질을 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">암막율</p>
                <InputText placeholder="암막율을 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">기타 부속</p>
                <InputText placeholder="예) 알리미늄 풀커버" class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">원재료 국가</p>
                <InputText placeholder="원재료 국가를 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">방염가능여부</p>
                <Select placeholder="선택" class="w-full max-w-96"/>
            </li>

            <li class="flex items-start custom-input-border-b ">
                <p class="w-[120px]">제품 특성</p>
                <div class="w-full max-w-96">
                  <Textarea  rows="3" cols="30" auto-resize class="w-full max-w-96" placeholder="제품의 특성을 설명해주세요." />
                  <span class="block w-full text-sm text-right">0/200</span>
                </div>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">제품 키워드</p>
                <div class="flex w-full gap-5 max-w-96">
                    <div class="flex items-center gap-2">
                      <Checkbox />
                      <label>커튼</label>
                    </div>

                    <div class="flex items-center gap-2">
                      <Checkbox />
                      <label>블라인드</label>
                    </div>
                    <Select placeholder="제품 찾기" class="flex-1 w-full"/>
                </div>
            </li>
        </ul>
        <div class="flex flex-col gap-1 p-4 mt-10 text-sm text-gray-600 rounded-lg dark:text-gray-400 bg-gray-50 dark:bg-zinc-950">
            <p>- 색상별 사진등록 최대 갯수는 4개입니다.</p>
            <p>- 색상별 대표 사진은 각 색상의 첫번째 이미지입니다</p>
            <p>- 제품의 대표 사진은 대표 사진으로 등록된 색상의 대표 사진으로 설정됩니다.</p>
            <p>- 최소 1개에서 최대 4개의 10MB 이하 이미지를 첨부해주세요.</p>
        </div>
      </section>
      <div class="gray-bar"></div>
      <section class="px-5">
            <h1 class="py-3 text-2xl font-bold">색상 설정</h1>
            <div>
                <!-- 색상 v-for -->
                <section class="mt-10 first:mt-0">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center w-full gap-4 custom-input-border-b">
                            <p class="whitespace-nowrap">색상이름</p>
                            <InputText placeholder="색상 이름" class="w-full max-w-96"/>
                        </div>
                        <div class="flex items-center justify-center gap-1 px-3 py-0.5 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-800 border border-gray-200 rounded-full">
                        <div class="rounded-full size-3 bg-sky-500"></div>
                        <p class="whitespace-nowrap">대표사진</p>
                    </div>
                    <Button icon="pi pi-ellipsis-v" size="large" text plain @click="togglemorePopover"/>
                    <Popover class="custom-popover-listbox" ref="morePopover" dismissable>
                        <ul class="w-[150px]">
                            <li class="w-full px-3 py-2 font-bold text-sky-500 hover:bg-gray-50">대표사진 등록</li>
                        </ul>
                    </Popover>
                    </div>

                    <ul class="flex justify-between w-full gap-2 mt-4">
                        <li v-for="(item, index) in items" :key="index"
                            class="relative flex items-center justify-center  w-[calc(25%-0.5rem)] overflow-hidden bg-gray-100 rounded-lg aspect-square">
                            <div class="flex flex-col items-center justify-center gap-2">
                                <div class="flex items-center justify-center bg-gray-300 rounded-full size-10">
                                    <span class="pi pi-plus !text-lg"></span>
                                </div>
                                <span class="">사진 추가</span>
                                <p>{{ item.text }}</p>
                            </div>
                            <div class="absolute inset-0">
                                <img :src="item.image" :alt="item.text" class="w-full h-full aspect-square" />

                                <div class="absolute right-2 top-2  !border-0 !text-gray-600 rounded-full size-8 bg-gray-900 bg-opacity-10">
                                    <Button size="small" icon="pi pi-times" rounded text severity="danger" class="!w-full !h-full"/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
        <div class="absolute bottom-0 flex justify-end w-full gap-2 px-5 py-2 bg-white border-t border-gray-100 dark:border-gray-800 dark:bg-netblack">
            <Button label="취소하기" severity="secondary" />
            <Button label="저장하기" severity="contrast"/>
        </div>
    </div>
    <Dialog
    v-model:visible="codeTablePopup"
    header="제품 선택하기"
    class="custom-dialog-center !max-w-[600px]"
    position="center"
    :modal="true"
    :draggable="false"
    :dismissableMask="true" >
        <codeViewTable/>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Popover from 'primevue/popover';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import codeViewTable from '@/views/include/codeViewTable.vue';

const codeTablePopup = ref(false)

const morePopover = ref()

const togglemorePopover = (event) => {
    morePopover.value.toggle(event);
}

const items = ref([
    { image: '/src/assets/imgs/test_02.png', alt: 'Slide 1' },
    { image: '/src/assets/imgs/test_03.png', alt: 'Slide 2' },
    { image: '/src/assets/imgs/test_04.png', alt: 'Slide 3' },
    { image: '/src/assets/imgs/test_05.png', alt: 'Slide 1' },
]);

const moreBtnList = ref([
    { name: '삭제' },
]);

</script>

<style lang="scss">
.custom-input-border-b{
    .p-inputtext, .p-select, .p-textarea{
        border: none;
        border-radius: 0px;
        border-bottom: 1px solid var(--p-inputtext-border-color);;
    }
}

</style>
