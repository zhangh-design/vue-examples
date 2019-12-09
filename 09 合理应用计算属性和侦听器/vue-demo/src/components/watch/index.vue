<template>
  <div>
    <computed />
    <watch></watch>
    <br/>
    <Computed1></Computed1>
    <watch1></watch1>
  </div>
</template>
<script>
import Computed from './Computed';
import Computed1 from './Computed1';
import Watch from './Watch';
import Watch1 from './Watch1';
/* import WatchPro from './Watch1_pro'; */
export default {
  components: {
    Computed,
    Computed1,
    Watch,
    Watch1
    // WatchPro
  }
};
</script>
