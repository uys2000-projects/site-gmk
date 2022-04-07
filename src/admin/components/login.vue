<template>
  <input type="text" v-model="id" placeholder="Id" />
  <input type="password" v-model="pass" placeholder="Password" />
  <button @click="loginEvent">Login</button><br />
  <p v-if="wrongId">Wrong Id or Pass</p>
</template>

<script>
import { sign } from "@/services/foradmin.js";

sign;
export default {
  setup() {},
  date() {
    return { id: null, pass: null };
  },
  emits: ["loginEvent"],
  methods: {
    loginEvent: function () {
      sign(this.id, this.pass)
        .then((res) => {
          console.log(res.auth)
          this.$emit("loginEvent", res)
        })
        .catch((error) => {
          alert(`${error.code} : ${error.message}`);
        });
    },
  },
};
</script>
