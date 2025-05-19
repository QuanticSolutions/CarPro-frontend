import { useState, useEffect } from 'react';
import {
    useCreateChatClient,
    useChannelStateContext,
    Chat,
    Channel,
    ChannelList,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import { SearchIndex } from "emoji-mart";
import { getUser, isAuthenticated, createNotification } from '../../api/consumer';
import { ArrowRight } from '@mui/icons-material';
import './layout.css'
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';
import moment from 'moment';

const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY;

const ChannelListHeader = ({ onBackClick, isMobileView }) => {
    return (
        <div style={{
            padding: "25px",
            height: "15px",
            minHeight: "15px",
            background: "#fff",
            borderBottom: "1px solid rgba(173, 173, 173, 0.43)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <h3 style={{ margin: 0 }}>Chat</h3>
            {
                isMobileView &&
                <button
                    onClick={onBackClick}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px"
                    }}
                >
                    ✕
                </button>
            }
        </div>
    );
};

const CustomChannelPreview = ({
    channel,
    setActiveChannel,
    isMobileView,
    closeChannelList,
    activeChannel
}) => {
    const [otherMember, setOtherMember] = useState({ name: "Unknown User", image: null });
    const [lastMessage, setLastMessage] = useState({ text: "", created_at: null });
    const currentUserId = localStorage.getItem("stream_id");

    useEffect(() => {
        const getOtherMember = () => {
            const members = Object.values(channel.state.members);
            const other = members.find(member => member.user.id !== currentUserId);
            if (other?.user) {
                setOtherMember({
                    name: other.user.name || other.user.id,
                    image: other.user.image
                });
            }
        };

        const getLastMessage = () => {
            const messages = channel.state.messages;
            if (messages && messages.length > 0) {
                const last = messages[messages.length - 1];
                setLastMessage({
                    text: last.text || "",
                    created_at: last.created_at
                });
            }
        };

        getOtherMember();
        getLastMessage();
    }, [channel, currentUserId]);

    const handleChannelSelect = () => {
        setActiveChannel(channel);
        if (isMobileView) {
            closeChannelList();
        }
    };

    return (
        <div
            className='channel-preview'
            onClick={handleChannelSelect}
            style={{
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                background: "#fff",
                width: "100%",
                borderBottom: "1px solid #d8d6d6"
            }}
        >
            <Avatar
                src={otherMember.image}
                alt={otherMember.name}
                sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    marginRight: "10px"
                }}
            />
            <div style={{ flex: 1 }}>
                <strong>{otherMember.name}</strong>
                <div style={{ fontSize: "0.9rem", color: "black", }}>{lastMessage.text}</div>
            </div>
            {lastMessage.created_at && (
                <div style={{ fontSize: "0.75rem", color: "black", marginLeft: "8px" }}>
                    {moment(lastMessage.created_at).fromNow()} {/* e.g. "5 minutes ago" */}
                </div>
            )
            }
        </div >
    );
};

const CustomChannelHeader = ({ title, onBackClick, isMobileView }) => {
    const { channel } = useChannelStateContext();
    const [receiverInfo, setReceiverInfo] = useState({ name: title, image: null });
    const currentUserId = localStorage.getItem("stream_id");

    useEffect(() => {
        const getReceiverInfo = async () => {
            if (channel) {
                const members = Object.values(channel.state.members);
                const otherMember = members.find(member => member.user.id !== currentUserId);
                if (otherMember?.user) {
                    setReceiverInfo({
                        name: otherMember.user.name || otherMember.user.id,
                        image: otherMember.user.image
                    });
                }
            }
        };

        getReceiverInfo();
    }, [channel, currentUserId]);

    return (
        <>
            <div className="str-chat__header-livestream" style={{ padding: "10px", display: "flex", alignItems: "center" }}>
                {isMobileView && (
                    <button
                        onClick={onBackClick}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            marginRight: "10px"
                        }}
                    >
                        <ArrowRight />
                    </button>
                )}

                <Avatar
                    src={receiverInfo.image}
                    alt={receiverInfo.name}
                    sx={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        marginRight: "10px"
                    }}
                />
                <div className="str-chat__header-livestream-left">
                    <p className="str-chat__header-livestream-left--title" style={{ fontWeight: "bold" }}>
                        {receiverInfo.name}
                    </p>
                </div>
            </div>
        </>
    );
};

const ChannelInner = ({ receiver, setIsChannelListOpen, isMobileView }) => {
    const { channel } = useChannelStateContext();

    useEffect(() => {
        if (!isAuthenticated) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        if (!channel) return;

        const members = Object.keys(channel.state.members);
        const senderId = localStorage.getItem("stream_id");
        const receiverId = members.find(memberId => memberId !== senderId);

        const handleNewMessage = () => {
            const lastMessage = channel.state.messageSets[0]?.messages.at(-1);
            if (lastMessage) {
                createNotification({
                    message: lastMessage.text,
                    created_by: senderId,
                    user_id: receiverId
                });
            }
        };
        channel.on("message.new", handleNewMessage);
        return () => {
            channel.off("message.new", handleNewMessage);
        };
    }, [channel]);

    return (
        <>
            <Window>
                <CustomChannelHeader
                    title={receiver?.fullname || receiver?.stream_id}
                    onBackClick={() => setIsChannelListOpen(true)}
                    isMobileView={isMobileView}
                />
                <MessageList />
                <MessageInput />
            </Window>
            <Thread />
        </>
    );
};

const CustomChannelListWrapper = ({ filters, sort, options, setIsChannelListOpen, isMobileView }) => {
    const closeChannelList = () => {
        if (isMobileView) {
            setIsChannelListOpen(false);
        }
    };

    return (
        <div className='channel-list'>
            <ChannelListHeader onBackClick={() => setIsChannelListOpen(false)} isMobileView={isMobileView} />
            <ChannelList
                filters={filters}
                sort={sort}
                options={options}
                Preview={(previewProps) => (
                    <CustomChannelPreview
                        {...previewProps}
                        isMobileView={isMobileView}
                        closeChannelList={closeChannelList}
                    />
                )}
            />
        </div>
    );
};

const App = () => {
    const [channel, setChannel] = useState();
    const [user, setUser] = useState({});
    const [receiver, setReceiver] = useState({});
    const [token, setToken] = useState("");
    const [isChannelListOpen, setIsChannelListOpen] = useState(true);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        const receiverId = localStorage.getItem("reciever_id");
        const receiverStreamId = localStorage.getItem("reciever_stream_id");
        const streamToken = localStorage.getItem("stream_token");

        const fetchUsers = async () => {
            try {
                const senderData = await getUser(userId);
                const resolvedSender = Array.isArray(senderData) ? senderData[0] : senderData;
                setUser(resolvedSender);

                setToken(streamToken);

                if (receiverId) {
                    const receiverData = await getUser(receiverId);
                    const resolvedReceiver = Array.isArray(receiverData) ? receiverData[0] : receiverData;
                    setReceiver(resolvedReceiver);
                } else if (receiverStreamId) {
                    setReceiver({ stream_id: receiverStreamId });
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const sort = { last_message_at: -1 };

    const filters = {
        type: 'messaging',
        member_count: 2,
        members: { $eq: [user.stream_id, receiver.stream_id].sort() }
    };

    const options = {
        limit: 10,
    };

    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: {
            id: user.stream_id,
            name: user.fullname,
            image: user.avatar || `https://getstream.io/random_png/?name=${user.fullname}`
        },
    });

    useEffect(() => {
        if (!client || !user?.stream_id || !receiver?.stream_id) return;
        const fetchOrCreateChannel = async () => {

            const existingChannels = await client.queryChannels(filters);

            let chatChannel;
            if (existingChannels.length > 0) {
                chatChannel = existingChannels[0];
            } else {
                chatChannel = client.channel('messaging', {
                    members: [user.stream_id, receiver.stream_id],
                    name: `${receiver.fullname || receiver.stream_id}`,
                });
                await chatChannel.watch();
            }

            setChannel(chatChannel);
        };
        fetchOrCreateChannel();
    }, [client, user, receiver]);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobileView(mobile);
            if (mobile && channel) {
                setIsChannelListOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [channel]);

    if (!client) return <div>Setting up client & connection...</div>;

    return (
        <Chat client={client}>
            <div className="chat-cont" style={{ marginTop: 0 }}>
                {isChannelListOpen && (
                    <CustomChannelListWrapper
                        filters={filters}
                        sort={sort}
                        options={options}
                        setIsChannelListOpen={setIsChannelListOpen}
                        isMobileView={isMobileView}
                    />
                )}
                <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
                    <ChannelInner
                        receiver={receiver}
                        setIsChannelListOpen={setIsChannelListOpen}
                        isMobileView={isMobileView}
                    />
                </Channel>
            </div>
        </Chat>
    );
};

export default App;