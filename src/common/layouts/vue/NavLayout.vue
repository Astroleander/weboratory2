<template>
  <div>
    <Alert type="error" v-if="!routes">{{LayoutStrings.Route_Loading_Failed}}</Alert>
    <Alert type="warning" v-else-if="!routes.length">{{LayoutStrings.Route_Empty}}</Alert>
    <template v-else>
      <li :v-for="route in routes" :key="route.path">{{route.name}}</li>
    </template>
  </div>
</template>

<script>
import { LayoutStrings } from '@/common/utils/LayoutStringUtil';
import cls from 'classnames';
import Alert from '@/common/components/fallbacks/Alert.vue';

export default {
  components: { Alert },
  props: {
    routes: {
      required: true
    }
    // with_react_router_dom,
    // className,
  },
  data() {
    return {
      LayoutStrings,
      
    }
  },
  setup() {
  }
}
</script>