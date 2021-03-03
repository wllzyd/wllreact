import { request } from 'umi';

//获取学生： 参数：当前页 和页大小
export  async function getStuCoin(
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


export async function getStu(params:{}) {

    return request("stu/getStudentAll",{params})
}

export async function saveStu(params:{}) {

    return request("stu/saveStudent",{method:"POST",data:params})
}

export async function removeStu(id:number) {
    return request("stu/deleteStudent/"+id,{method:"DELETE"})
}

export async function stuAllCoin(id:number) {

    return request("coin/getCoinAll/"+id)
}