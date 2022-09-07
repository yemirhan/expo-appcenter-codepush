# expo-appcenter-codepush

Expo plugin for React Native CodePush SDK

# Installation in managed Expo projects

For managed [managed](https://docs.expo.io/versions/latest/introduction/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `react-native-unimodules` package](https://github.com/expo/expo/tree/master/packages/react-native-unimodules) before continuing.

### Add the package to your npm dependencies

#### Prerequisites:

- App project using Expo SDK 41+.
- Installed `expo-cli@4.4.4` or later.
- Installed `react-native-code-push` JavaScript libraries:

```sh
yarn add react-native-code-push
```

#### With `expo install`

```
expo install expo-appcenter-codepush
```

#### Without `expo install`

```sh
# using yarn
yarn add expo-appcenter-codepush

# using npm
npm install expo-appcenter-codepush
```

Open your `app.json` and update your `plugins` section (`expo install` would do it for you):

```json
{
  "plugins": [
    ["expo-appcenter-codepush",
    {
      "type": "appSecret",
      "androidKeys": {
        "appSecret": "YOUR_APP_SECRET"
      },
      "iosKeys": {
        "appSecret": "YOUR_APP_SECRET",
        "appSecret2": "YOUR_APP_SECRET"
      }
    }]
    }
    ]
  ]
}
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
