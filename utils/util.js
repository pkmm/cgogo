function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * snake case
 * eg. myName => my_name
 */
function snakeCase(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      newStr += '_' + str[i] - 'A' + 'a';
    } else {
      newStr += str[i];
    }
  }
  return newStr;
}

module.exports = {
  formatTime: formatTime,
  snakeCase: snakeCase
}


