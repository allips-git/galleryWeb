import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore, useStateStore } from '@/stores';

interface List {
    num         : number;
    itemCd      : string;
    itemNm      : string;
    itemGb      : string;
    prodNm      : string;
    amt         : number;
}

interface IcList {
    icCd        : string;
    icNm        : string;
    file        : file | string;
}

interface Info {
    itemCd      : string;   /** 제품코드 */
    itemNm      : string;   /** 제품명칭 */
    texture     : string;   /** 재질 */
    rate        : number;   /** 암막율 */
    etc         : string;   /** 기타 부속 */
    origin      : string;   /** 원재료 국가 */
    flame       : Y | N;    /** 방염가능여부 */
    prodChar    : string;   /** 제품특성 */
    itemGb      : string;   /** 제품구분(커튼 / 블라인드) */
    gkCd        : string;   /** 제품키워드 코드 */
    icList      : IcList[]; /** 제품색상 리스트 */
}

interface State {
    search  : string,
    list    : List[],
    info    : Info
}

const getInfo = (): Info => {
    return {
        itemCd      : '',
        itemNm      : '',
        texture     : '',
        rate        : 0,
        etc         : '',
        origin      : '',
        flame       : 'N',
        prodChar    : '',
        itemGb      : '',
        gkCd        : '',
        icList      : []
    }
}

export const useProductStore = defineStore('product', {
    state: (): State => ({
        search  : '',
        list    : [],
        info    : getInfo(),
        start   : 0,
        limit   : 20
    }),
    actions: {
        async getList()
        {
            const loginStore = useLoginStore();
            const params     = {
                faCd   : loginStore['faCd'],
                search : this.search,
                start  : this.start,
                limit  : this.limit
            };

            try
            {
                console.log(params);
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
        },
        async getInfo()
        {
            console.log('info');
        },
        async getDetail()
        {
            console.log('detail');
        }
    }
});