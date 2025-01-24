import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface ProductList {
    itemCd      : string;
    itemNm      : string;
    cnt         : number;
    filePath    : string;
}

interface List {
    gkGb        : string;
    gkNm        : string;
    productList : ProductList[];
}

interface State {
    search  : string;
    list    : List[];
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        search  : '',
        list    : []
    }),
    actions: {
        async getData()
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                search  : this.search
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getFileList`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    list.push({
                        gkCd        : item.gkCd,
                        gkNm        : item.gkNm,
                        productList : item.icList.map(product => {
                            return {
                                itemCd      : product.itemCd,
                                itemNm      : product.itemNm,
                                cnt         : product.cnt,
                                filePath    : product.filePath
                            }
                        })
                    });
                });

                this.list = list;
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
});