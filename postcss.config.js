https://github.com/postcss/postcss/tree/master/docs
module.exports = {
    plugins: {
        autoprefixer: {
            browsers: [
                // Select browsers: https://github.com/ai/browserslist#queries
                "last 2 versions"
            ]
        }
    }
}