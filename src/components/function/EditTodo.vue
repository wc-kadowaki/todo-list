<template>
  <!-- タスクの追加と編集で使用するエディタ -->
  <div class="editor">
    <!-- 編集の場合は元のタイトルを表示する -->
    <div v-if="todo.editor === 'edit'">
      <div>元のタイトル</div>
      <div class="editor__title">{{ todo.title }}</div>
      <div v-if="todo.details">
        <div>元の詳細</div>
        <div class="editor__details">{{ todo.details }}</div>
      </div>
    </div>
    <!-- 新しいタスクのタイトルを入力する箇所 -->
    <div class="editor__edit">
      <div class="editor__item">タイトル<span v-if="todo.editor === 'add'">*</span></div>
      <input class="editor__input" type="text" v-model="todo.newTitle" />
    </div>
    <div class="editor__edit">
      <div class="editor__item">詳細</div>
      <textarea class="editor__textarea" v-model="todo.newDetails"></textarea>
    </div>
    <div class="editor__edit">
      <div class="editor__item">日付</div>
      <input type="date" v-model="todo.newDate" />
    </div>
    <div class="editor__edit">
      <div class="editor__item">時間</div>
      <input type="time" v-model="todo.newTime" />
    </div>
    <!-- 諸々のボタン -->
    <div class="editor__buttons">
      <!-- タスクの追加時のボタン -->
      <div v-if="todo.editor === 'add'">
        <button class="editor__button" type="button" @click="sendTodo('add')">追加</button>
      </div>
      <!-- タスクの編集時のボタン -->
      <div v-if="todo.editor === 'edit'">
        <button class="editor__button" type="button" @click="sendTodo('update')">更新</button>
      </div>
      <!-- タスクの追加、編集関係なくキャンセル時のボタン -->
      <button class="editor__button" type="button" @click="sendTodo('cancel')">キャンセル</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editTodo',
  data() {
    return {
      // エディター関係で必要なもの
      // title・・・タスクの編集時に元のタイトルを表示する際の為
      // newTitle・・・新しく入力したタイトルを現状のタイトルと区別するため
      // editor・・・追加、編集の判定をするため
      todo: {
        title: this.$props.title,
        newTitle: '',
        details: this.$props.details,
        newDetails: '',
        date: this.$props.date,
        newDate: '',
        time: this.$props.time,
        newTime: '',
        editor: this.$props.fn,
      },
    };
  },
  // title・・・ 元のタイトルを利用するため
  // fn・・・追加、編集の判定をするため
  props: {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    time: {
      type: Date,
      required: false,
    },
    fn: {
      type: String,
      required: true,
      default: 'add',
    },
  },
  methods: {
    sendTodo(fn) {
      // 編集が完了したことを親に伝える＆追加or更新orキャンセル
      if (this.todo.newTitle === '' && this.todo.newDetails === '' && this.todo.newDate === '' && this.todo.newTime === '' && fn !== 'cancel') {
        // タイトル、詳細、日付、時間のどれも入力されずに追加、更新のボタンを押したとき
        alert('入力してください');
      } else if (this.todo.newTitle === '' && fn === 'add') {
        // todoの新規追加の時にタイトルを入力していないとき
        alert('タイトルを入力してください');
      } else {
        let title, details, date, time;
        // 入力されたものに更新するか既存のものを引き継ぐのか判定
        if (this.todo.newTitle === '') {
          title = this.todo.title;
        } else {
          title = this.todo.newTitle;
        }
        if (this.todo.newDetails === '') {
          details = this.todo.details;
        } else {
          details = this.todo.newDetails;
        }
        if (this.todo.newDate === '') {
          date = this.todo.date;
        } else {
          date = this.todo.newDate;
        }
        if (this.todo.newTime === '') {
          time = this.todo.time;
        } else {
          time = this.todo.newTime;
        }
        // どのボタンを押したのかとtodoの各項目を送る
        this.$emit('emitEvent', fn, title, details, date, time);
        // 入力が完了したので各項目の入力欄を空にする
        this.todo.newTitle = '';
        this.todo.newDetails = '';
        this.todo.newDate = '';
        this.todo.newTime = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  padding: 10px 20px;
  width: 500px;
  border: 1px solid #000000;

  &__item {
    margin-top: 20px;
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #000000;
  }

  &__details {
    font-size: 14px;
    border: 1px solid #000000;
    padding: 5px 10px;
    margin-top: 10px;
    white-space: pre;
  }

  &__input {
    margin-top: 10px;
    width: 100%;
  }

  &__textarea {
    margin-top: 10px;
    width: 100%;
  }

  &__buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  &__button {
    background-color: transparent;
    border: 1px solid #000000;
    cursor: pointer;
    outline: none;
    padding: 5px 10px;
    appearance: none;
    font-size: 14px;
    border-radius: 50px;
    width: 100px;
  }
}
</style>