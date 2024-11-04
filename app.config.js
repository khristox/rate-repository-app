import 'dotenv/config';

export default  {
    "name": "rate-repository-app",
    "slug": "rate-repository-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    
    extra: {
      env: process.env.ENV,
      apolloUrl: process.env.APOLLO_URI,
      apiUrl: process.env.API_URL,
      graphqlUrl: process.env.GRAPHQL_URL,
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
      githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,



    },
    login:{
      AUTHEN_TOKEN:"auth.accessToken",
      USER_NAME:"user.username"
    }
  }

