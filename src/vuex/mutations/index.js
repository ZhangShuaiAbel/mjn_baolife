import * as mutationTypes from './types';

// Mutation
const mutations = function ( state ) {
    return {
        // 详情页详细信息
        [mutationTypes.DETAILS_INFO]: function (state, options) {
            state.detailsInfo = options;
        }
    }
}
export default mutations