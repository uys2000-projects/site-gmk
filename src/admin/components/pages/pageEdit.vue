<template>
  <articleMenuComp
    v-if="articles.length != 0"
    :articles="articles"
    @setArticle="setArticle"
  ></articleMenuComp>
  <articleEditComp v-if="article" :page="page" :article="article"></articleEditComp>
</template>
<script>
import articleMenuComp from "./comp/articleMenu.vue";
import articleEditComp from "./comp/articleEdit.vue";
export default {
  components: {
    articleMenuComp,
    articleEditComp,
  },
  props: {
    articles: Array,
    article: String,
    page:String
  },
  emits: ["setArticle"],
  methods: {
    setArticle: function (value) {
      this.$emit("setArticle", value);
    },
  },
};
</script>
