import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import WithSuspense from "./WithSuspense";

const GET_MESSAGES = gql`
  query getMessages {
    messages {
      id
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

function Chat() {
  // Get Messages using apollo-client from server
  const { data, error, loading } = useQuery(GET_MESSAGES);
  const [message, setMessage] = useState("");

  // To Save Historical Data
  const [messages, setMessages] = useState([]);
  const [sendMessageMutation, _] = useMutation(SEND_MESSAGE);

  const onChangeText = (text) => {
    console.log(text);
    setMessage(text);
  };

  const onSubmit = async () => {
    if (message === "") return;

    try {
      await sendMessageMutation({
        variables: { text: message },
      });
      setMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  // Use Memoization, not causing re-rendering
  useMemo(() => {
    setMessages(data?.messages);
  }, [data]);

  if (loading || !messages) return <WithSuspense />;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 50,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {messages.map((m) => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))}

        <TextInput
          style={{
            marginTop: 50,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "#f2f2f2",
          }}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          value={message}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={"Type a message"}
          returnKeyType={"send"}
        ></TextInput>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Chat;
