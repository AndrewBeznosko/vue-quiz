<template>
  <div class="vue-quiz">
    <form 
      @submit.prevent
      v-if="currentQuestion"
      class="card bg-secondary"
      :class="{ 'was-validated' : was_validated }"
    >
      <div class="card-header position-relative border-0">
        <h2 class="fw-bold mb-1">{{ currentQuestion.title }}</h2>
        <div class="progress position-absolute w-100 start-0 bottom-0 rounded-0" style="height: 2px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
        </div>
      </div>
      <div class="card-body py-3" style="min-height: 250px;">
        <div class="card">
          <div class="list-group list-group-flush text-dark">

            <label
              v-for="(answer, i) in currentQuestion.answers"
              :key="`answer-${current_index}-${i}`"
              class="form-check list-group-item ps-5"
            >
              <input 
                @change="questions[current_index].answer = answer.value"
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
          @click.prevent="!isLastQuestion ? validate($event) : showResults()" 
          type="button" 
          class="btn btn-primary ml-auto fw-bold"
        >{{ isLastQuestion ? 'Finish' : 'Step' }}</button>
      </div>
    </form>
  </div>
</template>

<script>  
  export default {
    name: 'Quiz',
    props: {
      questionsProp: {
        type: Array, 
        default: [], 
      }
    },
    data() {
      return {
        was_validated: false,
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
      currentQuestion() {
        return this.filteredQuestions[this.current_index]
      },
      filteredQuestions: {
        get() {
          return this.questions.map((el) => {
            if(!el['answer']) el['answer'] = ''

            return el
          })
        },
        set(questions) {
          this.questions = questions
        }
      }
    },
    methods: {
      validate(e) {
        e.target.closest('form').requestSubmit()
        this.was_validated = true
        if(this.questions[this.current_index].answer) this.toNextStep()
      },
      toNextStep() {
        this.current_index++
        this.was_validated = false
      },
      toPreventStep() {
        this.current_index--
        this.was_validated = false
      }
    },
    mounted() {
      this.questions = this.questionsProp
    }
  }
</script>

<style scoped lang="scss">

</style>