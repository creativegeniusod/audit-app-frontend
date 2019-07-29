<template>
  <div>
    <p class="stat_title">Checklist page for Ads account <strong v-if="profile">{{profile.name}}</strong> : {{accountId}}</p>
    <div>
      <div class="checllist_item" v-for="checkName in checkNames">
        <span v-if="checks[checkName]" class ="flex-grid">
          <span class="col description"> {{checks[checkName].description}} </span>
          <span v-bind:class="checks[checkName].flag" class="col flag"> {{flagText(checks[checkName].flag)}}</span>
        </span>
        <span v-else>Loaing check..</span>
      </div>
      <div class='account_stats'>
        <div v-for="statName in statBlocks">
          <div v-if="stats[statName]" class="stat_block">
            <div class="stat_title">Account stats: {{stats[statName].description}} </div>
            <table>
              <tr v-for="row in stats[statName].rows"><td v-for="item in row"> {{item}}</td></tr>
            </table>
          </div>
        </div>
      </div>
      <div class='sheet_link'>
        <span v-if="sheetUrl"> <a class="sheet_button" v-bind:href="sheetUrl">Click to get results in Google Sheet</a></span>
        <span v-else class="loading">Loading sheet link..</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['customerId'],
  data () {
    return {
      displayResponse: null,
      profile: null,
      accountId: this.customerId,
      checkNames: [],
      statBlocks: [],
      checks: {
        'conversions_check': null,
        'broad_modifiers_check': null,
        'short_modifiers_check': null,
        'mobile_firendly_pages': null,
        'landing_home_pages': null,
        'low_quality_keywords': null,
        'has_negatives': null,
        'has_changes':null,
        'has_more3_ads': null,
        'search_ctr': null,
        'ave_position': null,
        'have_trials': null,
        'has_modifiers': null,
        'has_customizers': null,
        'location_interested': null,
        'bid_strategy': null
      },
      stats : {
        'cost_per_conversions': null,
        'impressions_share': null
      },
      sheetUrl: null
    }
  },
  methods: {
    getCheckFlag (checkName) {
      const path = '/api/check_account/' + this.customerId + '/' + checkName
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.checks[checkName] = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getStats (checkName) {
      const path = '/api/check_account/' + this.customerId + '/' + checkName
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.stats[checkName] = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getProfile () {
      const path = '/api/get_profile/' + this.customerId
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.profile = response.data
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    getSheetUrl() {
      const path = '/api/create_sheet/' + this.customerId
      axios.get(path)
      .then(response => {
        console.log(response.data);
        this.sheetUrl = response.data.url
      })
      .catch(error => {
        console.log(error)
        // this.$router.push('/')
      })
    },
    flagText(text) {
      switch (text) {
        case 'red':
          return 'Test Failed'
        case 'green':
          return 'Test Passed'
        case 'amber':
          return 'Test Passed Partly'
        default:
          return 'No data'
      }
    }
  },
  created () {
    //
    this.getProfile()
    for (let checkName in this.checks) {
      this.checkNames.push(checkName)
      this.getCheckFlag(checkName)
    }
    for (let checkStat  in this.stats) {
      this.statBlocks.push(checkStat)
      this.getStats(checkStat)
    }
    this.getSheetUrl()
  }
}
</script>
<style media="screen">
  .red {
    color: red
  }

  .amber {
    color: darkorange
  }
  .green {
    color: green
  }

  .flex-grid {
    display: flex;
  }

  .flex-grid .col {
    /* flex: 1; */
    padding-right: 25px;
  }
  .description {
      text-align: right;
      width: 60%;
      margin: auto;
  }
  .flag {
    text-align: left;
    width: 40%;
    margin: auto;
  }
  .loading {
    animation: colorchange 1.2s;
    animation-iteration-count: infinite;
  }
  @keyframes colorchange {
      0%   {background: inherit;}
      50%  {background: #cccccc;}
      100% {background: inherit;}
  }
  .stat_block {
    display: inline-block;
    padding-top: 25px;
  }
  .stat_block table {
    text-align: right;
  }
  .stat_block tr:first-child {
    background-color: #ccc;
  }
  .stat_title {
    font-size: 120%;
    color: #d33930;
  }
  .sheet_button {
    border-radius: 8px;
    background-color: #D33930;
    color: white;
    padding: 1em;
    /* margin: auto; */
    display: inline-block;
    font-size: 150%;
    margin-top: 0.5em;
  }

</style>
