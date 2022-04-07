<template v-slot:action>
  <q-banner inline-actions class="bg-primary text-white">
    <div class="fit row wrap justify-center items-center">
      <div class="col">
        <a href="/index.html" class="logo">
          <q-img src="img/logo.jpeg" alt="GMK" :style="imgStyle" />
        </a>
      </div>
      <div
        class="row wrap justify-end"
        style="margin: auto; margin-right: 10px"
      >
        <a
          v-for="item in socials"
          :key="item"
          :href="item.content.substr(3, item.content.length - 7)"
          :style="`display:flex;flex-wrap:wrap;`"
        >
          <q-img
            :src="item.headerImage"
            :alt="item.header"
            :title="item.header"
            :style="`width: ${this.imgWidth / 2}px; height:${
              this.imgWidth / 2
            }px; margin:auto; margin-right:10px`"
          />
        </a>
      </div>
      <div class="button col-shrink">
        <q-btn-dropdown dropdown-icon="apps" title="Menu">
          <q-list>
            <nav>
              <a href="/events.html">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Event</q-item-label>
                  </q-item-section>
                </q-item> </a
              ><a href="/blogs.html">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Blog</q-item-label>
                  </q-item-section>
                </q-item>
              </a>
              <a href="/teams.html">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Team</q-item-label>
                  </q-item-section>
                </q-item>
              </a>
              <a href="/index.html#sss">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>SSS</q-item-label>
                  </q-item-section>
                </q-item>
              </a>
              <a href="/index.html#sup">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Supports</q-item-label>
                  </q-item-section>
                </q-item>
              </a>
            </nav>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-toggle
                  :false-value="false"
                  :label="`darkMode`"
                  :true-value="true"
                  color="white"
                  left-label
                  v-model="darkMode"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
  </q-banner>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      darkMode: false,
      q: useQuasar(),
      imgStyle: `
      margi:auto;
      width: ${this.imgWidth}px;
      height: ${this.imgWidth}px;
      `,
    };
  },
  created() {},
  props: ["imgWidth", "socials"],
  methods: {},
  watch: {
    imgWidth() {
      this.imgStyle = `
      margi:auto;
      width: ${this.imgWidth}px;
      height: ${this.imgWidth}px;
      `;
    },
    darkMode(newName) {
      this.q.dark.set(newName);
      localStorage.darkMode = newName;
    },
  },
  mounted() {
    if (localStorage.darkMode) {
      if (localStorage.darkMode == "true") this.darkMode = true;
      if (localStorage.darkMode == "false") this.darkMode = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 5px 0px;
  width: fit-content;
  margin-right: 0px;
}
.button:hover {
  padding-top: 10px;
  padding-bottom: 0px;
}
.logo {
  padding: 0px;
  display: inline-block;
}
.logo:hover {
  padding-top: 0px;
  padding-left: 20px;
}
a {
  color: black;
  text-decoration: none;
  padding: 5px 0px;
}
a:hover {
  padding-top: 10px;
  padding-bottom: 0px;
}
</style>
