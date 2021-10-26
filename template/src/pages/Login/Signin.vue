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
          <!-- E Posta -->
          <q-input
            dense
            color="red"
            v-model="email"
            type="email"
            outlined
            placeholder="E Mail Adresiniz"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <!-- Şifre -->
          <q-input
            dense
            color="red"
            v-model="password"
            outlined
            type="password"
            placeholder="Şifre"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '']"
          />
          <div class="q-pt-lg">
            Hesabınız yok mu ?
            <router-link to="/login/signup">Bir tane oluştur !</router-link>
          </div>
          <div class="q-pt-md">
            Şifrenizi mi unuttunuz ?
            <router-link to="/login/reset">Şifreni sıfırla !</router-link>
          </div>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            type="submit"
            class="text-capitalize"
            style="width: 108px"
            color="grey-10"
            label="Giriş"
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
      email : "",
      password : ""
    };
  },
  methods: {
    signin() {
      hst.server.auth.signInWithEmailAndPassword(this.email , this.password).then(res => {
         this.$router.push("/");
      }).catch(err => {
        console.log(err)
      });
    },
  },
};
</script>


<style>
a {
  text-decoration: none;
}
</style>

