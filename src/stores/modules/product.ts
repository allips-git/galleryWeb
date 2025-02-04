import { defineStore } from 'pinia';
import { getAxiosData, getTokenOut } from '@/assets/js/function';
import { useLoginStore } from '@/stores';

interface List {
    num         : number;
    itemCd      : string;
    itemNm      : string;
    icCnt       : string;
    icList      : [{
        icCd    : string;
        icNm    : string;
    }]
}

interface ImgFile {
    newGb   : boolean;
    file    : null | file;
    url     : null | string;
    delYn   : Y | N;
}

interface IcList {
    icCd        : string;
    icNm        : string;
    repYn       : boolean;
    imgFile     : ImgFile[];
}

interface Info {
    itemCd      : string;   /** 제품코드 */
    itemNm      : string;   /** 제품명칭 */
    texture     : string;   /** 재질 */
    rate        : null | number;   /** 암막율 */
    etc         : string;   /** 기타 부속 */
    origin      : string;   /** 원재료 국가 */
    flame       : Y | N;    /** 방염가능여부 */
    prodChar    : string;   /** 제품특성 */
    itemGb      : string;   /** 제품구분(커튼 / 블라인드) */
    gkCd        : string;   /** 제품키워드 코드 */
    icList      : IcList[]; /** 제품색상 리스트 */
}

interface State {
    type    : I | U;   /** I: 등록, U: 수정 */
    search  : string;
    list    : List[];
    info    : Info;
    icCd    : string;
    more    : boolean;
    start   : number;
    limit   : number;
}

const getInfo = (): Info => {
    return {
        itemCd      : '',
        itemNm      : '',
        texture     : '',
        rate        : null,
        etc         : '',
        origin      : '',
        flame       : 'Y',
        prodChar    : '',
        itemGb      : 'C',
        gkCd        : 'GK0001',
        icList      : []
    }
}

const fileUrl = 'https://elasticbeanstalk-ap-northeast-2-627549176645.s3.ap-northeast-2.amazonaws.com/';

export const useProductStore = defineStore('product', {
    state: (): State => ({
        type    : 'I',
        search  : '',
        list    : [],
        info    : getInfo(),
        icCd    : '',
        more    : true,
        start   : 0,
        limit   : 20
    }),
    actions: {
        async getList()
        {
            const loginStore = useLoginStore();
            const params     = {
                faCd   : loginStore['code'],
                search : this.search,
                start  : this.start,
                limit  : this.limit
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getItemList`, params);
                const list      = [];

                console.log(res);

                res.data.map((item, index) => {
                    list.push({
                        num     : index + 1,
                        itemCd  : item.itemCd,
                        itemNm  : item.itemNm,
                        icCnt   : item.icList.length,
                        icList  : item.icList
                    });
                });

                this.list  = [...this.list, ...list];
                this.start = this.start + 20;

                if(res.data.length === 0)
                {
                    this.more = false;
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
        },
        async getInfo(gkCd: string, itemCd: string)
        {
            const params = {
                gkCd   : gkCd,
                itemCd : itemCd
            };

            console.log(params);

            try
            {
                const instance  = await getAxiosData();
                const res       = await instance.post(`https://gallery-data.plansys.kr/keyword/getInfo`, params);

                console.log(res);

                const info = {
                    itemCd      : itemCd,
                    itemNm      : '',
                    texture     : res.data['texture'],
                    rate        : res.data['rate'],
                    etc         : res.data['etc'],
                    origin      : res.data['origin'],
                    flame       : res.data['flame'],
                    prodChar    : res.data['prodChar'],
                    itemGb      : res.data['itemGb'],
                    gkCd        : gkCd,
                    icList      : res.data['list'].map(item => {
                        return {
                            icCd    : item.icCd,
                            icNm    : item.icNm,
                            repYn   : item.repYn === 'Y' ? true : false,
                            imgFile : item.files.map(file => {
                                return {
                                    fileSeq : file.fileSeq,
                                    newGb   : false,
                                    file    : null,
                                    url     : fileUrl+file.filePath,
                                    delYn   : 'N'
                                }
                            })
                        }
                    })
                };

                this.type = 'U';
                this.info = info;
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
                    alert('제품 정보 조회 중 오류가 발생하였습니다. 지속될 경우 관리자에게 문의하세요.');
                }
            }
        },
        setReset()
        {
            this.type = 'I';
            this.info = getInfo();
        },
        setIcCd(icCd: string)
        {
            this.icCd = icCd;
        },
        setRep()
        {
            this.info['icList'].map(item => item['repYn'] = false);

            const info    = this.info['icList'].find(item => item['icCd'] === this.icCd);
            info['repYn'] = true;
        },
        setProductInfo(itemCd: string)
        {
            const info = this.list.find(item => item.itemCd === itemCd);

            this.info.itemCd = info.itemCd;
            this.info.itemNm = info.itemNm;
            this.info.icList = info.icList.map((item, index) => {
                return {
                    icCd    : item.icCd,
                    icNm    : item.icNm,
                    repYn   : index === 0 ? true : false,
                    imgFile : []
                }
            });
        },
        setImage(icCd: string, index: number, file: file)
        {
            const info  = this.info['icList'].find(item => item['icCd'] === icCd);

            const image = info.imgFile[index];

            if(image)
            {
                image.newGb = true;
                image.file  = file;
                image.url   = null;
                image.delYn = 'N';
            }
            else
            {
                info['imgFile'].push({
                    fileSeq : info.imgFile.length + 1,
                    newGb   : true,
                    file    : file,
                    url     : null,
                    delYn   : 'N'
                });
            }

            console.log(this.info);
        },
        fileDelete(icCd: string, index: number)
        {
            const info  = this.info['icList'].find(item => item['icCd'] === icCd);
            const image = info['imgFile'][index];

            if(image['newGb'])
            {
                info['imgFile'].splice(index, 1);
            }
            else
            {
                image['delYn'] = 'Y';
            }
        },
        getListReset()
        {
            this.list  = [];
            this.start = 0;
        }
    }
});