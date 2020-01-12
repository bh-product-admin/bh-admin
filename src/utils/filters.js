import Vue from 'vue'
import moment from 'moment'
moment.locale('en', {
  monthsShort: [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]
})

Vue.filter('isNullOrEmpty', (data) => {
  if (data === '' || data == null || data === 'null') {
    return 'N/A'
  } else {
    return data
  }
})

Vue.filter('datetimeDot', (data) => {
  if (data) {
    return moment(data).format('YYYY.MM.DD HH:mm:ss')
  }
})

Vue.filter('replyJsonContent', (data) => {
  if (data) {
    data = data.replace(/\'/g, '"')
    data = JSON.parse(data)
    return data.content
  }
})

Vue.filter('replyJsonPhnoe', (data) => {
  console.log('--data--', data)
  if (data) {
    data = data.replace(/\'/g, '"')
    data = JSON.parse(data)
    return data.phone
  }
})

