<template>
  <div class="header">
    <doctorHeader></doctorHeader>
  </div>
  <div class="chat-container">
    <div class="user-list">
      <el-card class="user-card">
        <div id="header" class="user-header">用户列表</div>
        <el-scrollbar wrap-class="user-scrollbar">
          <el-menu class="user-menu" :default-active="currentUserId" mode="vertical">
            <el-menu-item
              v-for="user in userList"
              :key="user.userId"
              :index="user.userId"
              @click="handleUserSelect(user.username)"
            >
              {{ user.username }}
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-card>
    </div>

    <!-- 聊天内容 -->
    <div class="chat-content">
      <el-card class="chat-card">
        <!-- 聊天头部 -->
        <div id="header" class="chat-header">
          <!-- 写病历和开处方按钮 -->
          <div class="action-buttons">
            <el-button type="primary" @click="redirectToMedicalRecord">写病历</el-button>
            <el-button type="success" @click="redirectToPrescription">开处方</el-button>
            <el-button type="primary" @click="handleVideo" v-if="reserveStatus === '1'">开启视频</el-button>
          </div>
        </div>
        <el-scrollbar wrap-class="chat-scrollbar" style="height: 80vh">
          <div class="chat-messages">
            <div
              v-for="message in currentChat"
              :key="message.id"
              class="chat-message"
              :class="{
                'sent-message': message.sender !== 'user',
                'received-message': message.sender === 'user'
              }"
            >
              <div v-if="message.sender === 'user'" class="user-message">
                {{ message.message }}<br />{{ message.formattedTime }}
              </div>
              <div v-else class="doctor-message">
                {{ message.message }}<br />{{ message.formattedTime }}
              </div>
            </div>
          </div>
        </el-scrollbar>
        <!-- 输入框 -->
        <el-input
          class="chat-input"
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="请输入消息"
          clearable
        ></el-input>
      </el-card>
    </div>
  </div>
  <!-- 视频窗口 -->
  <el-dialog v-model="dialogVisible" width="80%" height="80%" :before-close="handleClose">
    <el-divider />
    <img
      style="
        display: block;
        -webkit-user-select: none;
        margin: auto;
        background-color: hsl(0, 0%, 25%);
      "
      src="http://192.168.43.212:81/stream"
      alt="mediaStreaming"
    />
    <span id="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import doctorHeader from '@/views/doctorLayout/doctorHeader.vue'

export default {
  components: { doctorHeader },
  data() {
    return {
      test: '123',
      userList: [],
      currentUserId: null,
      currentUsername: '',
      currentChat: [],
      newMessage: '',
      dialogVisible: false,
      ReserveList: [],
      reserveStatus: null
    }
  },
  mounted() {
    this.fetchUserList()
    this.fetchReserveList()
    document.addEventListener('visibilitychange', this.handleVisiable)
    sessionStorage.getItem('doctorId')
  },
  unmounted() {
    document.removeEventListener('visibilitychange', this.handleVisiable)
  },
  methods: {
    fetchUserList() {
      axios
        .get(`http://localhost:8081/chat/doctorChatList?doctorId=1`)
        .then((response) => {
          this.userList = response.data.data
          if (this.userList.length > 0) {
            this.currentUsername = this.userList[0].username
            this.currentUserId = this.userList[0].userId
            this.fetchChatContent(this.currentUserId)
          }
        })
        .catch((error) => {
          console.error('Error fetching user list:', error)
        })
    },
    fetchReserveList() {
      axios
        .get(`http://localhost:8081/reserve/myReserve?userId=1`)
        .then((response) => {
          this.ReserveList = response.data.data
          if (this.ReserveList.length > 0) {
            this.reserveStatus = this.ReserveList[0].status
          }
          console.log('ReserveList:', this.ReserveList)
          console.log('Reserve Status:', this.reserveStatus)
        })
        .catch((error) => {
          console.error('Error fetching Reserve list:', error)
        })
    },
    fetchChatContent(userId) {
      axios
        .get(`http://localhost:8081/chat/all?doctorId=1&userId=${userId}`)
        .then((response) => {
          this.currentChat = response.data.data.map((message) => {
            const formattedTime = new Date(message.sendTime).toLocaleString()
            return { ...message, formattedTime }
          })
        })
        .catch((error) => {
          console.error('Error fetching chat content:', error)
        })
    },
    handleUserSelect(username) {
      this.currentUsername = username
      const selectedUser = this.userList.find((user) => user.username === username)
      if (selectedUser) {
        this.currentUserId = selectedUser.userId
        this.fetchChatContent(this.currentUserId)
      }
    },
    redirectToMedicalRecord() {
      this.$router.push('/doctor/emr')
    },
    redirectToPrescription() {
      this.$router.push('/doctor/prescription')
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const message = {
          id: this.currentChat.length + 1,
          message: this.newMessage.trim(),
          sender: 'doctor',
          formattedTime: new Date().toLocaleString()
        }
        this.currentChat.push(message)
        this.newMessage = ''
        const params = new URLSearchParams()
        params.append('doctorId', sessionStorage.getItem('doctorId'))
        params.append('userId', this.currentUserId)
        params.append('message', message.message)
        console.log('Sending message:', params.toString())
        axios
          .post('http://localhost:8081/chat/doctorSend', params)
          .then((response) => {
            console.log('Message sent successfully:', response.data)
          })
          .catch((error) => {
            console.error('Error sending message:', error)
          })
      }
    },
    handleClose() {
      this.dialogVisible = false
      const video = document.getElementById('video')
      video.pause()
    },
    handleVideo() {
      const params = new URLSearchParams()
      params.append('userId', 1)
      axios.put('http://localhost:8081/reserve/agree', params)
      this.dialogVisible = true
    },
    handleVisiable(e) {
      switch (e.target.visibilityState) {
        case 'hidden':
          window.location.reload()
          break
        case 'visible':
          console.log('处于正常打开')
          window.location.reload()
          break
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
  margin-top: 60px;
}

.user-list {
  width: 250px;
  flex-shrink: 0;
  overflow: hidden;
}

.user-card {
  height: 100%;
}

.user-header {
  padding: 10px;
}

.user-menu {
  height: 100%;
}

.chat-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-card {
  height: 100%;
}

.chat-header {
  padding: 10px;
}

.chat-messages {
  padding: 10px;
}

.chat-message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
}

.sent-message {
  background-color: #f0f0f0;
}

.chat-input {
  margin-bottom: 10px;
}

.sent-message {
  background-color: #e3f2fd;
  text-align: right;
}

.received-message {
  background-color: #f0f0f0;
  text-align: left;
}

.chat-message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  word-wrap: break-word;
}
</style>
