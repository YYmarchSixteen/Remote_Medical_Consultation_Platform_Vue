<template>
  <div class="header">
    <Header></Header>
  </div>
  <div class="body">
    <div class="chat-container">
      <!-- 用户列表 -->
      <div class="user-list">
        <el-card class="user-card">
          <div id="header" class="user-header">消息列表</div>
          <el-scrollbar wrap-class="user-scrollbar">
            <el-menu class="user-menu" :default-active="currentDoctorId" mode="vertical">
              <el-menu-item v-for="doctor in doctorList" :key="doctor.doctorId" :index="doctor.doctorId"
                            @click="handleUserSelect(doctor.username)">
                {{ doctor.username }}
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-card>
      </div>
      <!-- 聊天内容 -->
      <div class="chat-content">
        <el-card class="chat-card">
          <!-- 聊天头部 -->
          <div id="header" class="chat-header">{{ currentUsername }}<br><br>
          </div>
          <el-scrollbar wrap-class="chat-scrollbar" style="height: 80vh">
            <div class="chat-messages">
              <div v-for="message in currentChat" :key="message.id" class="chat-message"
                   :class="{ 'sent-message': message.sender === 'user', 'received-message': message.sender !== 'user' }">
                <div v-if="message.sender === 'user'" class="user-message">
                  {{ message.message }}<br>{{ message.formattedTime }}
                </div>
                <div v-else class="doctor-message">
                  {{ message.message }}<br>{{ message.formattedTime }}
                </div>
              </div>
            </div>
          </el-scrollbar>
          <!-- 输入框 -->
          <el-input class="chat-input" v-model="newMessage" @keyup.enter="sendMessage" placeholder="请输入消息"
                    clearable></el-input>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '../userLayout/Header/header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      doctorList: [],
      currentDoctorId: null,
      currentUsername: '',
      currentChat: [],
      newMessage: '',
      cameraDialogVisible: false
    }
  },
  mounted() {
    this.fetchDoctorList()
    document.addEventListener('visibilitychange', this.handleVisiable)
  },
  unmounted() {
    document.removeEventListener('visibilitychange', this.handleVisiable)
  },
  methods: {
    fetchDoctorList() {
      axios.get(`http://localhost:8081/chat/userChatList?userId=1`)
        .then(response => {
          this.doctorList = response.data.data
          if (this.doctorList.length > 0) {
            this.currentUsername = this.doctorList[0].username
            this.currentDoctorId = this.doctorList[0].doctorId
            this.fetchChatContent(this.currentDoctorId)
          }
        })
        .catch(error => {
          console.error('Error fetching doctor list:', error)
        })
    },
    fetchChatContent(doctorId) {
      axios.get(`http://localhost:8081/chat/all?doctorId=${doctorId}&userId=1`)
        .then(response => {
          this.currentChat = response.data.data.map(message => {
            const formattedTime = new Date(message.sendTime).toLocaleString()
            return { ...message, formattedTime }
          })
        })
        .catch(error => {
          console.error('Error fetching chat content:', error)
        })
    },
    handleUserSelect(username) {
      this.currentUsername = username
      const selectedUser = this.doctorList.find(doctor => doctor.username === username)
      if (selectedUser) {
        this.currentDoctorId = selectedUser.doctorId
        this.fetchChatContent(this.currentDoctorId)
      }
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        const message = {
          id: this.currentChat.length + 1,
          message: this.newMessage.trim(),
          sender: 'user',
          formattedTime: new Date().toLocaleString()
        }
        this.currentChat.push(message)
        this.newMessage = ''
        const params = new URLSearchParams()
        params.append('doctorId', this.currentDoctorId)
        params.append('userId', 1)
        params.append('message', message.message)
        console.log('Sending message:', params.toString());
        axios.post('http://localhost:8081/chat/userSend', params)
          .then(response => {
            console.log('Message sent successfully:', response.data);
          })
          .catch(error => {
            console.error('Error sending message:', error)
          })
      }
    },
    handleVisiable(e) {
      switch(e.target.visibilityState) {
        case 'hidden':
          window.location.reload()
          break;
        case 'visible':
          console.log('处于正常打开')
          window.location.reload();
          break;
      }
    }
  }

}

</script>

<style scoped>
.body {
  margin-top: 20px;
}
.chat-container {
  display: flex;
  height: 100vh;
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

.received-message {
  background-color: #f0f0f0;
  text-align: left;
}

.sent-message {
  background-color: #e3f2fd;
  text-align: right;
}

.chat-message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  word-wrap: break-word;
}
</style>