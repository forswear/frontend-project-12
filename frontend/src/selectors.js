const selectMessagesByChannelId = (state, channelId) => state.messages.messages.filter(
  (message) => message.channelId === channelId,
);
export default selectMessagesByChannelId;
