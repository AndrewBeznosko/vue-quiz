<template>
  <form 
    @submit.prevent
    v-if="currentQuestion"
    class="card bg-secondary"
    :class="{ 'was-validated' : wasValidated }"
  >
    <div class="card-header position-relative border-0">
      <h2 class="fw-bold mb-1">{{ currentQuestion.title }}</h2>
        
        <slot name="progress" />

    </div>
    <div class="card-body py-3" :style="`min-height: ${ minHeight };`">
        <div class="card">
        <div class="list-group list-group-flush text-dark">
          <label
            v-for="(answer, i) in currentQuestion.answers"
            :key="`answer-${answer.value}-${i}`"
            class="form-check list-group-item ps-5"
            :class="{ 'disabled' : currentQuestion.is_disabled }"
          >
            <input 
              @change="$emit('change-answer', answer)"
              :value="answer.value"
              :name="`answerRadio-${currentQuestion.key}`" 
              :id="`answer-${answer.value}-${i}`" 
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

    <slot name="controls" />
  </form>
</template>

<script>
export default {
  name: 'QuizQuestion',
  props: {
    currentQuestion: {
      type: Object,
      default: undefined
    },
    minHeight: {
      type: String,
      default: '0px'
    },
    wasValidated: {
      type: Boolean,
      default: false
    },
  }
}
</script>