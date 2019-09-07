const path = require('path')
function resolve (dir) {
        return path.join(__dirname, dir)
}
module.exports = {
        css: {
                loaderOptions: {
                        sass: {
                                data: ` 
                                        @import './src/assets/all.scss';
                                        `
                        }
                }
        },
        publicPath: './',
        outputDir: 'dist',
        assetsDir: 'assets',
        lintOnSave: true,
        devServer: {
                open: true,
                host: 'localhost',
                port: 8080,
                https: false,
                hotOnly: false
        },
        configureWebpack: config => {
                //  此修改目的為：引入vue時不要採用runtime形式的文件，而
                //  採用dist/vue.esm.js形式的文件
                config.resolve = {
                        extensions: ['.js', '.vue', '.json', ".css"],
                        alias: {
                                'vue$': 'vue/dist/vue.esm.js',
                                '@': resolve('src'),
                        }
                }
        },
}