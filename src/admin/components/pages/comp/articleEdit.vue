<template>
  <input
    type="file"
    ref="img"
    style="display: none"
    accept="image/*"
    @change="imageLoader"
  />
  <div class="asd">
    <div>
      <div>
        <div class="t">
          <img :src="imageShow" alt="" />
        </div>
        <button @click="$refs.img.click()">{{ uploadImageButtonText }}</button>
      </div>
      <span>Article Name :{{ article }}</span>
    </div>
    <QuillEditor
      toolbar="full"
      v-model:content="content"
      ref="quill"
    ></QuillEditor>
    <div>
      <button @click="saveContent">Save</button>
      <button @click="publishContent">Publish</button>
      <button disabled>{{ publish }}</button>
      <input
        v-if="page == 'people'"
        type="text"
        placeholder="TeamName"
        v-model="team"
      />
    </div>
  </div>
</template>

<script>
import {
  uploadImage,
  setDocument,
  getDocument,
  getImage,
} from "@/services/foradmin.js";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  props: {
    article: String,
    page: String,
  },
  data() {
    return {
      uploadImageButtonText: "Upload Image",
      headerImageExt: null,
      imageShow: null,
      content: null,
      publish: null,
      team: "null",
    };
  },
  created() {
    this.updatePanel();
  },
  methods: {
    imageLoader: function (value) {
      this.uploadImageButtonText = "Prepearing";
      this.headerImageExt = value.target.files[0].type.split("/")[1];
      var reader = new FileReader();
      reader.readAsArrayBuffer(value.target.files[0]);
      reader.addEventListener("loadend", this.loadedImage);
      var reader2 = new FileReader();
      reader2.readAsDataURL(value.target.files[0]);
      reader2.addEventListener("loadend", this.updateImage);
    },
    loadedImage: function (value) {
      this.uploadImageButtonText = "Image Uploading";
      const fr = value.target;
      var result = fr.result;
      uploadImage(this.page, this.article, result, this.headerImageExt).then(
        () => {
          this.uploadImageButtonText = "Upload Image";
        }
      );
    },
    updateImage: function (value) {
      this.imageShow = value.target.result;
    },
    saveContent: function () {
      const content = this.$refs.quill.getHTML();
      const data = {
        post: true,
        publish: false,
        headerImage: `${this.page}/${this.article}/headerImage.${this.headerImageExt}`,
        content: content,
        team: this.team,
      };
      const d = {
        publish: false,
        headerImage: `${this.page}/${this.article}/headerImage.${this.headerImageExt}`,
        headerText: this.article,
        team: this.team,
      };
      setDocument(`${this.page}i`, this.article, d);
      setDocument(this.page, this.article, data).catch((err) => {
        alert(err);
      });
    },
    publishContent: function () {
      const content = this.$refs.quill.getHTML();
      const data = {
        post: true,
        publish: true,
        headerImage: `${this.page}/${this.article}/headerImage.${this.headerImageExt}`,
        headerText: this.article,
        content: content,
        team: this.team,
      };
      const d = {
        publish: true,
        headerImage: `${this.page}/${this.article}/headerImage.${this.headerImageExt}`,
        headerText: this.article,
        team: this.team,
      };
      setDocument(`${this.page}i`, this.article, d);
      setDocument(this.page, this.article, data).catch((err) => {
        alert(err);
      });
    },

    updatePanel: function () {
      getDocument(this.page, this.article)
        .then((res) => {
          if (res.exists()) {
            this.publish = res.get("publish");
            this.$refs.quill.setHTML(res.get("content"));
            this.headerImageExt = res.get("headerImage").split(".")[1];
            getImage(res.get("headerImage")).then((res) => {
              this.imageShow = res;
            });
            if (this.page == "people") {
              this.team = res.get("team");
            }
          } else {
            this.publish = false;
            this.$refs.quill.setHTML("");
            this.headerImageExt = "";
            this.imageShow = "";
            this.team = "";
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  watch: {
    article() {
      if (this.article) {
        this.updatePanel();
      }
    },
  },
};
</script>

<style scoped>
button {
  width: 100px;
  height: 40px;
}
.t {
  width: 200px;
  min-height: 150px;
  background-color: #333;
}
img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.asd > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
.asd > div span {
  margin: auto;
  margin-bottom: 10px;
  margin-left: 10px;
}
.asd > div div {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  align-content: center;
}
.asd > div div button {
  margin: auto;
  width: 200px;
}
</style>
