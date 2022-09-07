import fs from 'fs/promises';
import { AndroidConfig, ConfigPlugin, withDangerousMod } from "@expo/config-plugins";

const codePushImport = "import com.microsoft.codepush.react.CodePush;"
const bundleOverride = `@Override
protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
}`
const reactNativeHostEntry = `new ReactNativeHost(this) {`
const modifyMainApplication = (contents: string): string => {
  if (!contents.includes(codePushImport)) {
    contents = contents.replace(
      /package com\.shix\;/g,
      `package com.shix;
${codePushImport}`
    );
  }
  if (!contents.includes("return CodePush.getJSBundleFile();")) {
    contents = contents.replace(/new ReactNativeHost\(this\) \{/g, `${reactNativeHostEntry}
${bundleOverride}`)
  }
  return contents;
}


const withCodePushMainApplication: ConfigPlugin = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const fileInfo = await AndroidConfig.Paths.getMainApplicationAsync(config.modRequest.projectRoot);
      let contents = await fs.readFile(fileInfo.path, "utf-8");
      contents = modifyMainApplication(contents);
      await fs.writeFile(fileInfo.path, contents);
      return config;
    }
  ])
}

export default withCodePushMainApplication;