<template>
  <div class="card" v-if="currentQuestion">
    <div class="card-header text-left text-dark bg-muted">
      <h3>{{ currentQuestion.question }}</h3>
    </div>
    <div class="card-body text-left">
      <div v-if="currentQuestion.type === 'multiple'" class="InnerCard">
        <div
          v-for="(choice, idx) in currentQuestion.allanswers"
          :key="idx"
          class="radio-body"
        >
          <label class="radio radiolabol">
            <input
              type="radio"
              :id="'answer' + idx"
              v-model="answer"
              name="choice"
              :value="choice"
            />
            {{ choice }}
          </label>
        </div>
      </div>
    </div>
    <div class="card-footer text-left bg-light">
      <button type="button" class="btn btn-secondary" @click="previousQuestion">
        Previous
      </button>
      <button type="button" class="btn btn-secondary" @click="nextQuestion">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      answer: "",
    };
  },
  methods: {
    nextQuestion() {
      if (this.questions.length === this.currentQuestionID) {
        this.checkResults();
      } else {
        this.submitAnswer();
        this.$router.push(`/question/${this.currentQuestionID + 1}`);
      }
    },
    previousQuestion() {
      if (this.currentQuestionID === 1) {
        this.$router.push("/");
      } else {
        this.submitAnswer();
        this.$router.push(`/question/${this.currentQuestionID - 1}`);
      }
    },
    submitAnswer() {
      this.$store.commit("UpdateResult", {
        id: this.currentQuestionID,
        result: this.answer,
      });
      this.answer = null;
    },
  },
  computed: {
    ...mapGetters({
      questions: "GetQuestions",
    }),
    currentQuestion() {
      return this.questions[parseInt(this.$route.params.id) - 1];
    },
    currentQuestionID() {
      return parseInt(this.$route.params.id);
    },
  },
  created() {
    if (this.$store.state.Quizstarted == false) {
      return this.$router.push("/");
    }
  },
};
</script>

<style lang="scss" >
.card {
  margin: 30px 50px;
  .card-body {
    margin: 10px;
    .InnerCard {
      font-size: 22px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    .radio-body {
      border: 1px solid #ddd;
      padding: 10px 20px;
    }
  }
  .card-footer {
    .btn {
      margin: 0 5px;
      padding: 5px 10px;
    }
  }
}
</style>