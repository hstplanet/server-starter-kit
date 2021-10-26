<template>
  <q-page class="flex flex-center">
    <div class="column" style="width: 50%">
      <img src="~/assets/logo.png" alt="logo" style="height: 32px" />
      <span class="text-grey-8 text-h4">Aramıza Hoşgeldin</span>
      <span class="text-h6"> Hesabınızı doğrulayın.</span>
      <q-separator color="grey-8" class="q-my-sm" />
      <p>
        E-Posta adresinize doğrulama yapmanız için bir mail gönderdik. Bu
        maildeki linki kullanarak doğrulama yapabilirsiniz. E Postanın
        gelmediğini düşünüyorsanız lütfen gereksiz postalar klasörünü kontrol
        edin. Eğer bir sorun yaşadıysanız size tekrar mail gönderebiliriz.
      </p>
      <q-btn
        class="text-capitalize q-mt-mda"
        label="Tekrar Mail Gönder"
        color="black"
        text-color="white"
        @click="sendMail"
      />
    </div>
  </q-page>
</template>

<script>
import hst from "hst/index"
export default {
  data() {
    return {

    };
  },
  methods: {
    sendMail() {
     hst.server.auth.sendEmailVerification();
    },
  },
  computed: {
    apiName() {
      if (hst.conf.hstcloud !== undefined) {
        return hst.conf.hstcloud.apiKey;
      }
      return "";
    },
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
