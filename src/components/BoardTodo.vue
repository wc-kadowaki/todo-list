<template>
  <div class="board-todo">
    <h2>TODOダッシュボード</h2>
    <!-- todoの追加 -->
    <div class="board-todo__add add-todo">
      <h3 class="board-todo__subtitle"></h3>
      <!-- タスクの内容 タイトル、期日、詳細・・・最初はタイトルのみでのちに追加 -->
      <div class="add-todo__editor">
        <EditTodo fn="add" title="" @emit-event="emitEvent" />
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
            <EditTodo fn="edit" :title="todo.title" @emit-event="emitEvent" />
          </div>
          <!-- 基本表示の要素 -->
          <div v-else>
            <DisplayTodo :title="todo.title" :done="todo.done" :id="todo.id" />
          </div>
        </div>
      </div>
      <div v-for="(todo, key) in todoList" :key="key"></div>
    </div>
    <!-- 完了したtodoのリスト -->
    <div class="board-todo__list board-todo__list--finish">
      <div>完了したToDo</div>
      <div v-for="(todo, key) in todoList" :key="key">
        <div v-if="todo.done">
          <!-- 編集するときの要素 -->
          <div v-if="todo.editFlag">
            <EditTodo fn="edit" :title="todo.title" @emit-event="emitEvent" />
          </div>
          <!-- 基本表示の要素 -->
          <div v-else>
            <DisplayTodo :title="todo.title" :done="todo.done" :id="todo.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTodo from "./function/EditTodo.vue";
import DisplayTodo from "./DisplayTodo.vue";

export default {
  name: "BoardTodo",
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
    };
  },
  computed: {
    todoList() {
      return this.$store.state.todoList;
    },
  },
  methods: {
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
    removeTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1);
    },
    emitEvent(...args) {
      // EditTodoから値の受け取り
      // todoの追加・更新・削除
      const [event, title] = args;
      switch (event) {
        case "add":
          this.todoList.push({
            title: title,
            done: false,
            editFlag: false,
          });
          break;
        case "update":
          for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].editFlag) {
              this.todoList[i].title = title;
            }
          }
          break;
      }
      this.todoList.forEach((element) => {
        element.editFlag = false;
      });
    },
    // ローカルストレージへのデータの登録と呼び出し
  },
};
</script>