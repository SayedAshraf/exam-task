<template>
  <b-card header="Results" header-class="text-left">
    <b-table sticky-header bordered foot-clone head-variant="light" :fields="fields" :items="questionsWithAnswers">
      <template #cell(user_answer)="data">
        <span :class="[data.item.correct ? 'text-success' : 'text-danger']">
          <font-awesome-icon :icon="data.item.correct ? 'check-circle' : 'times-circle'"></font-awesome-icon>
          {{ data.value }}
        </span>
      </template>

      <template #cell()="data">
        <span v-html="data.value"></span>
      </template>

      <template #cell(points)="data">
        <span :class="[data.item.correct ? 'text-success' : 'text-danger']">
          {{ data.value }}
        </span>
      </template>

      <!-- A custom formatted footer cell for field 'name' -->
      <template #foot(text)>
        <span > Total Points </span>
      </template>

      <!-- Default fall-back custom formatted footer cell -->
      <template #foot(points)>
        <b> {{ correctQuestions.length }} </b>
      </template>

      <template #foot()>
        <span></span>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Result",

  computed: {
    ...mapState(["answers", "questions"]),

    questionsWithAnswers() {
      return this.questions.map((question, index) => {
        const answer = this.answers[index + 1];
        const correctAnswer = question.correct_answer;
        return {
          text: question.question,
          correct_answer: correctAnswer,
          user_answer: answer,
          correct: answer === correctAnswer
        };
      });
    },

    correctQuestions() {
      return this.questionsWithAnswers.filter(question => question.correct);
    }
  },

  data() {
    return {
      fields: [
        {
          key: "text",
          label: "The Question"
        },
        {
          key: "correct_answer",
          label: "Correct Answer"
        },
        {
          key: "user_answer",
          label: "Your Answer"
        },
        {
          key: "points",
          label: "Points",
          formatter: (value, key, item) => {
            return item.correct ? 1 : 0;
          }
        }
      ]
    };
  }
};
</script>