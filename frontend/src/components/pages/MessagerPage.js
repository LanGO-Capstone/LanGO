import React from "react";
import {Channel, ChannelHeader, ChannelList, Chat, MessageInput, MessageList, Thread, Window} from "stream-chat-react";
import {StreamChat} from "stream-chat";
import 'stream-chat-react/dist/css/index.css';

class MessagerPage extends React.Component {

    render() {

        const chatClient = new StreamChat('m38rzcu9r3xn');
        const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidHdpbGlnaHQtZm9nLTAifQ.ZQ-sDJ3kLmKLvzfqUyXj8tpcF7YYGgCppvLZ4t0gMNU';

        chatClient.setUser(
            {
                id: 'twilight-fog-0',
                name: 'Twilight fog',
                image: 'https://getstream.io/random_svg/?id=twilight-fog-0&name=Twilight+fog'
            },
            userToken,
        );

        const channel = chatClient.channel('messaging', 'godevs', {
            // add as many custom fields as you'd like
            image: 'https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png',
            name: 'Talk about Go',
        });

        const filters = { type: 'messaging' };
        const sort = { last_message_at: -1 };
        const channels = chatClient.queryChannels(filters, sort);

        return (
            <div className="container">
                <Chat client={chatClient} theme={'gaming light'}>
                    <ChannelList
                        filters={filters}
                        sort={sort}
                    />
                    <Channel channel={channel}>
                        <Window>
                            <ChannelHeader/>
                            <MessageList/>
                            <MessageInput/>
                        </Window>
                        <Thread/>
                    </Channel>
                </Chat>
            </div>
        )
    }
}

export default MessagerPage;