<template>
  <button @click="setPageType('e')">Page Edit</button>
  <button @click="setPageType('c')">Page Create</button>
</template>
<script>
export default {
  emits: ["setPageType"],
  methods: {
    setPageType(value) {
      this.$emit("setPageType", value);
    },
  },
};
</script>
<style scoped>
button {
  width: 50%;
  height: 40px;
}
</style>
