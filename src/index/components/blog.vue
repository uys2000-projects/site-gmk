<template>
  {{ blogs.length != 0 ? conterEvent : "" }}
  <a v-if="blogs.length != 0"></a>
  <q-carousel
    v-model="slide"
    transition-prev="scale"
    transition-next="jump-left"
    swipeable
    animated
    control-color="grey"
    prev-icon="arrow_left"
    next-icon="arrow_right"
    navigation
    padding
    arrows
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    <q-carousel-slide
      v-for="n in Array(slideCount).keys()"
      :key="n"
      :name="`p${n}`"
      class=""
    >
      <div class="q-col-gutter-md row items-start justify-center items-center">
        <div
          :class="itemCounts[n] != 1 ? 'col-6 row wrap justify-center items-center content-start' : 'col row wrap justify-center items-center content-start'"
          v-for="i in itemCounts[n]"
          :key="i"
        >
          <q-img
            @click="openPage(blogs[i - 1 + n * 2].header)"
            class="items"
            :src="blogs[i - 1 + n * 2].headerImage"
            no-native-menu
            :style="`width:100%; height:${wH * 0.355}px; object-fit: cover;`"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              {{ blogs[i - 1 + n * 2].header }}
            </div>
          </q-img>
        </div>
      </div>
    </q-carousel-slide>
  </q-carousel>

  <q-dialog v-model="alert" full-width full-height transition-show="slide-down">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ header }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div :width="'200px'">
          <QuillEditor :options="options" ref="ref"></QuillEditor>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
          class="relative-bottom text-subtitle1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import { getDocument } from "@/services/foruser.js";
export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      alert: ref(false),
      slideCount: 0,
      itemCounts: [0],
      conter: 0,
      slide: ref("p0"),
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: "bubble",
      },
    };
  },
  props: {
    blogs: Array,
    wH: Number,
  },
  methods: {
    conetrFunc: function () {
      this.conter = this.blogs.length;
    },
    openPage: function (item) {
      this.alert = true;
      this.header = item;
      getDocument("blog", item).then((res) => {
        this.$refs["ref"].setHTML(res.get("content"));
      });
    },
  },
  computed: {
    conterEvent: function () {
      this.conetrFunc();
      return "";
    },
  },
  watch: {
    conter(val) {
      this.slideCount = 0;
      for (var itemNumber = 0; itemNumber < val; itemNumber++) {
        if (itemNumber % 4 == 0) {
          this.slideCount++;
          this.itemCounts[this.slideCount - 1] = 1;
        } else {
          this.itemCounts[this.slideCount - 1] = (itemNumber % 4) + 1;
        }
        itemNumber;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.q-carousel {
  height: 80%;
  border-radius: 0px;
  border-bottom-left-radius: 20px;
}
.q-img {
  width: 90% !important;
  margin: auto;
}
.q-img:hover {
  margin: auto;
  width: 100% !important;
  margin-right: 0px;
  margin-left: 0px;
}
</style>
