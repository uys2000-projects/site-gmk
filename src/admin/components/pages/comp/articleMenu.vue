<template>
  <div>
      <button v-for="item in articles" :key="item" @click="setArticle(item)">
        {{ item }}
      </button>
  </div>
</template>
<script>
export default {
  props: {
    articles: Array,
  },
  emits: ["setArticle"],
  methods: {
    setArticle: function (value) {
      this.$emit("setArticle", value);
    },
  },
};
</script>
<style scoped>
button {
  width: 120px;
  height: 30px;
}
div {
    padding: 5px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  max-height: 70px;
  overflow-y: scroll;
  background-color: #f357;
}
</style>
