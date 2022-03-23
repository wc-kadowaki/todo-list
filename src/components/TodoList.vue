<template>
  <div class="todo-list">
    <h1>Todoツール</h1>
    <div class="todo-list" id="todoList">
      <div class="todo-list__input">
        <input
          type="text"
          placeholder="todoを入力してください。"
          v-model="newTodo"
        />
        <button type="button" @click="addTodo">追加</button>
      </div>
      <ul>
        <li v-for="(todo, key) in todoList" :key="key">
          {{ todo.title }}
          <input type="text" v-show="todo.editFlag" v-model="todo.editTitle" />
          <button type="button" @click="editTodo(todo)" v-show="!todo.editFlag">
            変更
          </button>
          <button
            type="button"
            @click="editAddTodo(todo)"
            v-show="todo.editFlag"
          >
            変更を確定
          </button>
          <button type="button" @click="removeTodo(todo)">削除</button>
        </li>
      </ul>
      <p v-show="!todoList.length">Todoはありません</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "todoList",
  data() {
    return {
      todoList: [
        { title: "study javascript", editFlag: false, editTitle: "" },
        { title: "study typescript", editFlag: false, editTitle: "" },
        { title: "study Vue js", editFlag: false, editTitle: "" },
      ],
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      this.todoList.push({ title: this.newTodo });
      this.newTodo = "";
    },
    removeTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1);
    },
    editTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.forEach((element) => {
        element.editFlag = false;
        element.editTitle = "";
      });
      this.todoList[index].editFlag = true;
    },
    editAddTodo(todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList[index].title = this.todoList[index].editTitle;
      this.todoList[index].editFlag = false;
      this.todoList[index].editTitle = "";
    },
  },
};
</script>