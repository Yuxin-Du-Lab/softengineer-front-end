<template>
  <div>
    <v-row md="6" align="center" justify="center">
      <h1 v-if="awesome">Vue is awesome!</h1>
      <h1 v-else>Oh no 😢</h1>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "wareHouse",

  data() {
    return {
      awesome: true,
    };
  },
}
</script>

<style scoped>

</style>