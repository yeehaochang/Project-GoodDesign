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
        publicPath: '/',
        outputDir: 'dist',
        assetsDir: 'assets',
        lintOnSave: false,
        devServer: {
                open: true,
                host: 'localhost',
                port: 8080,
                https: false,
                hotOnly: false
        }
}