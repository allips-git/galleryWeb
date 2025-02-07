import { defineStore } from 'pinia';
import { getAxiosData } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface ProductList {
    itemCd      : string;
    itemNm      : string;
    cnt         : number;
    texture     : item.texture,
    rate        : item.rate,
    etc         : item.etc,
    prodChar    : item.prodChar,
    filePath    : string;
}

interface List {
    gkGb        : string;
    gkNm        : string;
    productList : ProductList[];
}

interface State {
    search  : string;
    itemGb  : B | C;
    list    : List[];
    blind   : List[];
    curtain : List[];
}

export const useMainStore = defineStore('main', {
    state: (): State => ({
        search  : '',
        itemGb  : 'B',
        list    : [],
        blind   : [],
        curtain : []
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
                                texture     : item.texture,
                                rate        : item.rate,
                                etc         : item.etc,
                                prodChar    : item.prodChar,
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
        },
        async getItemData()
        {
            const loginStore    = useLoginStore();
            const params        = {
                code    : loginStore['code'],
                itemGb  : this.itemGb
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getItemGbList`, params);

                const list      = [];
                console.log(res);

                res.data.map(item => {
                    list.push({
                        gkCd        : item.gkCd,
                        gkNm        : item.gkNm,
                        texture     : item.texture,
                        rate        : item.rate,
                        etc         : item.etc,
                        prodChar    : item.prodChar,
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

                if(this.itemGb === 'B')
                {
                    this.blind = list;
                }
                else
                {
                    this.curtain = list;
                }
            }
            catch(e)
            {
                console.log(e);
            }
        },
        setItemGb(itemGb: B | C)
        {
            this.itemGb = itemGb;
        }
    }
});