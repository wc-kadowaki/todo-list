<template>
  <div class="edit-user">
    <div class="edit-user__container">
      <div class="edit-user__title">ユーザー一覧</div>
      <ul class="edit-user__list">
        <li class="edit-user__item" v-for="(user, key) in userList" :key="key">{{ user.name }}<button type="button" @click="removeUser(user.id)">削除</button></li>
      </ul>
      <div class="edit-user__add">
        ユーザーの追加
        <input type="text" v-model="newUser.name" />
        <button type="button" @click="addUser">追加</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  data() {
    return {
      newUser: {
        name: '',
      },
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList;
    },
  },
  methods: {
    addUser() { // 追加ボタンを押したときの処理
      if (this.newUser.name === '') {
        alert('入力してください');
      } else {
        this.$store.commit('addUser', this.newUser.name);
        this.newUser.name = '';
      }
      this.$store.commit('pushLocalStorageUser');
    },
    removeUser(id) {
      this.$store.commit('removeUser', id);
      this.$store.commit('pushLocalStorageUser');
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-user {
  margin-top: 10px;
  &__title {
    font-size: 18px;
  }
  &__list {
    margin-top: 5px;
  }
  &__item {
    margin-top: 5px;
    display: flex;
    width: 150px;
    justify-content: space-between;
  }
  &__add {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>