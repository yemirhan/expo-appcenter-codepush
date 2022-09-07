import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import { WithCodePushStringXML } from "./android/updateStringsXml";
import withCodePushAppBuildGradle from "./android/withCodePushBuildGradle";
import withCodePushMainApplication from "./android/withCodePushMainApplication";
import withCodePushSettingsGradle from "./android/withCodePushSettingsGradle";
import { withCodePushAppDelegate } from "./ios/appDelegate";

import { codePushInfoPlist } from "./ios/codePushInfoPlist";
interface PluginProps {
  type: string;
  iosKeys?: Record<string,string>;
  androidKeys?: Record<string,string>;
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
