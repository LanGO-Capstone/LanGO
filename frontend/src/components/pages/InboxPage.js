import React from "react";
import Talk from 'talkjs';

class InboxPage extends React.Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;

    }

    componentDidMount() {
        Talk.ready
            .then(() => {
                // Need to put logged in user here
                const me = new Talk.User({
                    id: `${this.props.loggedInUser.id}`,
                    name: `${this.props.loggedInUser.userDetails.displayName}`,
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tjuANscb",
                        me: me
                    });
                }

                if (this.props.location.state) {

                    const other = new Talk.User({
                        id: this.props.location.state.userId,
                        name: this.props.location.state.displayName,
                    });

                    const conversationId = Talk.oneOnOneId(me, other);
                    const conversation = window.talkSession.getOrCreateConversation(conversationId);

                    conversation.setParticipant(me);
                    conversation.setParticipant(other);

                    this.inbox = window.talkSession.createInbox({
                        selected: conversation
                    });
                } else {
                    this.inbox = window.talkSession.createInbox();
                }

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

export default InboxPage;