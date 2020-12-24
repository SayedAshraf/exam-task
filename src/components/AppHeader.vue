<template>
  <div>
    <b-navbar fixed type="dark" variant="dark">
      <b-navbar-nav fill>
        <b-container>
          <b-navbar-brand active href="#">Logo</b-navbar-brand>

          <b-nav-item exact to="/questions/1">
            <font-awesome-icon icon="exclamation-circle" />
            {{ currentQuestionIndex }} / {{ questionsCount }}
          </b-nav-item>
          <b-nav-item exact to="/results">Result</b-nav-item>
        </b-container>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "AppHeader",

  computed: {
    ...mapState(["currentQuestionIndex"]),
    ...mapGetters(["questionsCount"])
  }
};
</script>

<style lang="scss" scoped>
</style>
