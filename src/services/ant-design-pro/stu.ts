import { request } from 'umi';

//获取学生： 参数：当前页 和页大小
export  async function getStu(
    params: {
      // query
      /** 当前的页码 */
      current?: number;
      /** 页面的容量 */
      pageSize?: number;
    },
    options?: { [key: string]: any },
  )  {
       return request(
           "coin/getCoinList",
           {
               params,
           }
       )
};

export async function addStu(params:{}) {

    
}

export async function updateStu(params:{}) {

    
}

export async function removeStu(params:{}) {

    
}

export async function stuAllCoin(id:number) {

    return request("coin/getCoinAll/"+id)
}