<template>
  <q-carousel
    v-model="slide"
    transition-prev="scale"
    transition-next="jump-left"
    prev-icon="arrow_left"
    next-icon="arrow_right"
    padding
    arrows
    class="bg-primary shadow-24 rounded-borders"
  >
    <q-carousel-slide name="p0" class="">
      <div class="q-pa-md shadow-24" style="width: 100%">
        <q-list bordered>
          <q-expansion-item
            v-for="i in Array(ssss.length).keys()"
            :key="`s${i}`"
            group="somegroup"
            icon="explore"
            :label="ssss[i].header"
            header-class=""
          >
            <q-card>
              <q-card-section>
                    <div v-html="ssss[i].content"></div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />
        </q-list>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>

import { ref } from "vue";
export default {
  components: {
  },
  data() {
    return {
      options: {
        modules: {
          toolbar: false,
        },
        readOnly: true,
        theme: "bubble",
      },
      slide: ref("p0"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
  props: {
    ssss: Array,
  },

};
</script>

<style lang="scss" scoped>
.q-expansion-item:hover{
  padding: 0px 30px;
}
.ql-tooltip {
  display: none;
}
.q-carousel {
  display: block;
  width: 100%;
  height: 80%;
}
.q-img {
  min-height: 45vh;
}
.q-carousel__slides-container{
  width: 100%;
}
</style>
