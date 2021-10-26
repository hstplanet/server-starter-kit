<template>
  <q-page class="flex flex-center">
    <q-form @submit="reset" class="login">
      <q-card>
        <q-card-section class="bg-white">
          <router-link to="/" class="text-h6">
            <img src="~/assets/logo.png" alt="logo" style="height: 32px" />
          </router-link>
        </q-card-section>
        <q-card-section class="email-panel" v-if="!sendResetMail">
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
          <div class="q-pt-lg">
            * Şifreni sıfırlaman için sana bir sıfırlama e postası göndereceğiz.
          </div>
          <div class="q-pt-lg">
            Hesabınız yok mu ?
            <router-link to="/login/signup">Bir tane oluştur !</router-link>
          </div>
        </q-card-section>
        <q-card-section v-else>
          <p>
            Sıfırlama e postası adresine gönderildi. Lütfen {{email}} bu adresi kontrol
            ediniz. Gönderdiğimiz linki kullanarak şifrenizi
            sıfırlayabilirsiniz.
          </p>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn
            type="submit"
            class="text-capitalize"
            style="width: 108px"
            color="grey-10"
            label="Sıfırla"
            v-if="!sendResetMail"
          />
          <q-btn
            to="/"
            class="text-capitalize"
            style="width: 108px"
            color="grey-10"
            label="Tamam"
            v-else
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
      sendResetMail: false,
    };
  },
  methods: {
    reset() {
      hst.server.auth.resetPassword(this.email).then(res => {
        this.sendResetMail = true;
      });
    },
  },
};
</script>
