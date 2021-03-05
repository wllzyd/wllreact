import {  request } from 'umi';
//查询老师
export async function teacherAll(params:{}) {

    return request("teacher/getTeacherAll",{params})
}
//删除老师
export async function teacherDel(id:number) {

    return request("teacher/deleteTeacher/"+id,{method:"DELETE"})
}
//添加/修改老师
export async function teacherSave(params:{}) {

    return request("teacher/saveTeacher",{method:"POST",data:params})
}