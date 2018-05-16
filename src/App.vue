<template>
  <div id="app">
    <div class="wrap">
       <router-view class="conter"></router-view>
    </div>
  </div>
</template>

<script>
import * as mutationTypes from "@/vuex/mutations/types";
import * as actionTypes from "@/vuex/actions/types";
import * as connectURL from "@/http/common/connectURL";
import { 
  mapState, 
  mapGetters, 
  mapMutations, 
  mapActions 
} from "vuex";

export default {
  name: "app",

  data() {
    return {
      msg: "欢迎来到Vue"
    };
  },

  components: {},

  computed: {
    ...mapState(["count", "resultData"]),
    ...mapGetters(["calcNumber"]),
    currentComputed() {  }
  },

  mounted() {  },

  methods: {
    ...mapMutations({
      triggerMutation: mutationTypes.SET_MUTATION_DEFAULT
    }),
    ...mapActions({
      triggerAction: actionTypes.SET_ACTION_DEFAULT
    })
  },

  watch: {  }
};
</script>

<style lang="less">
@import "./less/core.less";
#app, html, body {
  width: 100%;
  height: 100%;
  overflow-x: hidden;;
}
.wrap {
  display: flex;
  flex-direction:column;
  height: 100%;
  width: 100%;

  .conter {
    -webkit-overflow-scrolling: touch;
    width: 750/@s;
  }
}



</style>
