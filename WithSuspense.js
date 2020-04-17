import React from "react";
import { View, ActivityIndicator } from "react-native";
// Suspense UI fallback
export default function () {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
