import fs from 'fs/promises';
import { AndroidConfig, ConfigPlugin, withDangerousMod } from "@expo/config-plugins";

const settingsString = `include ':app', ':react-native-code-push'
project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')`

const modifySettingsGradle = (contents: string): string => {
  if (!contents.includes(settingsString)) {
    contents = `${contents}
    ${settingsString}`
  }
  return contents;
}


const withCodePushSettingsGradle: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const fileInfo = await AndroidConfig.Paths.getSettingsGradleAsync(config.modRequest.projectRoot);
      let contents = await fs.readFile(fileInfo.path, "utf-8");
      contents = modifySettingsGradle(contents);
      await fs.writeFile(fileInfo.path, contents);
      return config;
    }
  ])
}

export default withCodePushSettingsGradle;