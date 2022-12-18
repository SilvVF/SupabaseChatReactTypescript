import {supabase} from "./supabase-client";

export async function listenForMessages(onReceived: (message: IMessage) => void) {
    supabase
        .channel('public:messages')
        .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'messages'}, payload => {
            onReceived({
                color: payload.new["color"],
                content: payload.new["content"],
                id: payload.new["id"],
                sender: payload.new["sender"],
                time: payload.new["time"]
            });
        })
        .subscribe()
}

export async function sendMessage(message: OMessage) {

    if (message.content.trim().length < 1) {
        message.content = "I have no message"
    }

    if (message.sender.trim().length < 1) {
        message.sender = "anon-user"
    }

    const {error} = await supabase
        .from('messages')
        .insert(message)
}