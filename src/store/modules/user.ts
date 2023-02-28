
import { defineStore } from 'pinia'
import { store } from '@/store'
import router from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { h } from 'vue'
import {loginApi } from '@/api/user';
// 用户登陆状态
interface UserState {
  userInfo?: any;
  token?: string;
}

interface LoginParams {
  username: string;
  password: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: '',
  }),
  getters: {
    // this 指向  state
    getUserInfo(): any {
      return this.userInfo || null
    },
    getToken(): string {
      return this.token  || ''
    },
  },
  actions:{
    setToken(info: string | undefined) {
      this.token = info ? info : ''
    },
    setUserInfo(info: any | null) {
      this.userInfo = info;
    },
    resetState() {
      this.userInfo = null
      this.token = ''
    },
   /* await userStore.login({
    *     username,
    *     password: password!,
    *     goHome: false,
    *     mode: 'none',
    * })
    * */
   
    async login( params: LoginParams):Promise<any>{
      try{
        const data = await loginApi(params)
        return Promise.resolve(data);
      }catch(error){
        return Promise.reject(error);
      }
    },
    async logout() {
      if (this.getToken) {
        try {
          // 注销token接口
          // await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setUserInfo(null);
      // router.push('/login');
    },

  }
})
// 暴露并使用
//   import { useUserStoreWithOut } from '/@/store/modules/user'
//     const userStore = useUserStoreWithOut()
//    userStore.getToken 或  userStore.getToken()
export function useUserStoreWithOut() {
  return useUserStore(store);
}
