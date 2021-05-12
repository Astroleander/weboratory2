<template>
    <div :class="cls(styles.alert, styles[type])">
      <slot/>
    </div>
</template>

<script>
import cls from 'classnames';
import styles from '@/common/styles/alert.modules.less';

export default {
  methods: {
    cls,
  },
  data() {
    return {
      styles,
    }
  },
  props:{
    type: {}
  },
  setup() {
  }
}
</script>

<style scoped>

</style>