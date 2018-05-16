<template>
    <div class="details_info" v-html="detailsInfo.introduction"></div>
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