/**
 * 格式化日期函数
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 节流+去抖函数
 */
export function throttle(fn, delay, least) {
  let timer = null;
  let previous = null;
  return function() {
    let now =+new Date();
    if (!previous) previous = now;
    if (now - previous > least) {
      fn();
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    }
  }
}
