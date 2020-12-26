<template>
  <div class="vue-quiz">
    <template v-if="!show_results">
      <QuizQuestion
        @change-answer="onAnswer"
        :was-validated="was_validated"
        :current-question="currentQuestion"
        min-height="250px"
      >
        <template slot="progress">
          <ProgressBar
            :progress="progress"
            mod="progress-bar-striped progress-bar-animated bg-success"
            class="w-100 position-absolute start-0 bottom-0 rounded-0"
          />
        </template>
        <template slot="controls">
          <div class="card-footer d-flex justify-content-between">
            <button 
              @click="toPreventStep()" 
              type="button" 
              class="btn btn-outline-light"
              v-bind="{ 'disabled' : current_index <= 0 }"
            >
              Prevent
            </button>
            <button 
              @click="reset()" 
              type="button" 
              class="btn ms-3 me-auto"
              v-bind="{ 'disabled' : current_index <= 0 }"
            >
              <img src="@/assets/images/redo.svg" alt="redo" width="15"/>
            </button>
            <button 
              @click.prevent="validate($event)" 
              type="button" 
              class="btn btn-primary ml-auto fw-bold"
            >
              {{ isLastQuestion ? 'Finish' : 'Step' }}
            </button>
          </div>
        </template>
      </QuizQuestion>
    </template>
    <template v-else>
      <QuizQuestion
        v-for="question in questions"
        :key="question.key"
        @change-answer="onAnswer"
        :was-validated="was_validated"
        :current-question="question"
        class="mb-3"
      /> 
    </template>
  </div>
</template>

<script>  
import Utils from '@/modules/Utils'
import ProgressBar from '@/components/ProgressBar'
import QuizQuestion from '@/components/QuizQuestion'

export default {
  name: 'Quiz',
  components: {
    ProgressBar,
    QuizQuestion
  },
  props: {
    questionsProp: {
      type: Array, 
      default: [], 
    }
  },
  data() {
    return {
      was_validated: false,
      show_results: false,
      questions: [],
      current_index: 0,
      progress: 0
    }
  },
  computed: {
    totalQuestions() {
      return this.questions.length
    },  
    isLastQuestion() {
      return (this.questions.length-1 == this.current_index) ? true : false
    },
    nextQuestionIndex() {
      return this.isLastQuestion ? this.current_index : this.current_index + 1
    },
    answersArr() {
      let arr = []
      this.questions.forEach(el => {
        if(el.answer) arr.push(el.answer)
      })
      return arr
    },
    currentQuestion: {
      get() {
        return this.questions[this.current_index]
      },
      set(ques) {
        this.questions[this.current_index] = ques
      }
    },
  },
  methods: {
    validate(e) {
      e.target.closest('form').requestSubmit()
      this.was_validated = true
      if(this.currentQuestion.answer) this.toNextStep()
    },
    async toNextStep() {
      await this.checkSubQuestionExisting()
      await this.checkQuestionShowIf()
      this.currentQuestion.is_disabled = true
      this.was_validated = false
      this.countProgress()

      if(this.isLastQuestion) {
        this.showResults()
      } else {
        this.current_index++
      }
    },
    toPreventStep() {
      this.current_index--
      this.was_validated = false
    },
    onAnswer(answer) {
      this.currentQuestion.answer = answer.value
    },
    checkSubQuestionExisting() {
      return new Promise((resolve, reject) => {
        let answer = this.currentQuestion.answers.find(el => el.value == this.currentQuestion.answer)
        if(answer && answer['sub']) {
          this.questions.splice(this.nextQuestionIndex, 0, answer.sub)
          delete answer.sub
        }
        resolve()
      })
    },
    checkQuestionShowIf() {
      return new Promise((resolve, reject) => {
        let show_if = this.questions[this.nextQuestionIndex].show_if
        if(show_if && !Utils.mustContainsAllValues(this.answersArr, show_if) ) {
          this.questions.splice(this.nextQuestionIndex, 1)
        }
        resolve()
      })
    },
    showResults() {
      this.show_results = true
    },
    countProgress() {
      let answered = this.questions.filter(el => el.answer).length
      this.progress = Math.round((answered*100)/this.totalQuestions)
    },
    reset() {
      this.questions = [...this.questionsProp].map(obj => {
        return Object.assign(obj, {
            answer: undefined,
            is_disabled: false
          });
      })
      this.current_index = 0
      this.was_validated = false
      this.countProgress()
    }
  },
  mounted() {
    this.reset() 
  }
}
</script>