<template>
  <div>
    <h1>Vue Section</h1>
    <NavLayout :routes="vue_routes"> </NavLayout>
  </div>
</template>

<script>
import NavLayout from '@/common/layouts/vue/NavLayout';
import { vue_routes } from './routes';

export default {
  components: {
    NavLayout: NavLayout
  },
  data() {
    return {
      vue_routes
    }
  },
  setup() {
  }
}
</script>

<style scoped>

</style>