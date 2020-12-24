import Vue from "vue";
import Vuex, { mapActions } from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    Quizstarted: false,
    results: {},
  }, 
  mutations: {
    UpdateQuestions(state, questions) {
      state.questions = questions;
    },
    UpdateQuizStarted(state, started) {
      state.Quizstarted = started;
    },
    UpdateResult(state, {result,id}) {
      state.results[id] = result; 
     },
  },
  getters: {
    GetQuestions(state) {
      return state.questions.map((item, idx) => {
        var answers = [...item.incorrect_answers, item.correct_answer];
        var currentIndex = answers.length,
          temporaryValue,
          randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = answers[currentIndex];
          answers[currentIndex] = answers[randomIndex];
          answers[randomIndex] = temporaryValue;
        }
        return {
          id: idx,
          category: item.category,
          type: item.type,
          difficulty: item.difficulty,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,
          allanswers: answers,
          question: item.question
        };
      });
    },
  },
  actions: {
    fetchQuestion({ commit }) {
      axios
        .get(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
        )
        .then((res) => {
          commit("UpdateQuestions", res.data.results);
          commit("UpdateQuizStarted", true);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
  },
  modules: {},
});
