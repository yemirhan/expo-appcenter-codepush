import { ConfigPlugin, InfoPlist, withInfoPlist } from '@expo/config-plugins';
import { ExpoConfig } from '@expo/config-types';

// Pass `<string>` to specify that this plugin requires a string property.
export const codePushInfoPlist: ConfigPlugin<string> = (config, id) => {
  return withInfoPlist(config, config => {
    config.modResults.CodePushDeploymentKey = id;
    return config;
  });
};
