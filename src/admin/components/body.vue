<template>
  <pageTypeMenuComp @setPageType="setPageType"></pageTypeMenuComp>
  <pageMenuComp @setPage="setPage"></pageMenuComp>
  <pageEditBlock
    v-if="pageType == 'e' && page"
    :page="page"
    :article="article"
    :articles="articles"
    @setArticle="setArticle"
  ></pageEditBlock>
  <pageCreateBlock
    v-if="pageType == 'c' && page"
    :articles="articles"
    @addToArticles="addToArticles"
    @delArticles="delArticles"
  ></pageCreateBlock>

  pageType - {{ pageType }} <br />
  <br />
  page - {{ page }} <br />
  <br />
  article - {{ article }} <br />
  <br />
  articles - {{ articles }} <br />
  <br />
</template>
<script>
import pageTypeMenuComp from "./comps/pageTypeMenu.vue";
import pageMenuComp from "./comps/pageMenu.vue";
import pageEditBlock from "./pages/pageEdit.vue";
import pageCreateBlock from "./pages/pageCreate.vue";

import { getDocument, setDocument, delDocument } from "@/services/foradmin.js";
export default {
  components: {
    pageTypeMenuComp,
    pageMenuComp,
    pageEditBlock,
    pageCreateBlock,
  },
  data() {
    return {
      pageType: null,
      page: null,
      article: null,
      articles: [],
    };
  },
  watch: {
    page() {
      this.article = null;
      getDocument(this.page, "articles").then((result) => {
        this.setArticlesAtBegin(result);
      });
    },
  },
  methods: {
    setPageType: function (value) {
      this.pageType = value;
    },
    setPage: function (value) {
      this.page = value;
    },
    setArticle: function (value) {
      this.article = value;
    },
    delArticles: function (value) {
      this.articles = value[1];
      console.log(value)
      delDocument(this.page, value[0])
      delDocument(`${this.page}i`, value[0])
      setDocument(this.page, "articles", { articles: this.articles });
    },
    addToArticles: function (value) {
      this.articles.push(value);
      setDocument(this.page, "articles", { articles: this.articles });
    },
    setArticlesAtBegin: function (value) {
      if (!value.exists()) {
        this.articles = [];
      } else {
        this.articles = value.get("articles") ? value.get("articles") : [];
      }
    },
  },
  created() {},
};
</script>

<style scoped></style>
