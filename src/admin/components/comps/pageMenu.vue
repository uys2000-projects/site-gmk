<template>
  <div>
    <button v-for="item in pages" :key="item" @click="setPage(item)">{{ item }}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pages: ["event", "blog", "team", "people", "sss", "sup", "social"],
    };
  },
  emits: ["setPage"],
  methods: {
    setPage(value) {
      this.$emit("setPage", value);
    },
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 50px;
  margin: auto;
}
div {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  margin: auto;
  max-height: 110px;
  overflow-y: scroll;
  background-color: #f534;
}
</style>
