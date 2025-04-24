export const selectMessagesByChannelId = (state, channelId) => {
  return state.messages.messages.filter(
    (message) => message.channelId === channelId
  );
};
