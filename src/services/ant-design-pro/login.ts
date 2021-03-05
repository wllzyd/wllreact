// @ts-ignore
/* eslint-disable */
import { request } from 'umi';



/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('admin/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: body,
    ...(options || {}),
  });
}
