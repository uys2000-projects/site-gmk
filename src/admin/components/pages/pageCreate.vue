<template>
  <div id="block">
    <div>
      <div>
        <input type="text" v-model="newArticleName" />
        <button @click="addToArticles(newArticleName)">Add</button>
      </div>

      <ol>
        <li>
          Articles <button @click="delArticle(choosedArticle)">Del</button>
        </li>
        <li v-for="article in articles" :key="article">
          <span> {{ article }}</span>
          <input
            type="radio"
            name="article"
            @click="choosedArticle = article"
          />
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    articles: Array,
  },
  emits: ["delArticles", "addToArticles"],
  data() {
    return {
      newArticleName: null,
      choosedArticle: null,
    };
  },
  methods: {
    addToArticles(value) {
      if (value) {
        if (!this.articles.includes(value)) {
          this.$emit("addToArticles", value);
        }
      }
    },
    delArticle: function (value) {
      this.choosedArticle = null;
      if (value) {
        const a = this.articles.filter(function (v) {
          return v != value;
        });
        this.$emit("delArticles", [value, a]);
      }
    },
  },
};
</script>

<style scoped>
#block {
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  background-color: #a123;
}
#block > div {
  margin: auto;
}
div > input {
  width: 70%;
  margin: 0px;
}
button {
  width: 28%;
  margin: auto;
  margin-right: 0px;
}
span {
  padding: 1px;
}
ol li {
  padding: 1px;
  border: gray 2px dashed;
  display: flex;
  flex-wrap: wrap;
}
li input {
  margin: auto;
  margin-right: 10px;
}
</style>
