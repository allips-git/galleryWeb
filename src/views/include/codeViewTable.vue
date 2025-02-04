<template>
    <div class="custom-datatable">
        <DataTable
            v-model:filters="filters"
            :value="product['list']"
            stripedRows
            removableSort
            dataKey="itemCd"
            filterDisplay="row"
            selectionMode="single"
            @row-click="(event) => getListClick(event.data.itemCd)"
            ref="dataTable"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex self-center justify-start w-full">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="제품명을 검색해주세요" v-model="product['search']" @keyup.enter="getList"/>
                        </IconField>
                    </div>
                </div>
            </template>
            <template #empty>
                <p class="empty-data">제품이 없습니다.</p>
            </template>
            <!-- 테이블 바디 -->
            <Column field="num" header="순번" sortable class="custom-table-column-min-w no-column">
                <template #body="{ data }">
                    {{ data.num }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                </template>
            </Column>

            <Column field="itemNm" header="제품명" sortable class="custom-table-column-min-w">
                <template #body="{ data }">
                    <div>
                        {{ data.itemNm }}
                    </div>
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                </template>
            </Column>

            <Column field="icCnt" header="색상 갯수" sortable class="custom-table-column-min-w">
                <template #body="{ data }">
                    {{ data.icCnt }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import IconField from 'primevue/iconfield';
import InputText from 'primevue/inputtext';
import InputIcon from 'primevue/inputicon';
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { usePopupStore, useProductStore } from '@/stores';

const popup     = usePopupStore();
const product   = useProductStore();
const dataTable = ref(null);
const filters   = ref({
    num         : { value: null, matchMode: FilterMatchMode.EQUALS },
    itemCd      : { value: null },
    itemNm      : { value: null, matchMode: FilterMatchMode.CONTAINS },
    icCnt       : { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const getListClick = async (itemCd: string) => {
    await product.setProductInfo(itemCd);
    await popup.getClose('productList');
}

const getList = async () => {
    await product.getListReset();
    await product.getList();
}

const getScroll = async (event: Event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target as HTMLElement;

    if (scrollTop + clientHeight >= scrollHeight) 
    {
        if(product['more'])
        {
            await product.getList();
        }
    }
}

onMounted(async () => {
    await getList();
    dataTable.value.$el.children[1].addEventListener("scroll", getScroll);
});
</script>
