<template>
    <div class="pb-20">
      <section class="px-5">
        <div class="flex items-center justify-between">
            <h1 class="py-3 text-2xl font-bold">제품명</h1>
            <Button icon="pi pi-ellipsis-v" size="large" text plain severity="contrast"/>
            <Popover class="custom-popover-listbox" ref="morePopover" dismissable>
                <ul class="w-[150px]">
                    <li class="w-full px-3 py-2 text-red-500 hover:bg-red-50">제품 삭제</li>
                </ul>
            </Popover>
        </div>

        <ul class="flex flex-col gap-4">
            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">code No</p>
                <IconField class="w-full max-w-96" @click="popup.getOpen('productList')">
                    <InputIcon class="pi pi-search" />
                    <InputText :value="product['info']['itemCd']" placeholder="제품 찾기" class="w-full" readonly/>
                </IconField>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">재질</p>
                <InputText v-model="product['info']['texture']" placeholder="재질을 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">암막율</p>
                <InputNumber v-model="product['info']['rate']" max="100" placeholder="암막율을 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">기타 부속</p>
                <InputText v-model="product['info']['etc']" placeholder="예) 알리미늄 풀커버" class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">원재료 국가</p>
                <InputText v-model="product['info']['origin']" placeholder="원재료 국가를 입력해주세요." class="w-full max-w-96"/>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">방염가능여부</p>
                <Select :options="data['flame']" v-model="product['info']['flame']" optionLabel="name" optionValue="value" placeholder="선택" class="w-full max-w-96"/>
            </li>

            <li class="flex items-start custom-input-border-b ">
                <p class="w-[120px]">제품 특성</p>
                <div class="w-full max-w-96">
                  <Textarea v-model="product['info']['prodChar']" rows="3" maxlength="200" cols="30" auto-resize class="w-full max-w-96" placeholder="제품의 특성을 설명해주세요." />
                  <span class="block w-full text-sm text-right">{{ product['info']['prodChar'].length }}/200</span>
                </div>
            </li>

            <li class="flex items-center custom-input-border-b ">
                <p class="w-[120px]">제품 키워드</p>
                <div class="flex w-full gap-5 max-w-96">
                    <div class="flex items-center gap-2">
                      <RadioButton inputId="curtain" v-model="product['info']['itemGb']" :value="'C'"/>
                      <label for="curtain">커튼</label>
                    </div>

                    <div class="flex items-center gap-2">
                        <RadioButton inputId="blind" v-model="product['info']['itemGb']" :value="'B'"/>
                        <label for="blind">블라인드</label>
                    </div>
                    <Select :options="data['keyword']" v-model="product['info']['gkCd']" optionLabel="name" optionValue="value" placeholder="키워드 선택" />
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
                <section v-for="(item, mIndex) in product['info']['icList']" :key="mIndex" class="mt-10 first:mt-0">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center w-full gap-4 custom-input-border-b">
                            <p class="whitespace-nowrap">색상이름</p>
                            <InputText :value="item['icNm']" readonly class="w-full max-w-96"/>
                        </div>
                        <div v-if="item['repYn']" class="flex items-center justify-center gap-1 px-3 py-0.5 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-800 border border-gray-200 rounded-full">
                            <div class="rounded-full size-3 bg-sky-500"></div>
                            <p class="whitespace-nowrap">대표사진</p>
                        </div>
                        <Button icon="pi pi-ellipsis-v" size="large" text plain @click="(e) => getToggle(e, item['icCd'])"/>
                    </div>
                    <ul class="flex justify-between w-full gap-2 mt-4">
                        <li v-for="(_, index) in Array(4)" :key="index"
                            class="relative flex items-center justify-center  w-[calc(25%-0.5rem)] overflow-hidden bg-gray-100 rounded-lg aspect-square">
                            <div v-if="getImageCheck(item['icCd'], index)" class="flex flex-col items-center justify-center gap-2" @click="getFileBtn(item['icCd'], index)">
                                <div class="flex items-center justify-center bg-gray-300 rounded-full size-10">
                                    <span class="pi pi-plus !text-lg"></span>
                                </div>
                                <span class="">사진 추가</span>
                            </div>
                            <div v-else class="absolute inset-0">
                                <img :src="getImage(item['icCd'], index)" :alt="item.text" class="w-full h-full aspect-square" @click="getFileBtn(item['icCd'], index)"/>
                                <div class="absolute right-2 top-2  !border-0 !text-gray-600 rounded-full size-8 bg-gray-900 bg-opacity-10">
                                    <Button type="button" size="small" icon="pi pi-times" rounded text severity="danger" class="!w-full !h-full" @click="product.fileDelete(item['icCd'], index)"/>
                                </div>
                            </div>
                            <input type="file" :ref="el => imgFile[`${item.icCd}-${index}`] = el" style="display:none" accept="image/*" @change="(event) => getFile(event, item['icCd'], index)"/>
                        </li>
                    </ul>
                </section>
                <Popover class="custom-popover-listbox" ref="morePopover" dismissable>
                    <ul class="w-[150px]">
                        <li class="w-full px-3 py-2 font-bold text-sky-500 hover:bg-gray-50" @click="getRep">대표사진 등록</li>
                    </ul>
                </Popover>
            </div>
        </section>
        <div class="absolute bottom-0 flex justify-end w-full gap-2 px-5 py-2 bg-white border-t border-gray-100 dark:border-gray-800 dark:bg-netblack">
            <Button label="취소하기" :disabled="status" severity="secondary"/>
            <Button label="저장하기" :disabled="status" severity="contrast" @click="getProductSave"/>
        </div>
    </div>
    <Dialog
    v-model:visible="popup['pop']['productList']"
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
import InputNumber from 'primevue/inputnumber';
import RadioButton from 'primevue/radiobutton';
import Popover from 'primevue/popover';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Textarea from 'primevue/textarea';
import codeViewTable from '@/views/include/codeViewTable.vue';
import { ref } from 'vue';
import { useDataStore, usePopupStore, useLoginStore, useMainStore, useProductStore } from '@/stores';
import { getAxiosData, getFileCheck } from '@/assets/js/function';

const data      = useDataStore();
const popup     = usePopupStore();
const login     = useLoginStore();
const main      = useMainStore();
const product   = useProductStore();
const status    = ref(false);
const imgFile   = ref<Record<string, HTMLInputElement | null>>({});

const morePopover       = ref();
const getToggle = (event: Event, icCd: string) => {
    morePopover.value.toggle(event);
    product.setIcCd(icCd);
};

const getImageCheck = (icCd: string, index: number) => {
    const info = product['info']['icList'].find(item => item['icCd'] === icCd);

    if(info)
    {
        const fileInfo = info['imgFile'][index];

        if(fileInfo)
        {
            if(fileInfo['newGb'])
            {
                if(fileInfo['file'])
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                if(fileInfo['url'] && fileInfo['delYn'] === 'N')
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
        else
        {
            return true;
        }
    }
    else
    {
        return true;
    }
}

const getFileBtn = (icCd: string, index: number) => {
    const key = `${icCd}-${index}`;
    if (imgFile.value[key]) 
    {
        imgFile.value[key]?.click();
    }
};

const getFile = (event: Event, icCd: string, index: number) => {
    const target    = event.target as HTMLInputElement;
    const file      = target.files[0];
    const fileCheck = getFileCheck(file, 10);

    if(!fileCheck['stat'])
    {
        alert(fileCheck['msg']);
        return false;
    }

    if(file)
    {
        const reader = new FileReader();
        reader.onload = () => {
            product.setImage(icCd, index, file);
        };

        reader.readAsDataURL(file);
    }
}

const getImage = (icCd: string, index: number) => {
    const info = product['info']['icList'].find(item => item['icCd'] === icCd);

    if(info)
    {
        const fileInfo = info['imgFile'][index];

        if(fileInfo['newGb'])
        {
            return URL.createObjectURL(fileInfo['file']);
        }
        else
        {
            return fileInfo['url'];
        }
    }
}

const getRep = () => {
    product.setRep();
    morePopover.value.hide();
}

const getProductSave = async () => {
    const formData  = new FormData();
    const data      = {
        code    : login['code'],
        itemCd  : product['info']['itemCd'],
        texture : product['info']['texture'],
        rate    : product['info']['rate'],
        etc     : product['info']['etc'],
        origin  : product['info']['origin'],
        flame   : product['info']['flame'],
        prodChar: product['info']['prodChar'],
        itemGb  : product['info']['itemGb'],
        gkCd    : product['info']['gkCd'],
        userCd  : login['userCd']
    };

    const params    = product.type === 'U' ? { glCd : product['info']['glCd'], ...data } : data;

    params['details'] = product['info']['icList'].map(item => {
        return {
            icCd    : item['icCd'],
            repYn   : item['repYn'] ? 'Y' : 'N',
            files   : item['imgFile'].filter(file => file.newGb || file.delYn === 'Y').map(file => {
                const fileData = {
                    fileSeq : file.fileSeq,
                };

                if (product.type === 'U') 
                {
                    fileData['delYn'] = file.delYn || 'N';
                }
                
                return fileData;
            })
        };
    });

    formData.append('request', new Blob([JSON.stringify(params)], {
        type: 'application/json'
    }));

    product['info']['icList'].forEach(item => {
        item['imgFile'].forEach(file => {
            if(file.newGb)
            {
                formData.append('files', file.file);
            }
        });
    });

    let url = 'https://gallery-data.plansys.kr/keyword/insertData';

    if(product.type === 'U')
    {
        url = 'https://gallery-data.plansys.kr/keyword/updateData';
    }

    console.log(JSON.stringify(params, null, 2));

    status.value = true;

    try
    {
        const instance = await getAxiosData();
        await instance.put(url, formData);
        await main.getData();
        alert('제품 등록 및 수정이 완료되었습니다.');
        popup.getClose('productSet');
    }
    catch(e)
    {
        alert('제품 등록 및 수정에 실패하였습니다. 지속될 경우 관리자에게 문의하세요.');
        console.log(e);
    }

    status.value = false;
}

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
