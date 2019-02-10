<template>
  <div id="app">
    <h1>{{text}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "vue index test"
    };
  }
};
</script>

<style lang="sass" scoped>
#app h1
  color: red
</style>
