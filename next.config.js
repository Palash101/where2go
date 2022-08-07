const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale:'en',
  },
  env:{
    PROD_API:'https://www.where2go.qa/',
    DEV_API:'http://localhost:3000',
    DEBUG:true,
    
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: (config, { isServer })  => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config
  }
}
