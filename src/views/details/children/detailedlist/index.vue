<template>
    <div class="detailed_list" v-html="detailsInfo.param"></div>
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