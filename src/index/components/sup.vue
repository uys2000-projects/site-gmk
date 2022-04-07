<template>
  {{ sups.length != 0 ? conterEvent : "" }}
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
    infinite
    arrows
    ref="caro"
    class="bg-primary text-white shadow-1 rounded-borders"
  >
    <q-carousel-slide
      v-for="n in Array(slideCount).keys()"
      :key="n"
      :name="`p${n}`"
      class="row fit wrap justify-center items-center"
    >
      <div
        :class="`col-${12 / itemCounts[n]} row wrap justify-center items-center`"
        v-for="i in itemCounts[n]"
        :key="i"
      >
        <a
        class="col row wrap justify-center items-center"
          :href="
            sups[i - 1 + n * count].content.substr(
              3,
              sups[i - 1 + n * count].content.length - 7
            )
          "
        >
          <q-img
          :title="sups[i - 1 + n * count].header"
          class="col"
            :src="sups[i - 1 + n * count].headerImage"
            no-native-menu
            :style="`width:200px; height:200px; object-fit: cover;`"
        /></a>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    sups: Array,
    wH: Number,
    wW: Number,
  },
  created() {
    this.interval = setInterval(() => this.change(), 10000);
  },
  data() {
    return {
      slide: ref("p0"),
      count: 0,
      slideCount: 0,
      itemCounts: [0],
      conter: 0,
    };
  },
  methods: {
    change: function () {
      this.$refs.caro.next();
    },
    coneterFunc: function () {
      this.conter = this.sups.length;
    },
    work: function (ref) {
      this.$refs[ref].setHTML(this.sups[ref].content);
      return "";
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
        Math.floor(this.wW / 500) == 0 ? 1 : Math.floor(this.wW / 300);
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
.a {
  margin: auto;
  widows: 100%;
}
.q-carousel {
  height: 80%;
}
.my-card {
  width: 30%;
  min-width: 200px;
  margin: 20px auto;
}
</style>
