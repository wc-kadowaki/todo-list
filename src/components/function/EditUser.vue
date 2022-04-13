<template>
  <div class="edit-user">
    <div class="edit-user__list">
      <div>ユーザー一覧</div>
      <ul class="edit-user__list">
        <li v-for="(user, key) in userList" :key="key">
          <div>{{ user.name }}<button type="button" @click="removeUser(user.id)">削除</button></div>
        </li>
      </ul>
      <div>
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
    addUser() {
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