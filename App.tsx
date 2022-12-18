import { StatusBar } from 'expo-status-bar';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useEffect, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {listenForMessages, sendMessage} from "./src/data/ChatService";
import { Dimensions } from "react-native";
import {MessageItem} from "./src/components/MessageItem";
import {TextFieldWithClear} from "./src/components/TextFieldWithClear";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height



export default function App() {
  return (
    <View style={styles.container}>
        <SafeAreaProvider>
          <ChatScreen chatColor={(Math.floor(Math.random() * 8))}/>
          <StatusBar style="auto" />
        </SafeAreaProvider>
    </View>
  );
}

type ChatProps = {
    chatColor: number
}
const ChatScreen = ({chatColor}: ChatProps) => {

    const insets = useSafeAreaInsets()


    const [userMessage, setUserMessage] = useState("")
    const [userName, setUserName] = useState("")

    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {
        listenForMessages((msg) => {
           setMessages(messages => [msg, ...messages])
        })
            .catch(error => error)
    })
    function sendMessageHandler() {
        const message: OMessage = {
            content: userMessage,
            sender: userName,
            color: chatColor
        }
        sendMessage(message)
            .catch(error => console.log(error))
    }



  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1, paddingTop: insets.top}}
      >
      <FlatList
          keyExtractor={(message) => message.id}
          data={messages}
          renderItem={({item}) => (
              <MessageItem message={item} />
          )}
          style={{width: width, height: "80%"}}
      />
          <TextFieldWithClear
              text={userName}
              onClearPress={() => { setUserName("")}}
              onChangeText={setUserName}
              hint={"username"}
          />
          <TextFieldWithClear
              text={userMessage}
              onClearPress={() => { setUserMessage("") }}
              onChangeText={setUserMessage}
              hint={"message..."}
          />
            <TouchableOpacity
                onPress={sendMessageHandler}
                style={{
                    width: "80%",
                    height: 35,
                    alignSelf: "center",
                    elevation: 2,
                    backgroundColor: "#1e90ff",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20
                }}>
                <Text style={{color: "#ffffff"}}>send message</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#fff',
    },
});




