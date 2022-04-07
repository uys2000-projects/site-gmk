<template>
  <q-banner
    inline-actions
    class="bg-primary text-white"
    style="margin-top: 20px"
  >
    <div class="row justify-center items-center wrap">
      <div class="col self-center">
        <q-img id="logo" src="img/logo.jpeg" alt="GMK" />
      </div>
      <div class="col self-center">
        <span>Created By Mehmet Uysal</span>
      </div>
      <div class="col self-center">
        <h5>Social Media</h5>
        <a
          v-for="item in socials"
          :key="item"
          :href="item.content.substr(3, item.content.length - 7)"
        >
          {{ item.header }}</a
        ><br />
      </div>
    </div>
  </q-banner>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["socials"],
};
</script>

<style lang="scss" scoped>
span {
  display: block;
  text-align: center;
}
a {
  color: white;
  text-decoration: none;
  display: block;
  height: min-content;
  width: 100%;
}
#logo {
  max-height: 200px;
}
</style>
