<template>
  <div class="vue-quiz">
    <template v-if="!show_results">
      <form 
        @submit.prevent
        v-if="currentQuestion"
        class="card bg-secondary"
        :class="{ 'was-validated' : was_validated }"
      >
        <div class="card-header position-relative border-0">
          <h2 class="fw-bold mb-1">{{ currentQuestion.title }}</h2>
          
          <ProgressBar
            :progress="progress"
            mod="progress-bar-striped progress-bar-animated bg-success"
            class="position-absolute w-100 start-0 bottom-0 rounded-0"
          />

        </div>
        <div class="card-body py-3" style="min-height: 250px;">
          <div class="card">
            <div class="list-group list-group-flush text-dark">

              <label
                v-for="(answer, i) in currentQuestion.answers"
                :key="`answer-${current_index}-${i}`"
                class="form-check list-group-item ps-5"
                :class="{ 'disabled' : currentQuestion.is_disabled }"
              >
                <input 
                  @change="onAnswer(answer)"
                  :value="answer.value"
                  :name="`answerRadio-${currentQuestion.key}`" 
                  :id="`answer-${current_index}-${i}`" 
                  v-bind="{ 'checked' : currentQuestion.answer == answer.value }"
                  class="form-check-input" 
                  type="radio" 
                  required
                >
                <span class="form-check-label fw-bold">{{ answer.title }}</span>
              </label>

            </div>
          </div>
        </div>
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
            @click.prevent="validate($event)" 
            type="button" 
            class="btn btn-primary ml-auto fw-bold"
          >{{ isLastQuestion ? 'Finish' : 'Step' }}</button>
        </div>
      </form>
    </template>
    <template v-else>
      <form 
        @submit.prevent
        v-for="question in questions"
        :key="question.key"
        class="card bg-secondary mb-3"
        :class="{ 'was-validated' : was_validated }"
      >
        <div class="card-header position-relative border-0">
          <h2 class="fw-bold mb-1">{{ question.title }}</h2>
        </div>
        <div class="card-body py-3">
          <div class="card">
            <div class="list-group list-group-flush text-dark">

              <label
                v-for="(answer, i) in question.answers"
                :key="`answer-${current_index}-${i}`"
                class="form-check list-group-item ps-5"
                :class="{ 'disabled' : question.is_disabled }"
              >
                <input 
                  @change="onAnswer(answer)"
                  :value="answer.value"
                  :name="`answerRadio-${question.key}`" 
                  :id="`answer-${current_index}-${i}`" 
                  v-bind="{ 'checked' : question.answer == answer.value }"
                  class="form-check-input" 
                  type="radio" 
                  required
                >
                <span class="form-check-label fw-bold">{{ answer.title }}</span>
              </label>

            </div>
          </div>
        </div>
      </form>
    </template>
  </div>
</template>

<script>  
import Utils from '@/modules/Utils'
import ProgressBar from '@/components/ProgressBar'

export default {
  name: 'Quiz',
  components: {
    ProgressBar
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
      current_index: 0
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
        return this.transformedQuestions[this.current_index]
      },
      set(ques) {
        this.questions[this.current_index] = ques
      }
    },
    transformedQuestions: {
      get() {
        return this.questions.map((el) => {
          // Object.assign(el, {
          //   answer: undefined,
          //   is_disabled: false
          // });

          if(!el['answer']) el['answer'] = undefined
          if(!el['is_disabled']) el['is_disabled'] = false

          return el
        })
      },
      set(questions) {
        this.questions = questions
      }
    },
    progress() {
      let answered = this.questions.filter(el => el.answer).length;
      return Math.round((answered*100)/this.totalQuestions)
    },
  },
  methods: {
    validate(e) {
      e.target.closest('form').requestSubmit()
      this.was_validated = true
      if(this.questions[this.current_index].answer) this.toNextStep()
    },
    async toNextStep() {
      await this.checkSubQuestionExisting()
      await this.checkQuestionShowIf()
      this.currentQuestion.is_disabled = true
      this.was_validated = false

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
      this.questions[this.current_index].answer = answer.value
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
    }
  },
  mounted() {
    this.questions = this.questionsProp
  }
}
</script>