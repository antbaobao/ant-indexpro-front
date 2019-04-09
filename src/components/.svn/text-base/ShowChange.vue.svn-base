<template>
    <span :class="isRed ? 'red' : 'green'">
        {{text}}
    </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    isRed: {
      type: Boolean,
      required: true,
      default: true // 取值'red'获取'green'
    }
  },
  computed: {
    text () {
      if (!this.isRed) {
        return '+' + this.value
      } else {
        return this.value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    .red {
        color: #FF0000;
        padding-right: 10px
    }

    .green {
        color: #2DB200;
        padding-right: 10px
    }
</style>
