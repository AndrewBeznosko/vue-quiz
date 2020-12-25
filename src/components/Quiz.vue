<template>
  <div class="vue-quiz">
    <form 
      class="card bg-secondary"
      :class="{ 'was-validated' : was_validated }"
    >
      <div class="card-header position-relative border-0">
        <h2 class="fw-bold mb-1">Question question question?</h2>
        <div class="progress position-absolute w-100 start-0 bottom-0 rounded-0" style="height: 2px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
        </div>
      </div>
      <div class="card-body py-5">
        <div class="card">
          <div class="list-group list-group-flush text-dark">

            <div class="form-check list-group-item ps-5">
              <input 
                class="form-check-input" 
                type="radio" 
                name="flexRadioDefault" 
                id="flexRadioDefault1" 
                required
              >
              <label 
                class="form-check-label fw-bold" 
                for="flexRadioDefault1"
              >
                Default radio
              </label>
            </div>

            <div class="form-check list-group-item  ps-5">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" required>
              <label class="form-check-label fw-bold" for="flexRadioDefault2">
                Default checked radio
              </label>
            </div>

          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <button type="button" class="btn btn-outline-light disabled">Preview</button>
        <button @click.prevent="validate($event)" type="button" class="btn btn-primary ml-auto fw-bold">Step</button>
      </div>
    </form>
  </div>
</template>

<script>  
  export default {
    name: 'Quiz',
    props: {
      msg: String
    },
    data() {
      return {
        was_validated: false,
        current_index: 0
      }
    },
    methods: {
      validate(e) {
        e.target.closest('form').requestSubmit()
        this.was_validated = true
        this.toNextStep()
      },
      toNextStep() {
        this.current_index++
      },
    }
  }
</script>

<style scoped lang="scss">

</style>