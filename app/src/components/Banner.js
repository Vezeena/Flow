import { Pressable, View, Text, ActivityIndicator } from "react-native";

import { colours } from "../styles/colours.js";
import { pressableDefaults } from "../styles/sharedStyles.js";
import { bannerStyles } from "./bannerStyles.js";

/** Screen banner. */
export function Banner({ children, color = "amber", loading, action, actionText }) {
  return (
    <View style={[bannerStyles.banner, bannerStyles[color]]}>
      <Text style={bannerStyles.text}>{children}</Text>
      {loading && <ActivityIndicator size="small" color={colours.primary} />}
      {!loading && action && (
        <View style={bannerStyles.actionContainer}>
          <Pressable onPress={action} {...pressableDefaults}>
            <Text style={bannerStyles.action}>{actionText}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
