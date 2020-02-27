<template>
  <div>
    <!-- ts 特性列表 -->
    <p>
      <input type="text" @keydown.enter="addFeature" />
    </p>
    <ul>
      <li v-for=" feature in features" :key="feature.id">{{feature.name}}</li>
      <li>特性总数:{{count}}</li>
      <li>{{msg}}</li>
    </ul>

    <!-- vuex -->
    <h3 @click="add">{{counter}}</h3>
    <h3 @click="asycAdd">{{counter}}</h3>

    <el-form ref="loginForm" :inline="true" :model="formInline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch, Ref } from "vue-property-decorator";
import { Feature } from "../types";
import { getFeatures } from "../api/feature";
import { Action, State, Mutation } from "vuex-class";
import { Form } from "element-ui";

//@Componnet({ //...})方式 和 类方式定义模板都可以生效
/* @Component({
  mounted() {
    console.log("配置对象的方式也可以用~");
    console.log(this.$data);
  },
  computed: {
    count2: function() {
      return this.$data.features.length - 0;
    }
  }
}) */

@Component({
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    // onSubmit() {
    //   console.log("submit!");
    // }
  }
})
export default class Hello extends Vue {
  @Ref() loginForm!: Form;

  // vuex整合推荐使用 vuex-class
  @State counter!: number;
  @Mutation add!: () => void;
  @Action("add") asycAdd!: () => Promise<number>;

  //属性就行data
  features: Feature[] = [];

  //装饰器：
  //{ type: String, required: true } 给vue的
  //变量附件的给ts的
  @Prop({ type: String, required: true })
  msg!: string;

  //方法直接作为事件回调
  //Emit修饰的函数，就是自定义事件
  //相当于vue的 this.$emit(add-feature)
  //父组件使用时，注意驼峰转中横线
  //如果有返回值 则作为事件参数
  @Emit()
  addFeature(e: KeyboardEvent) {
    //target的类型是 EventTarget，它是更高级的基类，我们把他断言成 笃定的子类
    const input = e.target as HTMLInputElement;
    const feature = { id: this.features.length + 1, name: input.value };
    this.features.push(feature);
    input.value = "";

    return feature;
  }

  //方法如果和生命周期同名就是生命周期
  created() {
    // this.features = [
    //   { id: 1, name: "类型注解" },
    //   { id: 2, name: "编译语言" }
    // ];
    // getFeatures().then(res => {
    //   this.features = res.data;
    // });

    this.$axios.get<Feature[]>("/api/list").then(res => {
      this.features = res.data;
    });
  }

  //存取器用于计算属性
  get count() {
    return this.features.length;
  }

  onSubmit() {
    this.loginForm.validate().then(isValid => {
      if (isValid) {
        console.log("11111");
      }
    });
  }
}
</script>

<style scoped>
</style>