import {  request } from 'umi';

//获取总学习币
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

//获取全部学生信息
export async function getStu(params:{}) {

    return request("stu/getStudentAll",{params})
}
//保存学生信息
export async function saveStu(params:{}) {

    return request("stu/saveStudent",{method:"POST",data:params})
}
//删除学生
export async function removeStu(id:number) {
    return request("stu/deleteStudent/"+id,{method:"DELETE"})
}
//查询学生学习币历史信息
export async function stuAllCoin(id:number) {

    return request("coin/getCoinAll/"+id)
}

//保存学习币
export async function saveCoin(params:{}) {

    return request("coin/saveCoin",{method:"POST",data:params})
}