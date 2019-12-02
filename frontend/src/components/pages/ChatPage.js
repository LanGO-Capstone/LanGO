import React from "react";
import Talk from 'talkjs';

class ChatPage extends React.Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;
    }

    componentDidMount() {
        Talk.ready
            .then(() => {
                // Need to put logged in user here
                const me = new Talk.User({
                    id: "12345231",
                    name: "George Looney",
                    email: "george@looney.net",
                    photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    welcomeMessage: "Hey there! How are you? :-)"
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tjuANscb",
                        me: me
                    });
                }

                // Need to get other user from props
                const other = new Talk.User({
                    id: "123",
                    name: "Ronald Raygun",
                    email: "ronald@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    welcomeMessage: "Hey there! Love to chat :-)"
                });

                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users.
                const conversationId = Talk.oneOnOneId(me, other);

                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);

                this.inbox = window.talkSession.createInbox({
                    // selected: conversation
                });
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (<span>
            <div style={{height: '500px'}} ref={c => this.container = c}>Loading...</div>
        </span>);
    }
}

export default ChatPage;