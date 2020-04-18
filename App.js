import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { ApolloProvider } from "@apollo/react-hooks";
import * as Permissons from "expo-permissions";
import { Notifications } from "expo";
import client from "./apollo";
import Chat from "./Chat";

export default function App() {
  const [noticeStatus, setNoticeStatus] = useState(false);
  const ask = async () => {
    const { status } = await Permissons.askAsync(Permissons.NOTIFICATIONS);
    setNoticeStatus(status);
    let token = await Notifications.getExpoPushTokenAsync();

    console.log(token);
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("chat-messages", {
        name: "Messages",
        priority: "max",
        sound: true,
        vibrate: [0, 250, 500, 250],
      });
    }
  });

  useMemo(() => {
    ask();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
