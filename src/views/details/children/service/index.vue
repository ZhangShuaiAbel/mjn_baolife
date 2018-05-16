<template>
    <div class="service" v-html="detailsInfo.wareQD"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["detailsInfo"])
    }
}
</script> 

<style lang="less" src="./index.less" scoped>

</style>