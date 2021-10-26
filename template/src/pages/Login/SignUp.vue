<template>
  <q-page class="flex flex-center">
    <q-form @submit="signUp" class="login">
      <q-card>
        <q-card-section class="bg-white">
          <router-link to="/" class="text-h6">
            <img src="~/assets/logo.png" alt="logo" style="height: 32px" />
          </router-link>
        </q-card-section>
        <q-card-section class="email-panel">
          <!-- E Posta -->
          <q-input
            color="red"
            dense
            v-model="email"
            outlined
            type="email"
            placeholder="E Mail Adresiniz"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <!-- Şifre -->
          <q-input
            color="red"
            dense
            v-model="password"
            outlined
            type="password"
            placeholder="Şifre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <!-- Şifre Onay -->
          <q-input
            color="red"
            dense
            v-model="confirmPassword"
            outlined
            type="password"
            placeholder="Şifre Onay"
            error-message="Şifreler uyuşmuyor."
            class="q-mb-md"
            :error="passwordControl"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <!-- Adınız -->
          <q-input
            color="red"
            dense
            v-model="name"
            outlined
            type="text"
            placeholder="Adınız"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <!-- Soyadınız -->
          <q-input
            color="red"
            dense
            v-model="lastname"
            outlined
            type="text"
            placeholder="Soyadınız"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <div class="q-pt-lg">
            Zaten hesabın var mı ?
            <router-link to="/login/signin">Giriş yap !</router-link>
          </div>
          <div class="q-pt-md">
            Şifrenizi mi unuttunuz ?
            <router-link to="/login/reset">Şifreni sıfırla !</router-link>
          </div>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            type="submit"
            style="width: 108px"
            color="grey-10"
            label="Kayıt Ol"
            class="text-capitalize"
          />
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import hst from "hst/index";
export default {
  data() {
    return {
      passwordCheck: false,
      email : "",
      password : "",
      confirmPassword : "",
      name : "",
      lastname : ""
    };
  },
  methods: {
    signUp() {
      hst.server.auth.createUserWithEmailAndPassword(this.email , this.password).then(res => {
        hst.server.auth.updateProfile({name : this.name , lastname : this.lastname}).then(res => {
          this.$router.push("/mailverified");
          //hst.server.auth.sendEmailVerification().then(res => {})
        });
      });
    },
  },
  computed: {
    passwordControl() {
      if (this.confirmPassword !== this.password) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style></style>
