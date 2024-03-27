const module = {
    webpack: {
        configure: (webpackConfig : any, {env, paths} : { env: any, paths : any }) => {
            webpackConfig.rules = webpackConfig.rules.concat([
                { // here doing the swiper loader and declaring no sideEffects
                    test: /swiper\.esm\.js/,
                    sideEffects: false
                }
            ])
            return webpackConfig;
        },
    },
};

export default module;