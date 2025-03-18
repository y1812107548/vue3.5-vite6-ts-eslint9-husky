<template>
  <div class="chat-container">
    <el-card class="chat-messages" shadow="never">
      <div class="message-list" ref="messageListRef">
        <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.type">
          <div class="message-wrapper" :class="{ 'admin-message': msg.type === 'admin' }">
            <div class="avatar-container" v-if="msg.type !== 'admin'">
              <el-avatar :size="40" :src="msg.avatar" :icon="UserFilled" :alt="msg.username" />
            </div>
            <div class="message-info">
              <div class="username" v-if="msg.type !== 'admin'">{{ msg.username || '用户' }}</div>
              <div class="message-content" :class="{ 'admin-content': msg.type === 'admin' }">
                {{ msg.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="chat-input" shadow="never">
      <div class="input-wrapper">
        <el-input
          v-model="messageText"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
          :suffix-icon="ChatDotRound"
        >
        </el-input>
        <el-button type="primary" @click="sendMessage" :icon="Promotion"> 发送 </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { Promotion, ChatDotRound, UserFilled } from '@element-plus/icons-vue';
import { io, Socket } from 'socket.io-client';
import { ElMessage } from 'element-plus';

// 扩展消息接口
interface ChatMessage {
  content: string;
  type: 'sent' | 'received' | 'admin'; // 添加 admin 类型
  timestamp: number;
  username?: string;
  avatar?: string;
}

const socket = ref<Socket>();
const messageText = ref('');
const messages = ref<ChatMessage[]>([]);
const messageListRef = ref<HTMLElement>();
const roomId = ref(1);

// 修改 initSocket 函数
const initSocket = () => {
  socket.value = io('ws://localhost:3001', {
    reconnection: true, // 启用重连
    reconnectionAttempts: 5, // 重连尝试次数
    reconnectionDelay: 1000, // 重连延迟时间
    timeout: 10000, // 连接超时时间
    withCredentials: true, // 允许携带认证信息
    extraHeaders: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  // 连接成功
  socket.value.on('connect', () => {
    ElMessage.success('连接成功！');
    socket?.value?.emit('join', roomId.value);
  });

  // 连接失败
  socket.value.on('connect_error', (error) => {
    ElMessage.error(`连接失败: ${error.message}`);
    console.error('连接错误:', error);
  });

  // 连接断开
  socket.value.on('disconnect', (reason) => {
    ElMessage.warning(`连接断开: ${reason}`);
  });

  socket.value.on('receive-message', (msg: ChatMessage) => {
    addMessage(msg.content, msg.type, msg.username, msg.avatar);
  });

  // 错误
  socket.value.on('error', (error: string) => {
    ElMessage.error(`Socket错误: ${error}`);
  });

  // 添加管理员消息处理
  socket.value.on('admin-message', (msg: string) => {
    addAdminMessage(msg);
  });
};

// 修改发送消息方法
const sendMessage = () => {
  if (!messageText.value.trim() || !socket.value) return;

  const userInfo = {
    username: localStorage.getItem('username') || '我',
    avatar: localStorage.getItem('avatar'),
  };

  socket.value.emit('chat-message', {
    content: messageText.value,
    type: 'received',
    timestamp: Date.now(),
    roomId: roomId.value,
    ...userInfo,
  });

  addMessage(messageText.value, 'sent', userInfo.username, userInfo?.avatar || '');

  messageText.value = '';
};

// 修改添加消息方法
const addMessage = (
  content: string,
  type: 'sent' | 'received' | 'admin',
  username?: string,
  avatar?: string,
) => {
  messages.value.push({
    content,
    type,
    timestamp: Date.now(),
    username,
    avatar,
  });
  scrollToBottom();
};

// 添加系统消息
const addSystemMessage = (content: string) => {
  messages.value.push({
    content,
    type: 'received',
    timestamp: Date.now(),
  });
  scrollToBottom();
};

// 添加管理员消息方法
const addAdminMessage = (content: string) => {
  messages.value.push({
    content,
    type: 'admin',
    timestamp: Date.now(),
  });
  scrollToBottom();
};

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick();
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
  }
};

// 添加重连方法
const reconnect = () => {
  if (socket.value) {
    socket.value.connect();
  } else {
    initSocket();
  }
};

// 生命周期钩子
onMounted(() => {
  initSocket();
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
    socket.value = undefined;
  }
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--el-bg-color-page);
  padding: 20px;
}

.chat-messages {
  flex: 1;
  margin-bottom: 20px;
}

.chat-messages :deep(.el-card__body) {
  height: calc(100% - 40px);
  overflow-y: auto;
}

.message {
  margin-bottom: 20px;
  display: flex;
}

.message-wrapper {
  display: flex;
  gap: 12px;
  max-width: 70%;
}

.message.received .message-wrapper {
  flex-direction: row;
}

.message.sent .message-wrapper {
  flex-direction: row-reverse;
  margin-left: auto;
}

.avatar-container {
  flex-shrink: 0;
}

.message-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}

.message.sent .username {
  text-align: right;
}

.message-content {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  word-break: break-word;
}

.received .message-content {
  background-color: var(--el-border-color-lighter);
  color: var(--el-text-color-primary);
  border-radius: 0 8px 8px 8px;
}

.sent .message-content {
  background-color: var(--el-color-primary-light-3);
  color: var(--el-color-white);
  border-radius: 8px 0 8px 8px;
}

.chat-input {
  margin-bottom: 20px;
}

.input-wrapper {
  display: flex;
  gap: 10px;
}

.input-wrapper :deep(.el-input) {
  flex: 1;
}

.el-button {
  padding: 12px 20px;
}

/* 添加以下新样式 */
.message-list {
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}

.message-list::-webkit-scrollbar {
  width: 6px;
}

.message-list::-webkit-scrollbar-thumb {
  background-color: var(--el-border-color-lighter);
  border-radius: 3px;
}

.message-content {
  word-break: break-word;
}

/* 更新管理员消息样式 */
.admin-message {
  justify-content: center !important;
  margin: 12px 0;
}

.admin-content {
  color: var(--el-text-color-secondary);
  padding: 0;
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
  margin: 0 auto;
}

.message.admin .message-wrapper {
  margin: 0 auto;
  width: 100%;
  justify-content: center;
}
</style>
