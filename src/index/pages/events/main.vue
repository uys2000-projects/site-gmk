<template>
  <header class="fixed-top">
    <headerBlock :imgWidth="imgWidth" :socials="socials"></headerBlock>
  </header>

  <section>
    <article>
      <pageComp :events="events" :page="'event'" :wW="wW"></pageComp>
    </article>
  </section>

  <footer>
    <footerBlock :socials="socials"></footerBlock>
  </footer>
</template>
<script>
import { ref } from "vue";
import headerBlock from "./../header.vue";
import footerBlock from "./../../components/footer.vue";
import pageComp from "./../comps/pageComp.vue";
import { getCollection, getImage, getDocument } from "@/services/foruser.js";
export default {
  components: {
    pageComp,
    headerBlock,
    footerBlock,
  },
  data() {
    return {
      wH: window.innerHeight,
      wW: window.innerWidth,
      scrollValue: null,
      imgWidth: 100,
      socials: ref([]),
      events: ref([]),
      size: 0,
      pageFunctions: [],
      pageParams: [],
      pageLists: [],
    };
  },
  methods: {
    updateScroll: function () {
      this.scrollValue = window.scrollY;
      if (this.scrollValue < 50) {
        this.imgWidth = 100 - this.scrollValue;
      } else {
        this.imgWidth = 50;
      }
    },

    getItemsAllWithContent: function (input) {
      var page = input[0];
      var pageList = input[1];
      getCollection(page).then((res) => {
        this.size = res.size - 1;
        res.forEach((element) => {
          if (element.get("publish") == true) {
            getImage(element.get("headerImage")).then((res) => {
              const data = {
                header: element.get("headerText"),
                content: element.get("content"),
                headerImage: res,
              };
              pageList.push(data);
            });
          }
        });
      });
    },

    getItemsOneByOne: function (input) {
      var page = input[0];
      var pageList = input[1];
      getDocument(page, "articles").then((res) => {
        res.get("articles").forEach((element) => {
          getDocument(`${page}i`, element).then((re) => {
            getImage(re.get("headerImage")).then((r) => {
              const data = {
                header: re.get("headerText"),
                headerImage: r,
              };
              pageList.push(data);
            });
          });
        });
      });
    },
  },
  mounted() {
    this.pageLists = [this.socials, this.events];
    this.pageFunctions = [this.getItemsAllWithContent, this.getItemsOneByOne];
    this.pageParams = [
      ["social", this.socials],
      ["event", this.events],
    ];
    while (0 < this.pageLists.length) {
      if (this.size == this.pageLists[0]) {
        this.pageFunctions[0](this.pageParams[0]);
        this.pageLists.shift();
        this.pageFunctions.shift();
        this.pageParams.shift();
      }
    }
  },
};
</script>
<style lang="scss">
.q-carousel {
  border-top: 5px solid #0da192;
}
</style>
<style scoped>
section {
  z-index: 2;
  height: 100%;
  padding: 20px 100px;
}
@media (max-width: 800px) {
  section {
    height: 100%;
    padding: 20px 20px;
  }
}
section:first-of-type {
  margin-top: 125px;
}
header {
  z-index: 10;
}
article {
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
}
h4 {
  position: relative;
  top: -10px;
  padding-top: 25px;
  display: flex;
  flex-wrap: wrap;
}
h4 span {
  z-index: 11;
  margin: auto;
  padding: 0px 25px;
  width: min-content;
  border-radius: 20px;
}
div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
div a {
  margin: 20px auto;
  width: 40%;
}
div a:hover {
  margin: 20px auto;
  width: 60%;
}
</style>