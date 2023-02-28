import { Request } from '@/util/request';



// enum Api {
//   Login = '/login',
//   Logout = '/logout'
// }

export function loginApi (parameter: any)  {
  return Request.axiosInstance({
      url: '/ucenter/login',
      method: 'post',
      data: parameter
  })
}

// export function doLogout() {
//   return http.get({ url: Api.Logout });
// }

