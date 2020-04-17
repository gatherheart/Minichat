import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import WithSuspense from "./WithSuspense";

const GET_MESSAGES = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

function Chat() {
  const { data, error, loading } = useQuery(GET_MESSAGES);
  console.log(data, loading);
  if (loading) return <WithSuspense />;
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 50,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {data.messages.map((m) => (
        <View key={m.id} style={{ marginBottom: 10 }}>
          <Text>{m.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default Chat;
