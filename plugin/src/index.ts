import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import {
  AndroidProps,
  withAndroidAppCenterConfigFile,
} from "./android";
import { WithCodePushStringXML } from "./android/updateStringsXml";

import { withCodePushAppDelegate,  } from "./ios";
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
 * A config plugin for configuring `appcenter`
 */
const withAppCenter: ConfigPlugin<PluginProps> = (
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
    [
      WithCodePushStringXML,
      props.androidKeys ? props.androidKeys[props.type] || "" : "",
    ]
    // Android
    
  ]);
};

export default withAppCenter;
