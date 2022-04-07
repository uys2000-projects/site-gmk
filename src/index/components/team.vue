<template>
  {{ teams.length != 0 ? conterEvent : "" }}
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
    class="bg-primary shadow-24 rounded-borders"
  >
    <q-carousel-slide
      v-for="n in Array(slideCount).keys()"
      :key="n"
      :name="`p${n}`"
      class=""
    >
      <div class="q-col-gutter-md row items-start">
        <div
          :class="`col-${12 / itemCounts[n]}`"
          v-for="i in itemCounts[n]"
          :key="i"
        >
          <q-card
            dark
            bordered
            :class="`bg-primary shadow-24 my-card text-dark`"
          >
            <q-card-section>
              <q-expansion-item
                group="somegroup"
                icon="explore"
                :label="teams[i - 1 + n * count].header"
              >
                <q-card>
                  <q-card-section>
                    <div v-html="teams[i - 1 + n * count].content"></div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
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
      count: 0,
      slideCount: 0,
      itemCounts: [0],
      conter: 0,
      slide: ref("p0"),
    };
  },
  created() {},
  props: {
    teams: Array,
    wH: Number,
    wW: Number,
  },
  methods: {
    coneterFunc: function () {
      this.conter = this.teams.length;
    },
  },
  computed: {
    conterEvent: function () {
      this.coneterFunc();
      return "";
    },
  },
  watch: {
    conter(val) {
      this.count =
        Math.floor(this.wW / 500) == 0 ? 1 : Math.floor(this.wW / 500);
      this.slideCount = 0;
      for (var itemNumber = 0; itemNumber < val; itemNumber++) {
        if (itemNumber % this.count == 0) {
          this.slideCount++;
          this.itemCounts[this.slideCount - 1] = 1;
        } else {
          this.itemCounts[this.slideCount - 1] = (itemNumber % this.count) + 1;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.q-carousel {
  height: 80%;
}
.my-card {
  width: 100%;
  margin: 20px auto;
}
.q-card {
  padding: 0px 20px;
}

.q-card:hover {
  padding: 0px 0px;
}
</style>
