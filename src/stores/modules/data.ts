import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => {
        return {
            flame   : [
                { name  : '가능', value : 'Y' },
                { name  : '불가능', value : 'N' }
            ],
            itemGb  : [
                { name  : '블라인드', value : 'Y' },
                { name  : '커튼', value : 'N' }
            ],
            keyword : [
                { itemGb : 'B', name  : '롤스크린', value : 'GK0001' },
                { itemGb : 'B',name  : '콤비 블라인드', value : 'GK0002' },
                { itemGb : 'B',name  : '트리플 쉐도우', value : 'GK0003' },
                { itemGb : 'B',name  : '우드 블라인드', value : 'GK0004' },
                { itemGb : 'B',name  : '레이저 블라인드', value : 'GK0005' },
                { itemGb : 'B',name  : '유니슬랫', value : 'GK0006' },
                { itemGb : 'B',name  : '버티컬', value : 'GK0007' },
                { itemGb : 'C',name  : '린넨 커튼', value : 'GK0008' },
                { itemGb : 'C',name  : '암막 커튼', value : 'GK0009' },
                { itemGb : 'C',name  : '기타 커튼', value : 'GK0010' }
            ]
        };
    },
});
