import request from '../utils/request';
import { URL } from '.';


/***
 * 个人工作台
 ***/

type exportdata = {
    module: string | number;
}

export async function hhhhhhhhh(data: exportdata) {
    return request(URL.EXPORT_TEMPLATE_INFO, {
        method: 'get',
        data,
    });
}