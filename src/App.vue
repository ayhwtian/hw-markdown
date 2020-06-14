<template>
  <div id="app">
    <div class="content">
      <div class="side-bar">
        <div class="btn"><button @click="newNote" :title="showBtnTitle">新建笔记</button></div>
        <div class="list"
             v-for="note in notes"
             @click="selectNote(note)" :class="{selected:note === selectedNote}">{{note.title}}</div>
      </div>
      <div class="edit-panel">
        <input type="text"
               value="无标题笔记"
               onfocus="if(value == '无标题笔记' ){value=''}"
               onblur="if(value == '' ){value='无标题笔记'}"
               ref="title"
               @input="updateTitle" maxlength="16">
        <button @click="removeNote">删除</button>
        <textarea id="txt-area"
                  v-model="content"
                  @input="updateContent">{{content}}</textarea>
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
        content: '',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        selectedID: localStorage.getItem('selected-id') || null,
        title: '',
      }
    },
    computed: {
      notePreview() {
        // Markdown转换为HTML展示内容     
        return this.selectedNote ? marked(this.selectedNote.content) : marked(this.content)
      },
      //显示保存了多少笔记
      showBtnTitle() {
        return this.notes.length + '条笔记已保存'
      },
      //
      //选中的笔记，用于修改内容或者标题
      selectedNote() {
      //  返回与选择ID一样的笔记内容
        return this.notes.find(note => note.id === this.selectedID)
      },

    },
    watch: {
      notes: {
        handler:'saveNotes',
        deep: true,
      },
      //保存客户当前选中项
      selectedID() {
        localStorage.setItem('selected-id', this.selectedID)
      }
    },
    methods: {
      //保存笔记列表
      saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes))
        console.log('笔记已保存' + new Date);
      },
      //新建笔记：如果当前有笔记的话，保存当前笔记，清空标题和内容
      newNote() {
        //  新笔记默认值
        const note = {
                id: String(Date.now()),
                title: this.$refs.title.value,
                content:this.content,
                created: Date.now(),
                favorite: false
        }

        // 添加到列表中
        this.notes.push(note)
      },

      //选中了那条笔记的ID，用此ID来选择笔记内容
      selectNote(note) {
        // console.log(this.selectedID)
        let seltitle = []
        return seltitle =[this.content = note.content,this.$refs.title.value = note.title ,this.selectedID = note.id]
      },
      //修改title
      updateTitle() {
        return this.selectedNote.title = this.$refs.title.value
      },
      //  修改内容
      updateContent() {
        return this.selectedNote.content = this.content
      },
      //删除笔记
      removeNote() {
        if (this.selectedNote && confirm('Delete the note?')) {
          // 将选中的笔记从笔记列表中移除
          const index = this.notes.indexOf(this.selectedNote)
          if (index !== -1) {
            this.notes.splice(index, 1)
          }
          this.$refs.title.value = this.title

        }
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
