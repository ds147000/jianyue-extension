const {
  override,
} = require('customize-cra');

module.exports = {
  webpack: override(
    function (config) {
      config.output.filename = 'static/js/[name].js';
      config.output.assetModuleFilename = 'static/media/[name].[ext]';
      config.plugins = config.plugins.map((item) => {
        
        if (item.constructor.name === 'MiniCssExtractPlugin') {
          item.options.filename = 'static/css/[name].css'
        };

        return item;
      })

      return config;
    },
  ),
};

