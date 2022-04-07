<template>
  <q-carousel
    v-if="events.length != 0"
    v-model="slide"
    transition-prev="scale"
    transition-next="jump-left"
    animated
    control-color="grey"
    prev-icon="arrow_left"
    next-icon="arrow_right"
    padding
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    {{ getPeople }}
    <q-carousel-slide name="p0" class="">
      <div class="q-col-gutter-md row items-start justify-center items-center">
        <div>
          <div class="q-pa-md">
            <div
              class="row wrap justify-center q-gutter-sm "
              v-for="index in events"
              :key="index"
            >
              <h4>{{ index.header }}</h4>
              <q-intersection
                once
                transition="scale"
                class=""
                v-for="i in teams[index.header]"
                :key="i"
              >
                <q-card class="my-card items">
                  <q-img :src="i.headerImage">
                    <div class="absolute-bottom text-h6">
                      {{ i.header }}
                    </div>
                  </q-img>

                  <q-card-section>
                    <div v-html="i.content"></div>
                  </q-card-section>
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>
  {{ "" }}
</template>
<script>
import { ref } from "vue";
import { getDocumentForTeam, getImage } from "@/services/foruser.js";
export default {
  components: {},
  data() {
    return {
      alert: ref(false),
      slide: ref("p0"),
      header: "",
      teams: {},
    };
  },
  methods: {
    getPeopleFunc: function (item) {
      var tmp = [];
      getDocumentForTeam(this.page, item).then((res) => {
        res.forEach((element) => {
          getImage(element.get("headerImage")).then((re) => {
            const team = {
              headerImage: re,
              header: element.get("headerText"),
              content: element.get("content"),
            };
            tmp.push(team);
            if (tmp.length == res.docs.length) {
              this.teams[item] = tmp;
              console.log(item);
              console.log(tmp);
            }
          });
        });
      });
    },
  },
  computed: {
    getPeople: function () {
      this.events.forEach((element) => {
        this.getPeopleFunc(element.header);
      });
      return "";
    },
  },
  props: {
    events: Array,
    page: String,
    wW: Number,
  },
};
</script>
<style scoped>
h4{
  width: 100%;
}
.q-carousel {
  height: fit-content;
  border-radius: 0px;
  border-bottom-left-radius: 20px;
  overflow: scroll;
}
.items {
  margin: 10px;
  width: 290px;
}
.items:hover {
  margin: 0px;
  width: 310px;
}
@media (max-width: 400px) {
  .items {
    margin: 10px;
    width: 100px;
  }
  .items:hover {
    margin: 0;
    width: 120px;
  }
}
</style>