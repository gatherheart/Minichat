import React, { Suspense } from "react";
import { View, ActivityIndicator } from "react-native";
// Suspense UI fallback
export default function withSuspense(Component) {
  return () => (
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      }
    >
      <Component />
    </Suspense>
  );
}
