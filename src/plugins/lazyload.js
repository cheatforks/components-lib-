export default {
  install(Vue, options = {
    fadein: false,
    speed: 20
  }) {
    // 自定义滚动结束事件
    if (options.speed) {
      let cntr = 0;
      let lastCntr = 0;
      let diff = 0;
      let scrollEnd = new Event('scrollEnd', {
        'bubbles': true,
        'cancelable': false
      });
      // 检测滚动结束节点
      let enterFrame = function enterFrame() {
        if (cntr !== lastCntr) {
          diff++;
          if (diff === 5) {
            document.dispatchEvent(scrollEnd);
            cntr = lastCntr;
          }
        }
        window.requestAnimationFrame(enterFrame);
      };

      window.requestAnimationFrame(enterFrame);
      document.addEventListener('scroll', function () {
        lastCntr = cntr;
        diff = 0;
        cntr++;
      }, true);
    }
    // 计算滚动速度
    let lastPos = document.body.getBoundingClientRect();
    let lastPosX = lastPos.left;
    let lastPosY = lastPos.top;
    let lastSpeeds = [];
    let aveSpeed = 0;

    function getSpeed(el) {
      let curPosY = el ? el.getBoundingClientRect().top : 0;
      let curPosX = el ? el.getBoundingClientRect().left : 0;
      let speedY = lastPosY - curPosY;
      let speedX = lastPosX - curPosX;
      if (lastSpeeds.length < 10) {
        lastSpeeds.push((speedY + speedX) / 2);
      } else {
        lastSpeeds.shift();
        lastSpeeds.push((speedY + speedX) / 2);
      }
      let sumSpeed = 0;
      lastSpeeds.forEach(function (speed) {
        sumSpeed += speed;
      });
      aveSpeed = Math.abs(sumSpeed / lastSpeeds.length);
      lastPosY = curPosY;
      lastPosX = curPosX;
    }

    // 获取元素节点计算速度
    document.addEventListener('scroll', function (e) {
      if (!options.speed) return;
      let el = null;
      for (let i = 0; i < e.target.childNodes.length; i++) {
        if (e.target.childNodes[i].nodeType === 1) {
          el = e.target.childNodes[i];
          break;
        }
      }
      getSpeed(el);
    }, true);
    // 绑定Vue指令的update钩子函数
    function update(el, binding) {
      let {
        value, modifiers
      } = binding;
      if (value) return;
      let isFadeIn = modifiers.fadein || options.fadein;
      if (isFadeIn) {
        el.style.opacity = 0;
        el.style.transition = 'opacity .3s';
      }
      let compute = function () {
        if (el === null) return;
        let rect = el.getBoundingClientRect();
        let vpWidth = document.body.clientWidth;
        let vpHeight = document.body.clientHeight;
        let loadImg = function () {
          el.src = value;
          el.addEventListener('load', onloadEnd);
          window.removeEventListener('scrollEnd', compute, true);
          window.removeEventListener('resize', compute, true);
          window.removeEventListener('scroll', computeBySpeed, true);
          lastSpeeds = [];
        };
        if (el.src === value) return;
        if (rect.bottom >= 0 && rect.top <= vpHeight && rect.right >= 0 && rect.left <= vpWidth) {
          loadImg();
        }
      };

      let computeBySpeed = function () {
        if (options.speed && aveSpeed > options.speed) return;
        compute();
      };

      let onload = function () {
        console.log('add');
        compute();
        el && el.removeEventListener('load', onload);
        window.addEventListener('scrollEnd', compute, true);
        window.addEventListener('resize', compute, true);
        window.addEventListener('scroll', computeBySpeed, true);
      };

      let onloadEnd = function () {
        if (el === null) return;
        if (isFadeIn) {
          el.style.opacity = 1;
          el.removeEventListener('load', onloadEnd);
        }
      };

      el.addEventListener('load', onload);
    }

    Vue.directive('lazyload', update);
  }
};
