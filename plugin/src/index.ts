import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import { WithCodePushStringXML } from "./android/updateStringsXml";
import withCodePushAppBuildGradle from "./android/withCodePushBuildGradle";
import withCodePushMainApplication from "./android/withCodePushMainApplication";
import withCodePushSettingsGradle from "./android/withCodePushSettingsGradle";
import { withCodePushAppDelegate } from "./ios/appDelegate";

import { codePushInfoPlist } from "./ios/codePushInfoPlist";
interface Keys {
  production: string;
  development: string;
  staging: string;
}
interface PluginProps {
  type: "production" | "staging" | "development";
  iosKeys?: Keys;
  androidKeys?: Keys;
}

/**
 * A config plugin for configuring `appcenter-codepush`
 */
const withAppCenterCodePush: ConfigPlugin<PluginProps> = (
  config,
  props
) => {
  return withPlugins(config, [
    // iOS
    withCodePushAppDelegate,
    [
      codePushInfoPlist,
      props.iosKeys ? props.iosKeys[props.type] || "" : "",
    ],
    // Android
    [
      WithCodePushStringXML,
      props.androidKeys ? props.androidKeys[props.type] || "" : "",
    ],
    withCodePushSettingsGradle,
    withCodePushAppBuildGradle,
    withCodePushMainApplication
  ]);
};

export default withAppCenterCodePush;
