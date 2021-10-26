<template>
  <q-page class="flex flex-center">
    <q-form @submit="signin" class="login">
      <q-card>
        <q-card-section class="bg-white">
          <router-link to="/" class="text-h6">
            <img src="~/assets/logo.png" alt="logo" style="height: 32px" />
          </router-link>
        </q-card-section>
        <q-card-section class="email-panel">
          <q-input
            dense
            color="red"
            v-model="password"
            type="password"
            placeholder="Şifre"
            outlined
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <q-input
            dense
            color="red"
            v-model="confirmPassword"
            type="password"
            placeholder="Şifre Onay"
            error-message="Şifreler uyuşmuyor."
            :error="passwordError"
            outlined
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            class="text-capitalize"
            type="submit"
            style="width: 108px"
            color="grey-10"
            label="Sıfırla"
          />
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import hst from "hst/index"
export default {
  data() {
    return {
      passwordError: false,
      password : "",
      confirmPassword: ""
    };
  },
  created() {
    if (this.$route.query.token === undefined) {
      this.$router.push("/");
    }
  },
  methods: {
    signin() {
      if (this.password === this.confirmPassword) {
        hst.server.auth.sendNewPassword(this.$route.query.token , this.confirmPassword)
          .then(() => {
            this.$router.push("/login/signin");
          }).catch(() => {});
      } else {
        this.passwordError = true;
      }
    },
  },
};
</script>
