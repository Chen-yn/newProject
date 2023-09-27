// // import { parse } from 'querystring';
// import { useRef, useCallback } from 'react'
// import JSEncrypt from 'jsencrypt'

// export const resUrl = `http://10.254.222.101:82/#/home`
// export const APP_NAME = '开发管理平台';
// export const TOKEN_KEY = 'DMP_DEV_TOKEN';
// export const LOGIN_KEY = 'DMP_LOGIN';
// export const GET_MY_ROLES = 'GET_MY_ROLES'
// const reg =
//   /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// export const isUrl = (path: string): boolean => reg.test(path);

// export const isAntDesignPro = (): boolean => {
//   if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
//     return true;
//   }
//   return window.location.hostname === 'preview.pro.ant.design';
// };

// // For the official demo site, it is used to turn off features that are not needed in the real development environment
// export const isAntDesignProOrDev = (): boolean => {
//   const { NODE_ENV } = process.env;
//   if (NODE_ENV === 'development') {
//     return true;
//   }
//   return isAntDesignPro();
// };

// export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// export const setlocalStorageItem = (key: string, data: any) => {
//   try {
//     sessionStorage.setItem(key, data);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// export const getlocalStorageItem = (key: string) => {
//   return sessionStorage.getItem(key);
// };

// export const deletelocalStorageItem = (key: string) => {
//   sessionStorage.removeItem(key);
// };

// export const getUser = () => {
//   const data = getlocalStorageItem(TOKEN_KEY);
//   if (data) {
//     const user = JSON.parse(data);
//     return user;
//   }
//   return null;
// };

// export const handleGetDepartmentTree = (data: any[], id: number | null) => {
//   const arr: any[] = [];
//   data
//     .filter((item) => {
//       return item.parent_id === id;
//     })
//     .forEach((item) => {
//       const treeData = handleGetDepartmentTree(data, item.id);
//       // const isChild = treeData.length == 0 ? true : false;
//       arr.push({
//         value: item.id,
//         title: item.name,
//         key: item.id,
//         children: treeData,
//         departmentName: item.name,
//         orderId: item.order_id,
//         // isLeaf: isChild,
//         // selectable: isChild,
//       });
//     });
//   return arr;
// };


// type FnType = (...arg: any[]) => any
// interface RefType {
//   fn: FnType
//   timer: NodeJS.Timeout | null
// }

// export function useDebounce(this: any, fn: FnType, delay: number, dep: any[] = []) {
//   //  使用 useRef 的目的是：保留上一次的timer，以至于让 if 语句走通，然后清除上一次的 timer
//   // 否则，没有清除定时器，达不到防抖效果
//   const { current } = useRef<RefType>({ fn, timer: null })
//   current.fn = fn
//   // console.log('this', this)
//   return useCallback((...args: any[]) => {
//     if (current.timer) {
//       clearTimeout(current.timer)
//     }
//     current.timer = setTimeout(() => {
//       current.fn.apply(this, args)
//     }, delay)
//   }, dep)
// }

// //  加密
// export const encryptedData = (publicKey: string, data: string | number | any) => {
//   // 新建JSEncrypt对象
//   let encryptor = new JSEncrypt();
//   // 设置公钥
//   encryptor.setPublicKey(publicKey);// publicKey为公钥
//   // 加密数据
//   return encryptor.encrypt(data);//data就是需要加密的密码
// }

// // 解密
// export const decryptData = (publicKey: string, data: string | number | any) => {
//   // 新建JSEncrypt对象
//   let decrypt = new JSEncrypt();
//   // 设置私钥
//   decrypt.setPrivateKey(publicKey);
//   // 解密数据
//   decrypt.decrypt(data);
// }


export const StringReplace = (val: string) => {
  if (val === null || val === undefined) {
    return val
  }
  val = val.replace(/\s*/g, "");
  return val
}


// export  function CloseWebPage() {
//   if (navigator.userAgent.indexOf("MSIE") > 0) {
//     if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
//       window.opener = null;
//       window.close();
//     }
//   }
// }