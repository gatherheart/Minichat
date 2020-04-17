import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import withSuspense from "./WithSuspense";

const CHAT = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

function Chat() {
  const { data, error } = useQuery(CHAT, { suspense: true });
  console.log(data);
  if (!data) return null;
  const { messages } = data;

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 50,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {messages
        ? messages.map((message) => (
            <Text key={message.id}>{message.text}</Text>
          ))
        : null}
    </ScrollView>
  );
}

export default withSuspense(Chat);
