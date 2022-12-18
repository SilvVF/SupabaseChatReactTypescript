import {Text, View} from "react-native";

type MessageProps = {
    message : IMessage
}
export const MessageItem = ({message: {color, sender, ...rest}}: MessageProps) => {

    function getColor(c: number): string {
        switch (c) {
            case 0: return  "#a9a9a9"
            case 1: return  "#00bfff"
            case 2: return  "#7cfc00"
            case 3: return  "#ff00ff"
            case 5: return  "#00ffff"
            case 6: return  "#ffff00"
            default: return "#ff0000"
        }
    }

    return (
        <View style={{
            paddingTop: 4,
            paddingBottom: 4,
            paddingStart: 4,
            flexDirection: "row"
        }}>
            <Text style={{
                color: getColor(color),
                paddingEnd: 8
            }}>
                {sender}
            </Text>
            <Text>
                {rest.content}
            </Text>
        </View>
    )
}
