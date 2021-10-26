<template>
  <q-layout view="lHh Lpr fff" class="bg-img">
    <q-header elevated class="bg-white text-black" height-hint="64"> </q-header>
    <q-page-container class="GPL__page-container login-page">
      <router-view />
    </q-page-container>

    <q-footer class="q-pa-sm text-center">
      Web sitemiz, web sitesi kullanımınızı analiz etmek, içeriği
      kişiselleştirmek, ziyaret tercihlerinizi hatırlamak, web sitesi kullanım
      istatistiklerini amaçlarla sınırlı ve gizliliğe uygun şekilde çerezleri
      kullanır.
    </q-footer>
  </q-layout>
</template>

<script>
export default {};
</script>

<style lang="scss">
.bg-img {
  background-image: url("../assets/loginback.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.login-page {
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.q-footer {
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.login {
  width: 30%;
  a {
    color: $grey-8;
    &:hover {
      color: $purple-10;
    }
  }
}

@media screen and (max-width: 1366px) {
  .login {
    width: 50%;
  }
}

@media screen and (max-width: 600px) {
  .login {
    width: 90%;
  }
}
</style>