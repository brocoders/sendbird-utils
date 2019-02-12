declare module 'sendbird' {

  declare type SendBirdParams = {
    appId: string,
    newInstance?: boolean,
  }

  declare export default class SendBird {
    constructor(params: SendBirdParams): SendBirdInstance;
    static version: number;
    static getInstance(): SendBirdInstance;
  }

  declare interface SendBirdError {
    code: number,
    message: string
  }
  declare type userCallback = (user: User, error: SendBirdError) => void;
  declare type pushSettingCallback = (response: string, error: SendBirdError) => void;
  declare type getFriendChangeLogs = {
    updatedUsers: Array<User>,
    deletedUserIds: Array<string>,
    hasMore: boolean,
    token: string
  };
  declare type getFriendChangeLogsByTokenHandler = (data: getFriendChangeLogs, error: SendBirdError) => void;
  declare interface DiscoveryObject {
    friendDiscoveryKey: string,
    friendName?: string
  }
  declare export interface SendBirdInstance {
    currentUser: User,
    User: UserStatic,
    Member: MemberStatic,
    OpenChannel: OpenChannelStatic,
    GroupChannel: GroupChannelStatic,
    UserMessage: UserMessageStatic,
    FileMessage: FileMessageStatic,
    AdminMessage: AdminMessageStatic,
    UserEventHandler: UserEventHandlerStatic,
    ChannelHandler: ChannelHandlerStatic,
    ConnectionHandler: ConnectionHandlerStatic,
    GroupChannelParams: GroupChannelParams,
    UserMessageParams: UserMessageParams,
    FileMessageParams: FileMessageParams,
    GroupChannelTotalUnreadMessageCountParams: GroupChannelTotalUnreadMessageCountParams,
    Options: Options,
    connect(userId: string, callback?: userCallback): void,
    connect(userId: string, apiHost: string, wsHost: string, callback?: userCallback): void,
    connect(userId: string, accessToken: string, callback?: userCallback): void,
    connect(
      userId: string,
      accessToken: string,
      apiHost: string,
      wsHost: string,
      callback?: userCallback): void,
    disconnect(callback?: commonCallback): void,
    reconnect(): boolean,
    updateCurrentUserInfo(nickname: string, profileUrl: string, callback?: userCallback): void,
    updateCurrentUserInfoWithProfileImage(nickname: string, profileImageFile: File, callback?: userCallback): void,
    getCurrentUserId(): string,
    getApplicationId(): string,
    getConnectionState(): 'CLOSED' | 'OPEN' | 'CONNECTING',
    addChannelHandler(id: string, handler: ChannelHandler): void,
    removeChannelHandler(id: string): void,
    removeAllChannelHandlers(): void,
    addConnectionHandler(id: string, handler: ConnectionHandler): void,
    removeConnectionHandler(id: string): void,
    removeAllConnectionHandlers(): void,
    addUserEventHandler(id: string, handler: UserEventHandler): void,
    removeUserEventHandler(id: string): void,
    removeAllUserEventHandler(): void,
    createUserListQuery(): UserListQuery,
    createUserListQuery(userIds: Array<string>): UserListQuery,
    createBlockedUserListQuery(): UserListQuery,
    blockUser(userToBlock: User, callback?: userCallback): void,
    blockUserWithUserId(userToBlock: string, callback?: userCallback): void,
    unblockUser(blockedUser: User, callback?: commonCallback): void,
    unblockUserWithUserId(blockedUserId: string, callback?: commonCallback): void,
    setChannelInvitationPreference(isAutoAccept: boolean, callback: commonCallback): void,
    getChannelInvitationPreference(callback: commonCallback): void,
    getPendingGCMToken(): string,
    getPendingAPNSToken(): string,
    registerGCMPushTokenForCurrentUser(gcmRegToken: string, callback?: pushSettingCallback): void,
    unregisterGCMPushTokenForCurrentUser(gcmRegToken: string, callback?: commonCallback): void,
    unregisterGCMPushTokenAllForCurrentUser(callback?: commonCallback): void,
    registerAPNSPushTokenForCurrentUser(apnsRegToken: string, callback?: pushSettingCallback): void,
    unregisterAPNSPushTokenForCurrentUser(apnsRegToken: string, callback?: commonCallback): void,
    unregisterAPNSPushTokenAllForCurrentUser(callback?: commonCallback): void,
    unregisterPushTokenAllForCurrentUser(callback?: commonCallback): void,
    setPushTemplate(templateName: string, callback?: pushSettingCallback): void,
    getPushTemplate(callback?: pushSettingCallback): void,
    setDoNotDisturb(
      doNotDisturbOn: boolean,
      startHour: number,
      startMin: number,
      endHour: number,
      endMin: number,
      timezone: string,
      callback?: commonCallback): void,
    getDoNotDisturb(callback: commonCallback): void,
    setBackgroundState(): void,
    setForegroundState(): void,
    disableStateChange(): void,
    enableStateChange(): void,
    uploadFriendDiscoveries(discoveries: Array<DiscoveryObject>, callback: commonCallback): void,
    deleteFriendDiscovery(discoveryKey: string, callback: commonCallback): void,
    deleteFriendDiscoveries(discoveryKeys: Array<string>, callback: commonCallback): void,
    getFriendChangeLogsByToken(callback: getFriendChangeLogsByTokenHandler): void,
    getFriendChangeLogsByToken(token: string, callback: getFriendChangeLogsByTokenHandler): void,
    addFriends(userIds: Array<string>, callback: userListQueryCallback): void,
    deleteFriend(userId: string, callback: commonCallback): void,
    deleteFriends(userIds: Array<string>, callback: commonCallback): void,
    createFriendListQuery(): FriendListQuery,
    markAsReadAll(callback: commonCallback): void,
    markAsReadWithChannelUrls(channelUrls: Array<string>, callback: commonCallback): void
  }
  declare interface Options {
    useMemberAsMessageSender: boolean,
    typingIndicatorThrottle: number
  }
  declare interface FriendListQuery {
    hasMore: boolean,
    isLoading: boolean,
    limit: number,
    next(callback: userListQueryCallback): void
  }
  declare class UserEventHandlerStatic {
    constructor(): UserEventHandler
  }
  declare interface UserEventHandler {
    onFriendsDiscovered(users: Array<User>): void
  }
  declare class ChannelHandlerStatic {
    constructor(): ChannelHandler
  }
  declare interface ChannelHandler {
    onMessageReceived(
      channel: OpenChannel | GroupChannel,
      message: AdminMessage | UserMessage | FileMessage): void,
    onMessageUpdated(
      channel: OpenChannel | GroupChannel,
      message: AdminMessage | UserMessage | FileMessage): void,
    onMessageDeleted(channel: OpenChannel | GroupChannel, messageId: number): void,
    onReadReceiptUpdated(channel: GroupChannel): void,
    onTypingStatusUpdated(channel: GroupChannel): void,
    onUserJoined(channel: GroupChannel, user: User): void,
    onUserLeft(channel: GroupChannel, user: User): void,
    onUserEntered(channel: OpenChannel, user: User): void,
    onUserExited(channel: OpenChannel, user: User): void,
    onUserMuted(channel: OpenChannel | GroupChannel, user: User): void,
    onUserUnmuted(channel: OpenChannel | GroupChannel, user: User): void,
    onUserBanned(channel: OpenChannel | GroupChannel, user: User): void,
    onUserUnbanned(channel: OpenChannel | GroupChannel, user: User): void,
    onChannelFrozen(channel: OpenChannel | GroupChannel): void,
    onChannelUnfrozen(channel: OpenChannel | GroupChannel): void,
    onChannelChanged(channel: OpenChannel | GroupChannel): void,
    onChannelDeleted(channelUrl: string): void,
    onUserReceivedInvitation(channel: GroupChannel, inviter: User, invitees: Array<User>): void,
    onUserDeclinedInvitation(channel: GroupChannel, inviter: User, invitee: Member): void,
    onMetaDataCreated(channel: OpenChannel | GroupChannel, metaData: Object): void,
    onMetaDataUpdated(channel: OpenChannel | GroupChannel, metaData: Object): void,
    onMetaDataDeleted(channel: OpenChannel | GroupChannel, metaDataKeys: Array<string>): void,
    onMetaCountersCreated(channel: OpenChannel | GroupChannel, metaCounter: Object): void,
    onMetaCountersUpdated(channel: OpenChannel | GroupChannel, metaCounter: Object): void,
    onMetaCountersDeleted(channel: OpenChannel | GroupChannel, metaCounterKeys: Array<string>): void,
    onChannelHidden(channel: GroupChannel): void,
    onMentionReceived(
      channel: OpenChannel | GroupChannel,
      message: AdminMessage | UserMessage | FileMessage): void
  }
  declare export class ConnectionHandlerStatic {
    constructor(): ConnectionHandler
  }
  declare export interface ConnectionHandler {
    onReconnectStarted(): void,
    onReconnectSucceeded(): void,
    onReconnectFailed(): void
  }

  /**
   * Message
   */
  declare interface BaseMessageInstance {
    channelUrl: string,
    channelType: string,
    messageId: number,
    messageType: string,
    data: string,
    customType: string,
    mentionType: string,
    mentionedUsers: Array<User>,
    createdAt: number,
    updatedAt: number,
    isOpenChannel(): boolean,
    isGroupChannel(): boolean,
    isUserMessage(): boolean,
    isFileMessage(): boolean,
    isAdminMessage(): boolean,
    serialize(): Object
  }
  declare export type AdminMessage = {
    message: string,
    translations: Object
  } & BaseMessageInstance

  declare interface AdminMessageStatic {
    buildFromSerializedData(serializedObject: Object): AdminMessage
  }
  declare interface GroupChannelTotalUnreadMessageCountParams {
    channelCustomTypesFilter: Array<string>,
    superChannelFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType"
  }
  declare interface UserMessageParams {
    message: string,
    data: string,
    customType: string,
    targetLanguages: Array<string>,
    mentionType: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    mentionedUserIds: Array<string>,
    mentionedUsers: Array<User>,
    pushNotificationDeliveryOption: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType"
  }
  declare export type UserMessage = {
    message: string,
    sender: User,
    reqId: string,
    translations: Object
  } & BaseMessageInstance

  declare interface UserMessageStatic {
    buildFromSerializedData(serializedObject: Object): UserMessage
  }
  declare interface FileMessageParams {
    file: File,
    fileUrl: string,
    fileName: string,
    fileSize: number,
    mimeType: string,
    data: string,
    customType: string,
    thumbnailSizes: Array<ThumbnailSize>,
    mentionType: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    mentionedUserIds: Array<string>,
    mentionedUsers: Array<User>,
    pushNotificationDeliveryOption: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType"
  }
  declare export type FileMessage = {
    sender: User,
    reqId: string,
    url: string,
    name: string,
    size: number,
    type: string,
    thumbnails: Array<ThumbnailObject>
  } & BaseMessageInstance

  declare interface FileMessageStatic {
    buildFromSerializedData(serializedObject: Object): FileMessage
  }
  declare interface ThumbnailObject {
    url: string,
    height: number,
    width: number,
    real_height: number,
    real_width: number
  }
  declare interface ThumbnailSize {
    maxWidth: number,
    maxHeight: number
  }

  /**
   * User
   */
  declare export interface User {
    userId: string,
    nickname: string,
    profileUrl: string,
    metaData: Object,
    connectionStatus: string,
    lastSeenAt: string,
    isActive: boolean,
    friendDiscoveryKey: string | null,
    friendName: string | null,
    getOriginalProfileUrl(): string,
    createMetaData(metaDataMap: Object, callback: commonCallback): void,
    updateMetaData(metaDataMap: Object, callback: commonCallback): void,
    updateMetaData(metaDataMap: Object, upsert: boolean, callback: commonCallback): void,
    deleteMetaData(metaDataKey: string, callback: commonCallback): void,
    deleteAllMetaData(callback: commonCallback): void,
    serialize(): Object
  }
  declare interface UserStatic {
    buildFromSerializedData(serializedObject: Object): User
  }
  declare export type Member = {
    state: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    isBlockedByMe: boolean,
    isBlockingMe: boolean
  } & User

  declare interface MemberStatic {
      buildFromSerializedData(serializedObject: Object): Member
  }

  /**
   * Channel
   */
  declare type messageCallback = (message: UserMessage | FileMessage, error: SendBirdError) => void;
  declare type cancelUploadingFileMessageCallback = (isSuccess: boolean, error: SendBirdError) => void;
  declare type fileUploadprogressHandler = (event: Object) => void;
  declare type messageChangeLogs = {
    updatedMessages: Array<UserMessage | FileMessage | AdminMessage>,
    deletedMessageIds: Array<string>,
    hasMore: boolean,
    token: string
  };
  declare type getMessageChangeLogsByTokenHandler = (data: messageChangeLogs, error: SendBirdError) => void;
  declare interface BaseChannel {
    url: string,
    name: string,
    coverUrl: string,
    data: string,
    customType: string,
    isFrozen: boolean,
    isEphemeral: boolean,
    createdAt: string,
    isGroupChannel(): boolean,
    isOpenChannel(): boolean,
    serialize(): Object,
    getMessageChangeLogsByToken(callback: getMessageChangeLogsByTokenHandler): void,
    getMessageChangeLogsByToken(token: string, callback: getMessageChangeLogsByTokenHandler): void,
    createOperatorListQuery(): OperatorListQuery,

          /**
           * Message
           */
    createMessageListQuery(): MessageListQuery,
    createPreviousMessageListQuery(): PreviousMessageListQuery,
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback: messageListCallback): void,
    getNextMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback: messageListCallback): void,
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback: messageListCallback): void,
    getPreviousMessagesByTimestamp(
      ts: number,
      isInclusive: boolean,
      prevResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      senderUserIds: Array<string>,
      callback: messageListCallback): void,
    getPreviousAndNextMessagesByTimestamp(
      ts: number,
      prevResultSize: number,
      nextResultSize: number,
      shouldReverse: boolean,
      messageType: string,
      customType: string,
      callback: messageListCallback): void,
      getPreviousAndNextMessagesByTimestamp(
          ts: number,
          prevResultSize: number,
          nextResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          senderUserIds: Array<string>,
          callback: messageListCallback): void,
      getNextMessagesByID(
          messageId: number,
          isInclusive: boolean,
          nextResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          callback: messageListCallback): void,
      getNextMessagesByID(
          messageId: number,
          isInclusive: boolean,
          nextResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          senderUserIds: Array<string>,
          callback: messageListCallback): void,
      getPreviousMessagesByID(
          messageId: number,
          isInclusive: boolean,
          prevResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          callback: messageListCallback): void,
      getPreviousMessagesByID(
          messageId: number,
          isInclusive: boolean,
          prevResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          senderUserIds: Array<string>,
          callback: messageListCallback): void,
      getPreviousAndNextMessagesByID(
          messageId: number,
          prevResultSize: number,
          nextResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          callback: messageListCallback): void,
      getPreviousAndNextMessagesByID(
          messageId: number,
          prevResultSize: number,
          nextResultSize: number,
          shouldReverse: boolean,
          messageType: string,
          customType: string,
          senderUserIds: Array<string>,
          callback: messageListCallback): void,

          /**
           * FileMessage
           */
          sendFileMessage(fileMessageParams: FileMessageParams, callback: messageCallback): FileMessage,
          sendFileMessage(file: File, callback: messageCallback): FileMessage,
          sendFileMessage(file: File, data: string, callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              data: string,
              customType: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              data: string,
              customType: string,
              thumbnailSizes: Array<ThumbnailSize>,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              thumbnailSizes: Array<ThumbnailSize>,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              fileMessageParams: FileMessageParams,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              data: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              data: string,
              customType: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              data: string,
              customType: string,
              thumbnailSizes: Array<ThumbnailSize>,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: File,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              thumbnailSizes: Array<ThumbnailSize>,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(file: string, callback: messageCallback): FileMessage,
          sendFileMessage(file: string, data: string, callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              data: string,
              customType: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              name: string,
              type: string,
              size: number,
              data: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              data: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              data: string,
              customType: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              name: string,
              type: string,
              size: number,
              data: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,
          sendFileMessage(
              file: string,
              name: string,
              type: string,
              size: number,
              data: string,
              customType: string,
              progressHandler: fileUploadprogressHandler,
              callback: messageCallback): FileMessage,

          /**
           * UserMessage
           */
          sendUserMessage(userMessageParams: UserMessageParams, callback: messageCallback): UserMessage,
          sendUserMessage(message: string, callback: messageCallback): UserMessage,
          sendUserMessage(message: string, data: string, callback: messageCallback): UserMessage,
          sendUserMessage(
              message: string,
              data: string,
              customType: string,
              callback: messageCallback): UserMessage,
          sendUserMessage(
              message: string,
              data: string,
              customType: string,
              targetLanguages: Array<string>,
              callback: messageCallback): UserMessage,

          /**
           * Edit Message
           */
          updateFileMessage(
              messageId: number,
              data: string,
              customType: string,
              callback: messageCallback): void,
          updateUserMessage(
              messageId: number,
              message: string,
              data: string,
              customType: string,
              callback: messageCallback): void,
          deleteMessage(message: FileMessage | UserMessage, callback: commonCallback): void,
          cancelUploadingFileMessage(messageReqId: string, callback: cancelUploadingFileMessageCallback): boolean,

          /**
           * MetaData
           */
          createMetaData(metaDataMap: Object, callback: commonCallback): void,
          updateMetaData(metaDataMap: Object, callback: commonCallback): void,
          updateMetaData(metaDataMap: Object, upsert: boolean, callback: commonCallback): void,
          getMetaData(keys: Array<string>, callback: commonCallback): void,
          getAllMetaData(callback: commonCallback): void,
          deleteMetaData(key: string, callback: commonCallback): void,
          deleteAllMetaData(callback: commonCallback): void,

          /**
           * MetaCounter
           */
          createMetaCounters(metaCounterMap: Object, callback: commonCallback): void,
          updateMetaCounters(metaCounterMap: Object, callback: commonCallback): void,
          updateMetaCounters(metaCounterMap: Object, upsert: boolean, callback: commonCallback): void,
          increaseMetaCounters(metaCounterMap: Object, callback: commonCallback): void,
          decreaseMetaCounters(metaCounterMap: Object, callback: commonCallback): void,
          getMetaCounters(keys: Array<string>, callback: commonCallback): void,
          getAllMetaCounters(callback: commonCallback): void,
          deleteMetaCounter(key: string, callback: commonCallback): void,
          deleteAllMetaCounters(callback: commonCallback): void
  }
  declare type messageListCallback = (
      messageList: Array<UserMessage | FileMessage | AdminMessage>,
      error: SendBirdError) => void;
  declare interface MessageListQuery {
      next(
              messageTimestamp: number,
              limit: number,
              reverse: boolean,
              callback: messageListCallback): void,
          prev(
              messageTimestamp: number,
              limit: number,
              reverse: boolean,
              callback: messageListCallback): void,
          load(
              messageTimestamp: number,
              prevLimit: number,
              nextLimit: number,
              reverse: boolean,
              callback: messageListCallback): void
  }
  declare export interface PreviousMessageListQuery {
    hasMore: boolean,
    isLoading: boolean,
    limit: number,
    reverse: boolean,
    messageTypeFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    customTypeFilter: string,
    senderUserIdsFilter: Array<string>,
    load(limit: number, reverse: boolean, callback: messageListCallback): void,
    load(
      limit: number,
      reverse: boolean,
      messageType: number,
      callback: messageListCallback): void,
    load(callback: messageListCallback): void
  }

  /**
   * OpenChannel
   */
  declare type commonCallback = (response: Object, error: SendBirdError) => void;
  declare type openChannelCallback = (openChannel: OpenChannel, error: SendBirdError) => void;
  declare type OpenChannel = {
      participantCount: number,
      operators: Array<User>,
      refresh(callback: openChannelCallback): void,
      delete(callback: openChannelCallback): void,
      enter(callback: openChannelCallback): void,
      exit(callback: openChannelCallback): void,
      createParticipantListQuery(): UserListQuery,
      createMutedUserListQuery(): UserListQuery,
      createBannedUserListQuery(): UserListQuery,
      updateChannel(
          name: string,
          coverUrl: string,
          data: string,
          callback: openChannelCallback): void,
      updateChannel(
          name: string,
          coverUrl: string,
          data: string,
          operatorUserIds: Array<string> | string,
          callback: openChannelCallback): void,
      updateChannel(
          name: string,
          coverUrl: string,
          data: string,
          operatorUserIds: Array<string> | string,
          customType: string,
          callback: openChannelCallback): void,
      updateChannelWithOperatorUserIds(
          name: string,
          coverUrl: string,
          data: string,
          operatorUserIds: Array<string> | string,
          callback: openChannelCallback): void,
      updateChannelWithOperatorUserIds(
          name: string,
          coverUrl: string,
          data: string,
          operatorUserIds: Array<string> | string,
          customType: string,
          callback: openChannelCallback): void,
      banUser(user: User, callback: commonCallback): void,
      banUser(user: User, seconds: number, callback: commonCallback): void,
      banUserWithUserId(userId: string, callback: commonCallback): void,
      banUserWithUserId(userId: string, seconds: number, callback: commonCallback): void,
      unbanUser(user: User, callback: commonCallback): void,
      unbanUserWithUserId(userId: string, callback: commonCallback): void,
      muteUser(user: User, callback: commonCallback): void,
      muteUserWithUserId(userId: string, callback: commonCallback): void,
      unmuteUser(user: User, callback: commonCallback): void,
      unmuteUserWithUserId(userId: string, callback: commonCallback): void,
      isOperator(user: User): boolean,
      isOperatorWithUserId(userId: string): boolean
  } & BaseChannel

  declare type userListQueryCallback = (userList: Array<User>, error: SendBirdError) => void;
  declare interface UserListQuery {
      limit: number,
          hasNext: boolean,
          isLoading: boolean,
          metaDataKey: string,
          metaDataValues: Array<string>,
          next(callback: userListQueryCallback): void
  }
  declare interface OperatorListQuery {
      limit: number,
          hasNext: boolean,
          isLoading: boolean,
          next(callback: userListQueryCallback): void
  }
  declare interface OpenChannelStatic {
    buildFromSerializedData(serializedObject: Object): OpenChannel,
    getChannel(channelUrl: string, callback: openChannelCallback): void,
    getChannelWithoutCache(channelUrl: string, callback: openChannelCallback): void,
    createChannel(callback: openChannelCallback): void,
    createChannel(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      callback: openChannelCallback): void,
    createChannel(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      operatorUserIds: Array<string> | string,
      callback: openChannelCallback): void,
    createChannel(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback: openChannelCallback): void,
    createChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      operatorUserIds: Array<string> | string,
      callback: openChannelCallback): void,
    createChannelWithOperatorUserIds(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      operatorUserIds: Array<string> | string,
      customType: string,
      callback: openChannelCallback): void,
    createOpenChannelListQuery(): OpenChannelListQuery
  }
  declare type openChannelListQueryCallback = (openChannelList: Array<OpenChannel>, error: SendBirdError) => void;
  declare interface OpenChannelListQuery {
    limit: number,
    hasNext: boolean,
    nameKeyword: string,
    urlKeyword: string,
    customType: string,
    next(callback: openChannelListQueryCallback): void
  }

  /**
   * GroupChannel
   */
  declare interface GroupChannelParams {
    isDistinct: boolean,
    isSuper: boolean,
    isPublic: boolean,
    isEphemeral: boolean,
    channelUrl: string,
    name: string,
    data: string,
    customType: string,
    coverUrl: string,
    coverImage: File,
    operators: Array<User>,
    operatorUserIds: Array<string>,
    addUser(user: User): void,
    addUsers(user: Array<User>): void,
    addUserId(userId: string): void,
    addUserIds(userId: Array<string>): void
  }
  declare type groupChannelCallback = (groupChannel: GroupChannel, error: SendBirdError) => void;
  declare type getPushPreferenceCallback = (isPushOn: boolean, error: SendBirdError) => void;
  declare export type GroupChannel = {
    isHidden: boolean,
    isDistinct: boolean,
    isSuper: boolean,
    isPublic: boolean,
    isPushEnabled: boolean,
    myCountPreference: string,
    lastMessage: UserMessage | FileMessage | AdminMessage,
    unreadMessageCount: number,
    unreadMentionCount: number,
    members: Array<Member>,
    memberCount: number,
    joinedMemberCount: number,
    myMemberState: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    myRole: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    myMutedState: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    inviter: User,
    refresh(callback: groupChannelCallback): void,
    updateChannel(groupChannelParams: GroupChannelParams, callback: groupChannelCallback): void,
    updateChannel(
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      callback: groupChannelCallback): void,
    updateChannel(
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      callback: groupChannelCallback): void,
    updateChannel(
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      customType: string,
      callback: groupChannelCallback): void,
    resetMyHistory(callback?: commonCallback): void,
    invite(users: Array<User>, callback: groupChannelCallback): void,
    inviteWithUserIds(userIds: Array<string>, callback: groupChannelCallback): void,
    acceptInvitation(callback: groupChannelCallback): void,
    declineInvitation(callback: commonCallback): void,
    join(callback: groupChannelCallback): void,
    leave(callback: commonCallback): void,
    hide(callback: commonCallback): void,
    hide(hidePreviousMessages: boolean, callback: commonCallback): void,
    markAsRead(): void,
    getReadReceipt(message: UserMessage | FileMessage | AdminMessage): number,
    getReadStatus(): Object,
    startTyping(): void,
    endTyping(): void,
    isTyping(): boolean,
    getTypingMembers(): Array<Member>,
    setPushPreference(pushOn: boolean, callback: commonCallback): void,
    getPushPreference(callback: getPushPreferenceCallback): void,
    setMyCountPreference(
      preference: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
      callback: commonCallback): void,
    createMemberListQuery(): GroupChannelMemberListQuery,
    createBannedUserListQuery(): UserListQuery,
    banUser(
      user: User,
      seconds: number,
      description: string,
      callback: commonCallback): void,
    banUserWithUserId(
      userId: string,
      seconds: number,
      description: string,
      callback: commonCallback): void,
    unbanUser(User: User, callback: commonCallback): void,
    unbanUserWithUserId(userId: string, callback: commonCallback): void,
    muteUser(user: User, callback: commonCallback): void,
    muteUserWithUserId(userId: string, callback: commonCallback): void,
    unmuteUser(user: User, callback: commonCallback): void,
    unmuteUserWithUserId(userId: string, callback: commonCallback): void,
    freeze(callback: commonCallback): void,
    unfreeze(callback: commonCallback): void
  } & BaseChannel

  declare type groupChannelCountCallback = (count: number, error: SendBirdError) => void;
  declare interface GroupChannelStatic {
    buildFromSerializedData(serializedObject: Object): GroupChannel,
    createMyGroupChannelListQuery(): GroupChannelListQuery,
    createPublicGroupChannelListQuery(): PublicGroupChannelListQuery,
    getUnreadItemCount(keys: Array<string>, callback: commonCallback): void,
    getTotalUnreadMessageCount(
      groupChannelTotalUnreadMessageCountParams: GroupChannelTotalUnreadMessageCountParams,
      callback: groupChannelCountCallback): void,
    getTotalUnreadMessageCount(callback: groupChannelCountCallback): void,
    getTotalUnreadMessageCount(channelCustomTypes: Array<string>, callback: groupChannelCountCallback): void,
    getTotalUnreadChannelCount(callback: groupChannelCountCallback): void,
    createChannel(groupChannelParams: GroupChannelParams, callback: groupChannelCallback): void,
    createChannel(users: Array<User>, callback: groupChannelCallback): void,
    createChannel(users: Array<User>, isDistinct: boolean, callback: groupChannelCallback): void,
    createChannel(
      users: Array<User>,
      isDistinct: boolean,
      customType: string,
      callback: groupChannelCallback): void,
    createChannel(
      users: Array<User>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      callback: groupChannelCallback): void,
    createChannel(
      users: Array<User>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      customType: string,
      callback: groupChannelCallback): void,
    createChannelWithUserIds(userIds: $ReadOnlyArray<string>, callback: groupChannelCallback): void,
    createChannelWithUserIds(
      userIds: $ReadOnlyArray<string>,
      isDistinct: boolean,
      callback: groupChannelCallback): void,
    createChannelWithUserIds(
      userIds: $ReadOnlyArray<string>,
      isDistinct: boolean,
      customType: string,
      callback: groupChannelCallback): void,
    createChannelWithUserIds(
      userIds: $ReadOnlyArray<string>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      callback: groupChannelCallback): void,
    createChannelWithUserIds(
      userIds: $ReadOnlyArray<string>,
      isDistinct: boolean,
      name: string,
      coverUrlOrImageFile: string | File,
      data: string,
      customType: string,
      callback: groupChannelCallback): void,
    getChannel(channelUrl: string, callback: groupChannelCallback): void,
    getChannelWithoutCache(channelUrl: string, callback: groupChannelCallback): void,
    markAsReadAll(callback: commonCallback): void
  }
  declare type groupChannelMemberListQueryCallback = (groupChannelList: Array<Member>, error: SendBirdError) => void;
  declare interface GroupChannelMemberListQuery {
    limit: number,
    hasNext: boolean,
    isLoading: boolean,
    mutedMemberFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    operatorFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    memberStateFilter: "NO PRINT IMPLEMENTED: LiteralType" |
    "NO PRINT IMPLEMENTED: LiteralType" |
    "NO PRINT IMPLEMENTED: LiteralType" |
    "NO PRINT IMPLEMENTED: LiteralType" |
    "NO PRINT IMPLEMENTED: LiteralType",
    nicknameStartsWithFilter: string,
    next(callback: groupChannelMemberListQueryCallback): void
  }
  declare type groupChannelListQueryCallback = (groupChannelList: Array<GroupChannel>, error: SendBirdError) => void;
  declare export interface GroupChannelListQuery {
    limit: number,
    hasNext: boolean,
    isLoading: boolean,
    includeEmpty: boolean,
    order: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    userIdsFilter: Array<string>,
    userIdsFilterExactMatch: boolean,
    queryType: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    userIdsExactFilter: Array<string>,
    userIdsIncludeFilter: Array<string>,
    userIdsIncludeFilterQueryType: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    nicknameContainsFilter: string,
    channelNameContainsFilter: string,
    customTypeFilter: string,
    customTypesFilter: Array<string>,
    customTypeStartsWithFilter: string,
    channelUrlsFilter: Array<string>,
    superChannelFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    publicChannelFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    next(callback: groupChannelListQueryCallback): void
  }
  declare interface PublicGroupChannelListQuery {
    limit: number,
    hasNext: boolean,
    isLoading: boolean,
    includeEmpty: boolean,
    order: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    channelNameContainsFilter: string,
    channelUrlsFilter: Array<string>,
    customTypesFilter: Array<string>,
    customTypeStartsWithFilter: string,
    superChannelFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    membershipFilter: "NO PRINT IMPLEMENTED: LiteralType" | "NO PRINT IMPLEMENTED: LiteralType",
    next(callback: groupChannelListQueryCallback): void
  }
}
