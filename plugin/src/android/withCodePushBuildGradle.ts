import fs from 'fs/promises';
import { ExpoConfig } from '@expo/config-types';
import { AndroidConfig, ConfigPlugin, withAppBuildGradle, withDangerousMod, withSettingsGradle } from "@expo/config-plugins";

const gradleModules = `apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"`

const modifyAppBuildGradle = (contents: string): string => {
  if (!contents.includes(gradleModules)) {
    contents = contents.replace(
      "apply from: new File(reactNativeRoot, \"react.gradle\")",
      `apply from: new File(reactNativeRoot, "react.gradle")
${gradleModules}`
    );
  }
  return contents;
}


const withCodePushAppBuildGradle: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const fileInfo = await AndroidConfig.Paths.getAppBuildGradleAsync(config.modRequest.projectRoot);
      let contents = await fs.readFile(fileInfo.path, "utf-8");
      contents = modifyAppBuildGradle(contents);
      await fs.writeFile(fileInfo.path, contents);
      return config;
    }]
  )
}

export default withCodePushAppBuildGradle;