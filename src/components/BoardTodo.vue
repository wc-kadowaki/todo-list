<template>
  <div class="board-todo">
    <h2 class="board-todo__title">TODOダッシュボード</h2>
    <!-- todoの追加 -->
    <div class="board-todo__add add-todo">
      <h3 class="board-todo__subtitle">ToDoの追加</h3>
      <button @click="addNewTodo('open')" v-if="!newTodo">ToDoを追加する</button>
      <!-- タスクの内容 タイトル、期日、詳細・・・最初はタイトルのみでのちに追加 -->
      <div v-if="newTodo" class="add-todo__editor">
        <!-- 新規タスク追加のエディターstore.jsの一番新しいidを与えてそれを新規追加した際のidにする？？？ -->
        <EditTodo fn="add" @emit-event="emitEvent" :id="lastId" />
        <button @click="addNewTodo('close')">閉じる</button>
      </div>
    </div>
    <!-- todoのリスト -->
    <div class="board-todo__list">
      <div class="board-todo__category">ToDOリスト</div>
      <!-- todo自体もコンポーネントにした方が管理しやすい？ -->
      <!-- store.jsのtodoListをfor分で回して表示する -->
      <div class="board-todo__todo" v-for="(todo, key) in todoList" :key="key">
        <!-- todoが完了(done)していないものを表示 -->
        <div v-if="!todo.done">
          <!-- 編集するときの要素 -->
          <!-- 編集するときは編集前のタイトルを表示するためpropsとしてcomponentsに渡している -->
          <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" @emit-event="emitEvent" />
          <!-- 基本表示の要素 -->
          <!-- for分をこのコンポーネントで行っているためDisplayTodo空ではなくこのコンポーネントからpropsで受け渡すようにしている-->
          <!-- title・・・タスクのタイトル、done・・・タスクが完了しているかどうか、id・・・完了や編集などをする際のタスクの特定の為のID -->
          <DisplayTodo v-else :title="todo.title" :details="todo.details" :done="todo.done" :time="todo.time" :date="todo.date" :id="todo.id" />
        </div>
      </div>
    </div>
    <!-- 完了したtodoのリスト -->
    <div class="board-todo__list board-todo__list--finish">
      <div class="board-todo__category">完了したToDo</div>
      <!-- store.jsのtodoListをfor分で回して表示する -->
      <div class="board-todo__todo" v-for="(todo, key) in todoList" :key="key">
        <!-- todoが完了(done)しているものを表示 -->
        <div v-if="todo.done">
          <!-- 編集するときの要素 -->
          <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" @emit-event="emitEvent" />
          <!-- 基本表示の要素 propsに関しては完了していないものと同じ -->
          <DisplayTodo v-else :title="todo.title" :details="todo.details" :date="todo.date" :time="todo.time" :done="todo.done" :doneDate="todo.doneDate" :doneTime="todo.doneTime" :id="todo.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTodo from './function/EditTodo.vue';
import DisplayTodo from './DisplayTodo.vue';

export default {
  name: 'BoardTodo',
  components: {
    EditTodo,
    DisplayTodo,
  },
  data() {
    return {
      // 完了したtodoはありませんなど入れる場合はtodoListを分ける必要あり？
      // todoListの変化に合わせて特定のmethodsを発火させdataに判定用の変数のlengthを格納？
      // let todoArray = [];
      // let finishTodoArray = [];
      // for(let i = 0; i < todoList.length; i++) {
      //   if(todoList[i].done) {
      //     finishTodoArray.push(todoList[i]);
      //   } else {
      //     todoArray.push(todoList[i]);
      //   }
      // }
      newTodo: false,
    };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
    lastId() {
      return this.$store.state.lastId;
    },
  },
  methods: {
    // openEditor(todo) {
    //   console.log("open editor");
    //   // 編集するtodoの特定
    //   let index = this.todoList.indexOf(todo);
    //   // 編集するtodo以外の編集を一括キャンセル
    //   this.todoList.forEach((element) => {
    //     element.editFlag = false;
    //   });
    //   // 編集するtodoのエディターを表示
    //   this.todoList[index].editFlag = true;
    // },
    // removeTodo(todo) {
    //   let index = this.todoList.indexOf(todo);
    //   this.todoList.splice(index, 1);
    // },
    emitEvent(...args) {
      // EditTodoから値の受け取り
      // todoの追加・更新・削除
      const [event, title, details, date, time] = args;
      switch (event) {
        case 'add':
          this.todoList.push({
            title: title,
            details: details,
            date: date,
            time: time,
            done: false,
            editFlag: false,
            id: this.lastId,
          });
          // 編集が完了した際にstore.jsのstateのIDを更新したい、、、
          this.$store.commit('updateLastId');
          break;
        case 'update':
          for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].editFlag) {
              this.todoList[i].title = title;
              this.todoList[i].details = details;
              this.todoList[i].date = date;
              this.todoList[i].time = time;
            }
          }
          break;
      }
      this.todoList.forEach((element) => {
        element.editFlag = false;
      });
    },
    addNewTodo(fn) {
      if (fn === 'open') {
        this.newTodo = true;
      } else {
        this.newTodo = false;
      }
    },

    // ローカルストレージへのデータの登録と呼び出し
  },
};
</script>

<style lang="scss" scoped>
.board-todo {
  &__title {
    font-size: 3.2rem;
  }

  &__category {
    font-size: 2.4rem;
    font-weight: bold;
  }

  &__todo {
    margin-top: 20px;
    &:first-of-type {
      margin-top: 0;
    }
  }
}
</style>