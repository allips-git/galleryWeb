import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore, useStateStore } from '@/stores';

interface ProductList {
    itemCd      : string;
    itemNm      : string;
    cnt         : number;
    filePath    : string;
}

interface Info {
    gkGb        : string;
    gkNm        : string;
    productList : ProductList[];
}

interface State {
    search  : string;
    Info    : Info;
}

export const useDetailStore = defineStore('detail', {
    state: (): State => ({
        search  : '',
        info    : []
    }),
    actions: {
        async getData()
        {
            const stateStore    = useStateStore();
            const loginStore    = useLoginStore();
            const params        = {
                gkCd    : stateStore['gkCd'],
                code    : loginStore['code'],
                search  : this.search
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getAllFileList`, params);

                console.log(res);

                this.info = {
                    gkCd        : res.data.gkCd,
                    gkNm        : res.data.gkNm,
                    productList : res.data.icList.map(product => {
                        return {
                            itemCd      : product.itemCd,
                            itemNm      : product.itemNm,
                            cnt         : product.cnt,
                            filePath    : product.filePath
                        }
                    })
                }
            }
            catch(e)
            {
                console.log(e);
                if(e.response.status === 401)
                {
                    getTokenOut();
                }
                else
                {
                    alert('제품 리스트 조회 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        }
    }
});