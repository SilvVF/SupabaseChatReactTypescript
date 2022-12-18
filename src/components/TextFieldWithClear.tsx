import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";


type TextFieldWithClearProps = {
    text: string,
    hint: string,
    onClearPress: () => void
    onChangeText: (text: string) => void
}
export const TextFieldWithClear = ({text, onClearPress, onChangeText, hint}: TextFieldWithClearProps) => {

    return (
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
                placeholder={hint}
            />
            <Pressable style={{flex: 1}} onPress={onClearPress}>
                <Text style={{color: "#1e90ff"}}>clear</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        flex: 3
    },
});