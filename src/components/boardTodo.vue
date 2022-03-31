<template>
  <div class="board-todo">
    <h2>TODOダッシュボード</h2>
    <!-- todoの追加 -->
    <div class="board-todo__add add-todo">
      <h3 class="board-todo__subtitle"></h3>
      <!-- タスクの内容 タイトル、期日、詳細・・・最初はタイトルのみでのちに追加 -->
      <div class="add-todo__editor">
        <EditTodo></EditTodo>
      </div>
    </div>
    <!-- todoのリスト -->
    <div class="board-todo__list">
      <div>ToDOリスト</div>
      <!-- todo自体もコンポーネントにした方が管理しやすい？ -->
      <div v-for="(todo, key) in todoList" :key="key">
        <!-- todoが完了(done)していないものを表示 -->
        <div v-if="!todo.done">
          <!-- 編集するときの要素 -->
          <div v-if="todo.editFlag">
            <EditTodo
              @emit-title="emitTitle($emitTitle)"
              @emit-event="emitEvent($emitEvent)"
              fn="edit"
              :title="todo.title"
            ></EditTodo>
          </div>
          <!-- 基本表示の要素 -->
          <div v-else>
            <div>{{ todo.title }}</div>
            <!-- 編集でEditTodoを呼び出し保有しているデータを引き継ぎ編集する状態にする -->
            <button type="button" @click="openEditor(todo)">編集</button>
            <button type="button" @click="doneTodo(todo, true)">完了</button>
            <button type="button" @click="removeTodo(todo)">削除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 完了したtodoのリスト -->
    <div class="board-todo__list board-todo__list--finish">
      <div>完了したToDo</div>
      <div v-for="(todo, key) in todoList" :key="key">
        <div v-if="todo.done">
          <div>{{ todo.title }}</div>
          <!-- 編集はリストと完了したリスト共通にする -->
          <button type="button" @click="openEditor(todo)">編集</button>
          <!-- 未完了でリストに追加 -->
          <button type="button" @click="doneTodo(todo, false)">未完了</button>
          <button type="button" @click="removeTodo(todo)">削除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTodo from "./function/EditTodo.vue";

export default {
  name: "boardTodo",
  components: {
    EditTodo,
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
      todoList: [
        {
          title: "vue",
          newTitle: "",
          done: false,
          editFlag: false,
        },
        {
          title: "vuex",
          newTitle: "",
          done: false,
          editFlag: false,
        },
        {
          title: "javascript",
          newTitle: "",
          done: true,
          editFlag: false,
        },
      ],
    };
  },
  methods: {
    addTodo() {
      console.log("add todo");
    },
    openEditor(todo) {
      console.log("open editor");
      // 編集するtodoの特定
      let index = this.todoList.indexOf(todo);
      // 編集するtodo以外の編集を一括キャンセル
      this.todoList.forEach((element) => {
        element.editFlag = false;
      });
      // 編集するtodoのエディターを表示
      this.todoList[index].editFlag = true;
    },
    updateTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList[index].title = this.todoList[index].newTitle;
      this.todoList[index].newTitle = "";
      this.todoList[index].editFlag = false;
    },
    cancelTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList[index].newTitle = "";
      this.todoList[index].editFlag = false;
    },
    doneTodo(todo, bool) {
      let index = this.todoList.indexOf(todo);
      if (bool) {
        this.todoList[index].done = true;
      } else {
        this.todoList[index].done = false;
      }
    },
    removeTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1);
    },
    emitTitle(value) {
      console.log(value);
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].editFlag) {
          this.todoList[i].title = value;
        }
      }
    },
    emitEvent(value) {
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].editFlag) {
          this.todoList[i].editFlag = false;
        }
      }
      if (value === "complete") {
        console.log("更新完了");
      }
    },
    // ローカルストレージへのデータの登録と呼び出し
  },
  props: {
    todo: {
      title: {
        type: String,
        default: "",
        required: true,
      },
    },
  },
  emits: {

  }
};
</script>