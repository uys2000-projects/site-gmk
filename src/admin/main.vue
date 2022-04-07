<template>
  <loginBlock v-if="!userAuth" @loginEvent="loginEvent"></loginBlock>
  <bodyBlock v-if="userAuth" :userAuth="userAuth"></bodyBlock>
</template>

<script>
import bodyBlock from "./components/body.vue";
import loginBlock from "./components/login.vue";
export default {
  name: "App",
  data() {
    return {
      userAuth: false,
    };
  },
  methods: {
    loginEvent: function (value) {
      this.userAuth = value;
      console.log(value)
    },
  },
  components: {
    bodyBlock,
    loginBlock,
  },
};
</script>

<style>
</style>
