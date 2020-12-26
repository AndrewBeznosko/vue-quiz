<template>
  <div 
    class="progress" 
    :style="`height: ${height};`"
  >
    <div 
      class="progress-bar" 
      :class="mod"
      role="progressbar" 
      aria-valuemin="0" 
      aria-valuemax="100" 
      :aria-valuenow="progress" 
      :style="`width: ${progress}%`"
    ></div>
  </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        progress: {
            type: Number,
            default: 0
        },
        mod: {
            type: String
        },
        height: {
            type: String,
            default: '2px'
        }
    }
}
</script>

<style>

</style>