<template>
    <div class="custom-datatable">
        <DataTable
            v-model:filters="filters"
            :value="dummyItems"
            stripedRows
            removableSort
            dataKey="itemCd"
            filterDisplay="row"
            selectionMode="single"
        >
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex self-center justify-start w-full">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="제품명을 검색해주세요" v-model="product['search']" @keyup.enter="product.getList()"/>
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

            <Column field="itemGbNm" header="품목구분" sortable class="custom-table-column-min-w">
                <template #body="{ data }">
                    {{ data.itemGbNm }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                </template>
            </Column>

            <Column field="prodGbNm" header="생산 구분" sortable class="custom-table-column-min-w">
                <template #body="{ data }">
                    {{ data.prodGbNm }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText size="small" v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="검색" />
                </template>
            </Column>

            <Column field="saleUnit" header="단가" sortable class="custom-table-column-min-w">
                <template #body="{ data }">
                    {{ data.saleUnit }}원
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
import { useProductStore } from '@/stores';

const product = useProductStore();
const filters = ref({
    num         : { value: null, matchMode: FilterMatchMode.EQUALS },
    itemCd      : { value: null },
    itemNm      : { value: null, matchMode: FilterMatchMode.CONTAINS },
    itemGbNm    : { value: null, matchMode: FilterMatchMode.CONTAINS },
    prodGbNm    : { value: null, matchMode: FilterMatchMode.CONTAINS },
    saleUnit    : { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// 더미 데이터 정의
const dummyItems = ref([
    { num: 1, itemCd: 'A001', itemNm: '제품 A', itemGbNm: '타입 A', prodGbNm: '분류 A', saleUnit: 10000 },
    { num: 2, itemCd: 'A002', itemNm: '제품 B', itemGbNm: '타입 B', prodGbNm: '분류 B', saleUnit: 20000 },
    { num: 3, itemCd: 'A003', itemNm: '제품 C', itemGbNm: '타입 C', prodGbNm: '분류 C', saleUnit: 30000 },
    { num: 4, itemCd: 'A004', itemNm: '제품 D', itemGbNm: '타입 D', prodGbNm: '분류 D', saleUnit: 40000 },
]);

const getListClick = (itemCd: string, itemNm: string, event: Event) => {
    const list = dummyItems.value.find(item => item.itemCd === itemCd); // 더미 데이터에서 찾기
    if (list) {
        // 필요한 작업 수행
    }
}

onMounted(async () => {
    await product.getList();
});
</script>
