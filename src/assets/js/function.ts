import { useLoginStore } from '@/stores';
import router from '@/router';
import axios from 'axios';

/**
 * @description 파일 체크
 */
export const getFileCheck = (file: File, size: number): string | boolean => {
    if(!file)
    {
        return { stat : false, msg : '올바른 파일 형식이 아닙니다. jpg, png, pdf 형식만 가능합니다.' }
    }

    const allowedExtensions: string[] = ['.jpg', '.jpeg', '.png', '.pdf'];
    const fileExtension: string = file.name.toLowerCase().substr(file.name.lastIndexOf('.'));

    if (!allowedExtensions.includes(fileExtension)) 
    {
        return { stat : false, msg : '올바른 파일 형식이 아닙니다. jpg, png, pdf 형식만 가능합니다.' }
    }
  
    const maxSize: number = size * 1024 * 1024;

    if (file.size > maxSize) 
    {
        return { stat : false, msg : `파일 크기가 ${size}MB를 초과합니다.` };
    }
  
    return { stat : true, msg : '' };
}

/**
 * @description axios 통신
 */
export const getAxiosData = async () => {
    const loginStore = useLoginStore();

    const token: string | null          = loginStore.accessToekn;
    const refreshToken: string | null   = loginStore.refreshToken;

    const instance = axios.create({
        withCredentials : true,
        headers         : {
            'Authorization': 'Bearer ' + token,
            'Refresh-Token': refreshToken
        }
    });

    return instance;
};

export const getTokenOut = () => {
    const loginStore = useLoginStore();

    alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
    loginStore.getLogout();
    router.push('/login');
}