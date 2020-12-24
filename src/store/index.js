import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({


  state: {
    quizStarted: false,
    questions: [],
    results: {},
    currentQuestionIndex: 1,
    quizCompleted: false,
  },

  getters: {
    getQuestions(state) {
      return state.questions.map((question, index) => {
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer
        ];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        return {
          id: index + 1,
          question: question.question,
          type: question.type,
          answers: shuffledAnswers,
        };
      });
    },

    questionsCount(state) {
      return state.questions.length;
    }
  },

  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    startQuiz(state) {
      state.quizStarted = true;
    },
    completeQuiz(state) {
      state.quizCompleted = true;
    },

    resetAnswers() {
      state.userAnswers = {};
    },

    saveAnswer(state, { answer, questionIndex }) {
      state.answers[questionIndex] = answer;
    },

    resetQuiz(state) {
      state.questions = [];
      state.answers = {};
      state.quizStarted = false;
      state.quizCompleted = false;
    },

    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index;
    },
  },

  actions: {
    getQuestions({ commit }, payload = {}) {
      return new Promise(async (resolve, reject) => {
        try {
          commit('resetQuiz');
          const {
            amount = 10,
            category = 18,
            difficulty = 'medium',
            type = 'multiple',
          } = payload;

          const params = {
            amount,
            category,
            difficulty,
            type,
          };
          const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
          const { data } = await axios.get(`https://opentdb.com/api.php?${queryString}`);
          commit('setQuestions', data.results);
          commit('startQuiz');
          resolve();
        }
        catch (error) {
          reject(error);
        }
      });

    },
  },

});
