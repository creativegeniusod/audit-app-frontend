<template>
  <div>
    {{ alert }}
    <router-link :to="{path: '/'}">Home Page</router-link>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      alert: '234'
    }
  },

  beforeRouteEnter (to, from, next) {
    console.log('processing plain code');
    const path = `/api/oauth2callback` + window.location.search //http://localhost:5000
    axios.get(path)
    .then(response => {
      console.log(response.data);
      next({path: '/select'})
    })
    .catch(error => {
      console.log(error)
      console.log(error.response);
      next(ts => ts.logAlert('some error'))
    })
  },
  methods: {
    logAlert (alert) {
      this.alert = alert
    },
    goSelect () {

    }
  }

  //http://localhost:8080/oauth-callback?state=xb93rxvr8iO5TrXaqcNVl9TsfwhVTf&code=4%2F_ADKTdX7k_RuDtaHsJ1jw-8Hq9KGi--Y9sSfgW1NCZ9IyXZNra2k3RzmJSmuvcaGaB76fAFfvN_IYodO1k873Js&scope=email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords

}

</script>
