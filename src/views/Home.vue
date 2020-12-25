<template>
  <div class="home bg-dark text-white">
    <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 pb-5">
      <h1 class="text-center mb-5 mt-3">Vue-quiz</h1>
      <div class="col-lg-5 col-12 mb-lg-5">
          <Quiz v-if="QUESTIONS.length" :questions-prop="QUESTIONS"/>
      </div>
    </div>
  </div>
</template>

<script>
import { QUESTIONS } from '@/api/questions'
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'Home',
  components: {
    Quiz
  },
  created() {
    this.QUESTIONS = QUESTIONS
  }
}
</script>
