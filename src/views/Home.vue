<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <Hello msg="blabla~" @add-feature="onAddFeatrue" />
    <p>username: {{username}}</p>
  </div>
</template>

<script  lang="ts">
import {
  Component,
  Prop,
  Vue,
  Emit,
  Watch,
  Mixins
} from "vue-property-decorator";
import { Action, Mutation, State, namespace } from "vuex-class";
import moment from "moment";

import { Feature, UserState } from "../types";
import MyMixin from "../mixins/my-mixin";
const userModule = namespace("user");

// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import Hello from "../components/Hello.vue";

import { Route } from "vue-router";

Component.registerHooks(["beforeRouteEnter"]);

@Component({
  components: {
    HelloWorld,
    Hello
  }
})
export default class Home extends Mixins(MyMixin) {
  @userModule.State("name")
  username!: string;

  @userModule.Mutation("setUser")
  setUser!: (userInfo: UserState) => void;

  created() {
    this.setUser({ name: "tom", token: "mock token" });
  }

  msg = moment().format("YYYY/MM/DD");
  name = "Home";
  onAddFeatrue(f: Feature) {
    console.log(f.name);
  }

  beforeRouteEnter(to: Route, from: Route, next: (vm: any) => void) {
    console.log("beforeRouteEnter");
    next(vm => {
      console.log(vm);
    });
  }
}
</script>
