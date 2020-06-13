<template>
  <div id="app">
    <div class="content">
      <div class="side-bar">
        <div class="btn"><button @click="addNote" :title="addBtnTitle">新建笔记</button></div>
        <div class="list"
             v-for="note in notes"
             @click="selectNote(note)" :class="{selected:note === selectedNote}">{{note.title}}</div>
      </div>
      <div class="edit-panel">
        <input type="text" placeholder="这里输入标题" v-model="title">
        <button>保存</button>
        <textarea id="txt-area"></textarea>
      </div>
      <div class="show-panel" v-html="notePreview">{{notePreview}}</div>
    </div>i
    <footer>脚</footer>
  </div>
</template>

<script>

  import marked from 'marked'

  export default {
    name: 'App',
    data() {
      return {
        content: {},
        notes: [],
        title: '',
        selectedID: null
      }
    },
    computed: {
      // notePreview() {
      //   // Markdown转换为HTML     
      //   return this.selectedNote ? marked(this.selectedNote.content) : ''
      // },
      addBtnTitle() {
        return this.notes.length + '条笔记已保存'
      },
      selectedNote() {
      //  返回与选择ID一样的笔记内容
        return this.notes.find(note => note.id === this.selectedID)
      }
    },
    // watch: {
    //   content: 'saveNote',
    //   // immediate: true
    // },
    methods: {
      // saveNote() {
      //   localStorage.setItem('content', this.content)
      // },
      addNote() {
        const time = Date.now()
        //  新笔记默认值
        const note = {
          id: String(time),
          title: this.title,
          content:this.content,
          created: time,
          favorite: false
        }
        // 添加到列表中
        this.notes.push(note)
      },
      selectNote(note) {
        console.log('this.selectedID');
        return this.selectedID = note.id
      }
    },

  }

</script>

<style lang="less">
    html,body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    #app {
      display: -webkit-flex; /*Safari*/
      display: flex;
      flex-direction: column;
      height: 100%;
    }


    .content {
      display: flex;
      height: 100%;
      margin-top: 5px;
    }

    .side-bar {
      display: flex;
      width: 15%;
      flex-direction: column;
      /*justify-content: center;*/
      align-items: center;
    }

    .btn {
      text-align: center;
      width: 100%;
      background-color: #0985db;
    }
    .btn button {
      border: none;
      height: 30px;
      width: 100%;
      background-color: transparent;
      color: #FFFFFF;
    }
    .list {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      margin-left: 20px;
      width: 100%;
      border-bottom: solid #E9E9E9 1px;
    }


    .edit-panel {
      width: 45%;
      height: 100%;
    }

    #txt-area {
        width: 100%;
        height: 100%;
        background-color: #333333;
        color: #FFFFFF;
        font-size: 14px;
        resize: none;
    }

    .show-panel {
      width: 40%;
      margin-top: 0;
      padding-top: 0;
      margin-left: 5px;
      padding-left: 5px;
    }
    .selected {
      background-color: #42b983;
    }
</style>
