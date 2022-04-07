<template>
  <header class="fixed-top">
    <headerBlock :imgWidth="imgWidth" :socials="socials"></headerBlock>
  </header>

  <section class="p0">
    <article class="bg-primary">
      <h4 id="event"><span class="bg-primary">EVENTS</span></h4>
      <eventBlock
        :events="events"
        :wH="wH"
        v-if="events.length != 0"
      ></eventBlock>
      <div>
        <q-btn
          v-if="events.length != 0"
          type="a"
          href="/events.html"
          color="primary"
          icon-right="open_in_new"
          label="More"
          class="shadow-24"
        ></q-btn>
      </div>
    </article>
  </section>

  <section class="b">
    <article class="bg-primary">
      <h4 id="blog"><span class="bg-primary">BLOGS</span></h4>
      <blogBlock :blogs="blogs" :wH="wH" v-if="blogs.length != 0"></blogBlock>
      <div>
        <q-btn
          v-if="blogs.length != 0"
          type="a"
          href="/blogs.html"
          color="primary"
          icon-right="open_in_new"
          label="More"
          class="shadow-24"
        ></q-btn>
      </div>
    </article>
  </section>

  <section class="c">
    <article class="bg-primary">
      <h4 id="team"><span class="bg-primary">Teams</span></h4>
      <teamBlock
        :teams="teams"
        :wH="wH"
        :wW="wW"
        v-if="teams.length != 0"
      ></teamBlock>
      <div>
        <q-btn
          v-if="teams.length != 0"
          type="a"
          href="/teams.html"
          color="primary"
          icon-right="open_in_new"
          label="More"
          class="shadow-24"
        ></q-btn>
      </div>
    </article>
  </section>

  <section class="d">
    <article class="bg-primary">
      <h4 id="sss"><span class="bg-primary">SSS</span></h4>
      <sssBlock :ssss="ssss" :wH="wH" v-if="ssss.length != 0"></sssBlock>
    </article>
  </section>

  <section class="e">
    <article class="bg-primary">
      <h4 id="sup"><span class="bg-primary">Supports</span></h4>
      <supBlock
        :sups="sups"
        :wH="wH"
        :wW="wW"
        v-if="sups.length != 0"
      ></supBlock>
    </article>
  </section>
  <footer>
    <footerBlock :socials="socials"></footerBlock>
  </footer>
</template>
<script>
import headerBlock from "./components/header.vue";
import eventBlock from "./components/event.vue";
import blogBlock from "./components/blog.vue";
import teamBlock from "./components/team.vue";
import sssBlock from "./components/sss.vue";
import supBlock from "./components/sup.vue";
import footerBlock from "./components/footer.vue";
import { ref } from "vue";
import { getCollection, getImage, getDocument } from "@/services/foruser.js";
export default {
  components: {
    headerBlock,
    eventBlock,
    blogBlock,
    teamBlock,
    sssBlock,
    supBlock,
    footerBlock,
  },

  data() {
    return {
      wH: window.innerHeight,
      wW: window.innerWidth,
      scrollValue: null,
      imgWidth: 100,
      socials: ref([]),
      blogs: ref([]),
      events: ref([]),
      teams: ref([]),
      ssss: ref([]),
      sups: ref([]),
      size: 0,
      pageFunctions: [],
      pageParams: [],
      pageLists: [],
    };
  },
  methods: {
    updateScroll() {
      this.scrollValue = window.scrollY;
      if (this.scrollValue < 50) {
        this.imgWidth = 100 - this.scrollValue;
      } else {
        this.imgWidth = 50;
      }
    },
    getItemsAllWithContent(input) {
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
    getItemsAll(input) {
      var page = input[0];
      var pageList = input[1];
      getCollection(page).then((res) => {
        this.size = res.size - 1;
        res.forEach((element) => {
          if (element.get("publish") == true) {
            const data = {
              header: element.get("headerText"),
              content: element.get("content"),
            };
            pageList.push(data);
          }
        });
      });
    },
    getItemsOneByOne(input) {
      var page = input[0];
      var amount = input[1];
      var pageList = input[2];
      getDocument(page, "articles").then((res) => {
        var i = 0;
        res.get("articles").forEach((element) => {
          i = i + 1;
          if (i < amount) {
            getDocument(`${page}i`, element).then((re) => {
              if (re.get("publish") == true) {
                getImage(re.get("headerImage")).then((r) => {
                  const data = {
                    header: re.get("headerText"),
                    headerImage: r,
                  };
                  pageList.push(data);
                });
              }
            });
          }
        });
      });
    },
  },

  mounted() {
    this.pageLists = [
      this.socials,
      this.events,
      this.blogs,
      this.teams,
      this.ssss,
      this.sups,
    ];
    this.pageFunctions = [
      this.getItemsAllWithContent,
      this.getItemsOneByOne,
      this.getItemsOneByOne,
      this.getItemsAll,
      this.getItemsAll,
      this.getItemsAllWithContent,
    ];
    this.pageParams = [
      ["social", this.socials],
      ["event", 8, this.events],
      ["blog", 8, this.blogs],
      ["team", this.teams],
      ["sss", this.ssss],
      ["sup", this.sups],
    ];
    this.pageFunctions[0](this.pageParams[0]);
    while (this.pageLists.length) {
      if (this.size == this.pageLists[0]) {
        this.pageLists.shift();
        this.pageFunctions.shift();
        this.pageParams.shift();
        if (this.pageFunctions[0]) {
          this.pageFunctions[0](this.pageParams[0]);
        }
      }
    }

    // -> logs 0

    window.addEventListener("scroll", this.updateScroll);
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
