<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <template>
      <LoginState v-slot="{ loginState }">
        <h2>登录云开发</h2>
        <p>{{ loginState ? "已登录" : "未登录" }}</p>
      </LoginState>
    </template>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: "Welcome to Elon's Vue e TCB.js App"
    }
  },
  async created () {
    this.envId = this.$cloudbase.config.env

    try {
      let ret = await this.$cloudbase
        .auth({ presistence: 'session' })
        .anonymousAuthProvider()
        .signIn()

      console.log('login')
      console.log(ret)
    } catch (e) {
      if (e.message.includes('100007')) {
        this.isLoginSuccess = false
      }

      console.error(e)
      console.log(e.code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
