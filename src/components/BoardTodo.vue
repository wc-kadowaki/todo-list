<template>
  <div class="board-todo">
    <h2 class="board-todo__title">TODOダッシュボード</h2>
    <div class="board-todo__add-user">
      <h3 class="board-todo__subtitle">ユーザーの管理</h3>
      <EditUser />
    </div>
    <!-- todoの追加 -->
    <div class="board-todo__add add-todo">
      <h3 class="board-todo__subtitle">ToDoの追加</h3>
      <div class="add-todo__button">
        <button @click="addNewTodo('open')" v-if="!newTodo">ToDoを追加する</button>
      </div>
      <!-- タスクの内容 タイトル、期日、詳細・・・最初はタイトルのみでのちに追加 -->
      <div v-if="newTodo" class="add-todo__editor">
        <!-- 新規タスク追加のエディターstore.jsの一番新しいidを与えてそれを新規追加した際のidにする？？？ -->
        <EditTodo fn="add" @emit-event="emitEvent" :id="lastId" />
        <button @click="addNewTodo('close')">閉じる</button>
      </div>
    </div>
    <div class="board-todo__user-container">
      <div class="board-todo__container">
        <div class="board-todo__user">すべてのToDo</div>
        <div class="board-todo__list">
          <div class="board-todo__category">未完了のToDo</div>
          <!-- store.jsのtodoListをforで回して表示する -->
          <div class="board-todo__todo" v-for="(todo, key) in todoList" :key="key">
            <!-- todoが完了(done)していないものを表示 -->
            <div v-if="!todo.done">
              <!-- 編集するときの要素 -->
              <!-- 編集するときは編集前のタイトルを表示するためpropsとしてcomponentsに渡している -->
              <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" :user="todo.user" @emit-event="emitEvent" />
              <!-- 基本表示の要素 -->
              <!-- for分をこのコンポーネントで行っているためDisplayTodo空ではなくこのコンポーネントからpropsで受け渡すようにしている-->
              <!-- title・・・タスクのタイトル、done・・・タスクが完了しているかどうか、id・・・完了や編集などをする際のタスクの特定の為のID -->
              <DisplayTodo v-else :title="todo.title" :details="todo.details" :done="todo.done" :time="todo.time" :date="todo.date" :id="todo.id" :user="todo.user" />
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
              <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" @emit-event="emitEvent" :user="todo.user" />
              <!-- 基本表示の要素 propsに関しては完了していないものと同じ -->
              <DisplayTodo
                v-else
                :title="todo.title"
                :details="todo.details"
                :date="todo.date"
                :time="todo.time"
                :done="todo.done"
                :doneDate="todo.doneDate"
                :doneTime="todo.doneTime"
                :id="todo.id"
                :user="todo.user"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- ユーザーごとのtodoの表示 -->
      <div class="board-todo__container" v-for="(user, userKey) in userList" :key="userKey">
        <div class="board-todo__user">{{ user.name }}のToDo</div>
        <div class="board-todo__list">
          <div class="board-todo__category">未完了のToDo</div>
          <!-- store.jsのtodoListをfor分で回して表示する -->
          <div class="board-todo__todo" v-for="(todo, key) in todoList" :key="key">
            <div v-if="user.name === todo.user">
              <!-- todoが完了(done)していないものを表示 -->
              <div v-if="!todo.done">
                <!-- 編集するときの要素 -->
                <!-- 編集するときは編集前のタイトルを表示するためpropsとしてcomponentsに渡している -->
                <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" :user="todo.user" @emit-event="emitEvent" />
                <!-- 基本表示の要素 -->
                <!-- for分をこのコンポーネントで行っているためDisplayTodo空ではなくこのコンポーネントからpropsで受け渡すようにしている-->
                <!-- title・・・タスクのタイトル、done・・・タスクが完了しているかどうか、id・・・完了や編集などをする際のタスクの特定の為のID -->
                <DisplayTodo v-else :title="todo.title" :details="todo.details" :done="todo.done" :time="todo.time" :date="todo.date" :id="todo.id" :user="todo.user" />
              </div>
            </div>
          </div>
        </div>
        <!-- 完了したtodoのリスト -->
        <div class="board-todo__list board-todo__list--finish">
          <div class="board-todo__category">完了したToDo</div>
          <!-- store.jsのtodoListをfor分で回して表示する -->
          <div class="board-todo__todo" v-for="(todo, key) in todoList" :key="key">
            <div v-if="user.name === todo.user">
              <!-- todoが完了(done)しているものを表示 -->
              <div v-if="todo.done">
                <!-- 編集するときの要素 -->
                <EditTodo v-if="todo.editFlag" fn="edit" :title="todo.title" :details="todo.details" :date="todo.date" @emit-event="emitEvent" :user="todo.user" />
                <!-- 基本表示の要素 propsに関しては完了していないものと同じ -->
                <DisplayTodo
                  v-else
                  :title="todo.title"
                  :details="todo.details"
                  :date="todo.date"
                  :time="todo.time"
                  :done="todo.done"
                  :doneDate="todo.doneDate"
                  :doneTime="todo.doneTime"
                  :id="todo.id"
                  :user="todo.user"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- todoのリスト -->
  </div>
</template>

<script>
import EditUser from './function/EditUser.vue';
import EditTodo from './function/EditTodo.vue';
import DisplayTodo from './DisplayTodo.vue';

export default {
  name: 'BoardTodo',
  components: {
    EditUser,
    EditTodo,
    DisplayTodo,
  },
  data() {
    return {
      // 完了したtodoはありませんなど入れる場合はtodoListを分ける必要あり？
      // todoListの変化に合わせて特定のmethodsを発火させdataに判定用の変数のlengthを格納？
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
    userList() {
      return this.$store.state.userList;
    },
  },
  methods: {
    emitEvent(...args) {
      // EditTodoから値の受け取り
      // todoの追加・更新・削除
      const [event, title, details, date, time, user] = args;
      switch (event) {
        case 'add': //追加の時
          this.todoList.push({
            title: title,
            details: details,
            date: date,
            time: time,
            user: user,
            done: false,
            editFlag: false,
            id: this.lastId,
          });
          // 編集が完了した際にstore.jsのstateのidを更新
          this.$store.commit('updateLastId');
          break;
        case 'update': // 更新の時
          for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].editFlag) {
              // 編集のフラグの立っているものを更新
              this.todoList[i].title = title;
              this.todoList[i].details = details;
              this.todoList[i].date = date;
              this.todoList[i].time = time;
              this.todoList[i].user = user;
            }
          }
          break;
      }
      // 追加や更新が完了したので編集のフラグを全て消す
      this.todoList.forEach((element) => {
        element.editFlag = false;
      });
    },
    addNewTodo(fn) {
      // todoを追加するボタンを押したときにエディターを表示する
      if (fn === 'open') {
        this.newTodo = true;
        this.$store.commit('openEditor');
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
  padding: 30px;
  &__title {
    font-size: 32px;
  }

  &__subtitle {
    font-size: 26px;
    margin-top: 10px;
  }

  &__user-container {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 30px;
    overflow-x: scroll;
    padding-bottom: 30px;
  }

  &__container {
    width: 380px;
    flex-shrink: 0;
    margin-right: 30px;
    &:last-of-type {
      margin-right: 0;
    }
  }

  &__user {
    text-align: center;
    color: #ffffff;
    background-color: #000000;
    font-size: 24px;
    padding: 10px 0;
  }

  &__list {
    padding: 20px 10px;
    &--finish {
      background-color: #f2f2f2;
    }
  }

  &__category {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  &__todo {
    margin-top: 20px;
    &:first-of-type {
      margin-top: 0;
    }
  }
}

.add-todo {
  &__button {
    margin-top: 10px;
  }
  &__editor {
    width: 380px;
  }
}
</style>