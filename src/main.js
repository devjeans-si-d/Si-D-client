import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'
const app = createApp(App);
axios.interceptors.request.use(
    (config) => {
    //   const token = localStorage.getItem("token");
  
    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }
      config.headers["Authorization"] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MjI0MjYxMjYsImV4cCI6MTcyNTAxODEyNn0.PrHtUt1jhj_zl2FNJGRirdnJQTsorAMXAzcgVHfybJg`;
      
  
      return config;
    },
    (error) => {
      // 해당 인터셉터가 무시되고, 사용자의 본래 요청인 화면으로 라우팅된다. (가던 길 가는 것)
      return Promise.reject(error);
    }
  );
  //401 응답을 받을 경우에 intercepter를 통해 전역적으로 rt를 통한 at 재발급
  //만약 rt도 401 응답을 받을 경우에 -> 로그아웃 시켜줘야함(localstorage에서 토큰 제거 후 login 화면으로 리다이렉트)
  axios.interceptors.response.use(
    (response) => response,
  
    async (error) => {
      console.log(error);
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
          localStorage.removeItem("token");
          const response = await axios.post(
            `${process.env.VUE_APP_API_BASE_URL}/refresh-token`,
            { refreshToken }
          );
          localStorage.setItem("token", response.data.result.token);
          // 토큰이 만료된 걸 다시 받아온 거니 화면 리로드해줘서 사용하면서 api에 새로운 리프레시토큰을 담겨서 요청하게 만들어야한다.
          window.location.reload();
          //   if(error.response.status === 403) throw error;
        } catch (e) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
app.use(router);
app.use(vuetify);
app.mount('#app');
