<template>
  <q-carousel
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
    <q-carousel-slide name="p0" class="">
      <div class="q-col-gutter-md row items-start fit row wrap justify-center items-center content-start">
        <div>
          <div class="q-pa-md">
            <div class="row justify-center q-gutter-sm">
              <q-intersection
                v-for="index in events"
                :key="index"
                once
                transition="scale"
                class=""
              >
                <q-img
                  :src="index.headerImage"
                  @click="openPage(index.header)"
                  class="items"
                >
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{ index.header }}
                  </div>
                </q-img>
              </q-intersection>
            </div>
          </div>
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
      slide: ref("p0"),
      header: "",
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: "bubble",
      },
    };
  },
  methods: {
    openPage: function (item) {
      this.alert = true;
      this.header = item;
      getDocument(this.page, item).then((res) => {
        this.$refs["ref"].setHTML(res.get("content"));
      });
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
.q-carousel {
  height: 80%;
  max-height: 709px;
  border-radius: 0px;
  border-bottom-left-radius: 20px;
  overflow: scroll;
}
.items {
  margin: 10px;
  height: 290px;
  width: 290px;
}
.items:hover {
  margin: 0px;
  height: 310px;
  width: 310px;
}
@media (max-width: 400px) {
  .items {
    margin: 10px;
    width: 100px;
  }
  .items:hover {
    margin: 0;
    width: 100px;
  }
}
</style>