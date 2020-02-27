import Vue from "vue";
import { AxiosInstance } from "axios";

//声明了.vue文件的处理
declare module '*.vue' {
  //import Vue from 'vue'
  export default Vue
}

//利用模块的扩展，给vue加一个$axios
declare module "vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance;
  }
}

