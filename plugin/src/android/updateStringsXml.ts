import {
  AndroidConfig,
  ConfigPlugin,
  withStringsXml,
} from "@expo/config-plugins";

export const WithCodePushStringXML: ConfigPlugin<string> = (config, codePushKey) => {
  return withStringsXml(config, (config) => {
    config.modResults = setStrings(
      config.modResults,
      "CodePushDeploymentKey",
      codePushKey
    );
    return config;
  });
};

function setStrings(
  strings: AndroidConfig.Resources.ResourceXML,
  name: string,
  value: string
) {
  // Helper to add string.xml JSON items or overwrite existing items with the same name.
  return AndroidConfig.Strings.setStringItem(
    [
      // XML represented as JSON
      //   { $: { name: 'expo_custom_value', translatable: 'false' }, _: value },
      { $: { name, translatable: "false" }, _: value },
    ],
    strings
  );
}
