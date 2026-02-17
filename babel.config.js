module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        env: {
            test: {
                presets: [['module:metro-react-native-babel-preset', { disableImportExportTransform: true }]],
            },
        },
    };
};
