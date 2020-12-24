<template>
  <div>
    <h1>Home page</h1>
    <button @click="Start">Start Questions</button>
    <!-- <router-link to="/question/1">Start Questions</router-link> -->
  </div>
</template>

<script>
import axios from "axios";
// import Question from "@/components/Question.vue";
export default {
  // components: {
  //   Question,
  // },
  data() {
    return {
      questions: {},
    };
  },
  methods: {
    Start() {
      this.$store.dispatch("fetchQuestion");
      this.$router.push("/question/1");
    },
  },
  beforeMount() {
    // Fetching Questions from API
  },
};
</script>

<style>
</style>
