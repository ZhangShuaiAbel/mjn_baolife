const utils = class {
    static devServer() {
        return {
            historyApiFallback: true,
            noInfo: true,
            overlay: true,
            publicPath: '/',
            inline: true,
            // host: '127.0.0.1',
            port: 8083,
            disableHostCheck: true
        }
    }
}

module.exports = utils;