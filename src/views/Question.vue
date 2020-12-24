<template>
  <b-card :header="questionText" v-if="currentQuestion" footer-class="text-left" header-class="text-left" header-tag="h4">
      <template v-if="currentQuestion.type === 'multiple'">
        <b-list-group class="text-left">
          <b-list-group-item :key="`answer-${index}`" v-for="(questionAnswer, index) in currentQuestion.answers">
            <b-form-radio name="answer" v-model="answer" :value="questionAnswer">
              <span v-html="questionAnswer"></span>
            </b-form-radio>
          </b-list-group-item>
        </b-list-group>
      </template>

    <template #footer>
      <b-button class="mr-3" type="button" @click="previousQuestion" :disabled="isFirstQuestion">
        <font-awesome-icon icon="angle-left"></font-awesome-icon> {{ "Previous" }}
      </b-button>
      <b-button type="button" @click="nextQuestion">
        <font-awesome-icon icon="angle-right"></font-awesome-icon> {{ isLastQuestion ? "Finish" : "Next" }}
      </b-button>
    </template>
  </b-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Question",

  data() {
    return {
      answer: null
    };
  },

  computed: {
    ...mapGetters({
      questions: "getQuestions"
    }),

    currentQuestion() {
      return this.questions[this.currentQuestionIndex - 1];
    },

    currentQuestionIndex() {
      return parseInt(this.$route.params.id);
    },

    isLastQuestion() {
      return this.currentQuestionIndex === this.questions.length;
    },

    isFirstQuestion() {
      return this.currentQuestionIndex === 1;
    },

    questionText() {
      return this.currentQuestion ? `${this.currentQuestionIndex}. ${this.currentQuestion.question}` : ''
    }
  },

  methods: {
    ...mapMutations(["saveAnswer", "setCurrentQuestionIndex", "completeQuiz"]),

    nextQuestion() {
      this.saveCurrentAnswer();
      if (this.isLastQuestion) {
        this.checkResult();
      } else {
        this.$router.push(`/questions/${this.currentQuestionIndex + 1}`);
      }
    },

    previousQuestion() {
      this.saveCurrentAnswer();
      if (this.isFirstQuestion) {
        this.$router.push("/");
      } else {
        this.$router.push(`/questions/${this.currentQuestionIndex - 1}`);
      }
    },

    saveCurrentAnswer() {
      this.saveAnswer({
        questionIndex: this.currentQuestionIndex,
        answer: this.answer
      });
      this.answer = null;
    },

    checkResult() {
      this.completeQuiz();
      this.$router.push('/results');
    }
  },

  watch: {
    currentQuestionIndex: {
      immediate: true,
      handler(index) {
        this.setCurrentQuestionIndex(index);
      }
    }
  },
};
</script>