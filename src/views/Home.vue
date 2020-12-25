<template>
  <div class="home bg-dark text-white">
    <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 pb-5">
      <h1 class="text-center mb-5 mt-3">Vue-quiz</h1>
      <div class="mb-lg-5">
          <Quiz />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Quiz from '@/components/Quiz.vue'

export default {
  name: 'Home',
  components: {
    Quiz
  }
}
</script>
