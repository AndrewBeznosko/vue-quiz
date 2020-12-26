<template>
  <div class="progress" :style="`height: ${height};`">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="`width: ${progress}%`"></div>
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
        height: {
            type: String,
            default: '2px'
        }
    }
}
</script>

<style>

</style>