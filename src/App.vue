<template>
  <div id="app">
    <app-header />
    <b-container class="my-5">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

import { mapActions } from "vuex";

export default {

  components: {
    AppHeader
  },

  methods: {
    ...mapActions(["getQuestions"]),

    startQuiz() {
      // this.goToFirstQuestion();
      this.getQuestions();
    },

    goToFirstQuestion() {
      if(this.$route.name !== 'Question') {
        this.$router.push("/questions/1");
      }
    }
  },

  created() {
    this.startQuiz();
  }
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
