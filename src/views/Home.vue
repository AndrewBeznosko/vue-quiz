<template>
  <div class="home bg-dark vh-100 text-white">
    <div class="container d-flex flex-column align-items-center justify-content-center h-100 pb-5">
      <h1 class="text-center mb-5">Vue-quiz</h1>
      <Quiz />
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
