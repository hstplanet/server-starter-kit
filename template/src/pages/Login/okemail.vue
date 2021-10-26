<template>
  <q-page class="flex flex-center">
    <q-inner-loading :showing="!view">
      <q-spinner-rings size="120px" color="red" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import hst from "hst/index"
export default {
  data() {
    return {
      view: false,
    };
  },
  created() {
    if (this.$route.query.token !== undefined) {
      hst.server.auth.emailVerification().then(res => {
        this.$router.push("/");
      }).catch(err => {
        console.log(err);
        console.log("HATA");
      });
    }
  },
};
</script>

<style lang="scss">
.login {
  width: 440px;
  .logo {
    img {
      height: 32px;
    }
  }
  .email-panel {
    span {
      display: block;
      color: #1b1b1b;
      font-weight: 600;
      font-size: 1.5rem;
      padding: 0;
      margin-bottom: 12px;
    }
  }

  .q-field__control {
    height: 36px;
  }

  a {
    color: #3498db;
  }
}
</style>
