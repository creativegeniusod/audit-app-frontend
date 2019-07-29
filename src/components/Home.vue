
<template>
  <div>
    <strong><a :href="authUrl">Click here</a></strong> to authorize Health check to access your Ads Account
    <div class="">
      <input type="checkbox" name="" value="" id="privacy"> <label for="privacy"> Agree to <a href="#">Terms of Use</a></label>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      authUrl: '#default'
    }
  },
  methods: {
    getURL () {
      const path = `/api/authorize` //http://localhost:5000
      axios.get(path)
      .then(response => {
        console.log(response);
        this.authUrl = response.data.authorization_url
      })
      .catch(error => {
        console.log(error)
        this.authUrl = ''
      })
    }
  },
  created () {
    this.getURL()
  }
}
</script>

<style media="screen">
  a {
    /* display: block; */
  }
</style>
