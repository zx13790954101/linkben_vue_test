// mtouch插件的扩展

//import './mTouch.js'
import MTouch from "Mtouch"

window.requestAnimFrame = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var active = {
  getLength: function getLength(v1) {
      if ((typeof v1 === 'undefined' ? 'undefined' : _typeof(v1)) !== 'object') {
          console.error('getLength error!');
          return;
      }
      return Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  },
  getAngle: function getAngle(v1, v2) {
      if ((typeof v1 === 'undefined' ? 'undefined' : _typeof(v1)) !== 'object' || (typeof v2 ===
              'undefined' ? 'undefined' : _typeof(v2)) !== 'object') {
          console.error('getAngle error!');
          return;
      }
      // 鍒ゆ柇鏂瑰悜锛岄『鏃堕拡涓� 1 ,閫嗘椂閽堜负 -1锛�
      var direction = v1.x * v2.y - v2.x * v1.y > 0 ? 1 : -1,

          // 涓や釜鍚戦噺鐨勬ā锛�
          len1 = this.getLength(v1),
          len2 = this.getLength(v2),
          mr = len1 * len2,
          dot = void 0,
          r = void 0;
      if (mr === 0) return 0;
      // 閫氳繃鏁伴噺绉叕寮忓彲浠ユ帹瀵煎嚭锛�
      // cos = (x1 * x2 + y1 * y2)/(|a| * |b|);
      dot = v1.x * v2.x + v1.y * v2.y;
      r = dot / mr;
      if (r > 1) r = 1;
      if (r < -1) r = -1;
      // 瑙ｅ€煎苟缁撳悎鏂瑰悜杞寲涓鸿搴﹀€硷紱
      return Math.acos(r) * direction * 180 / Math.PI;
  },
  getBasePoint: function getBasePoint(el) {
      if (!el) return {
          x: 0,
          y: 0
      };
      var offset = this.getOffset(el);
      var x = offset.left + el.getBoundingClientRect().width / 2,
          y = offset.top + el.getBoundingClientRect().width / 2;
      return {
          x: Math.round(x),
          y: Math.round(y)
      };
  },
  extend: function extend(obj1, obj2) {
      for (var k in obj2) {
          if (obj2.hasOwnProperty(k)) {
              if (_typeof(obj2[k]) == 'object' && !(obj2[k] instanceof Node)) {
                  if (_typeof(obj1[k]) !== 'object') {
                      obj1[k] = {};
                  }
                  this.extend(obj1[k], obj2[k]);
              } else {
                  obj1[k] = obj2[k];
              }
          }
      }
      return obj1;
  },
  getVector: function getVector(p1, p2) {
      if ((typeof p1 === 'undefined' ? 'undefined' : _typeof(p1)) !== 'object' || (typeof p2 ===
              'undefined' ? 'undefined' : _typeof(p2)) !== 'object') {
          console.error('getvector error!');
          return;
      }
      var x = Math.round(p1.x - p2.x),
          y = Math.round(p1.y - p2.y);
      return {
          x: x,
          y: y
      };
  },
  getPoint: function getPoint(ev, index) {
      if (!ev || !ev.touches[index]) {
          console.error('getPoint error!');
          return;
      }
      return {
          x: Math.round(ev.touches[index].pageX),
          y: Math.round(ev.touches[index].pageY)
      };
  },
  getOffset: function getOffset(el) {
      el = typeof el == 'string' ? document.querySelector(el) : el;
      var rect = el.getBoundingClientRect();
      var offset = {
          left: rect.left + document.body.scrollLeft,
          top: rect.top + document.body.scrollTop,
          width: el.offsetWidth,
          height: el.offsetHeight
      };
      return offset;
  },
  matrixTo: function matrixTo(matrix) {
      var arr = matrix.replace('matrix(', '').replace(')', '').split(',');
      var cos = arr[0],
          sin = arr[1],
          tan = sin / cos,
          rotate = Math.atan(tan) * 180 / Math.PI,
          scale = cos / Math.cos(Math.PI / 180 * rotate),
          trans = void 0;
      trans = {
          x: parseInt(arr[4]),
          y: parseInt(arr[5]),
          scale: scale,
          rotate: rotate
      };
      return trans;
  },
  getUseName: function getUseName(evName) {
      var useName = evName.replace('start', '');
      var end = useName.indexOf('rotate') !== -1 ? 'nd' : 'end';
      useName = useName.replace(end, '');
      return useName;
  },
  domify: function domify(DOMString) {
      var htmlDoc = document.implementation.createHTMLDocument();
      htmlDoc.body.innerHTML = DOMString;
      return htmlDoc.body.children;
  },
  getEl: function getEl(el) {
      if (!el) {
          console.error('el error,there must be a el!');
          return;
      }
      var _el = void 0;
      if (typeof el == 'string') {
          _el = document.querySelector(el);
      } else if (el instanceof Node) {
          _el = el;
      } else {
          console.error('el error,there must be a el!');
          return;
      }
      return _el;
  },
  data: function data(el, key) {
      el = this.getEl(el);
      return el.getAttribute('data-' + key);
  },
  include: function include(str1, str2) {
      if (str1.indexOf) {
          return str1.indexOf(str2) !== -1;
      } else {
          return false;
      }
  },
  getPos: function getPos(el) {
      if (!el) return;
      el = this.getEl(el);
      var defaulTrans = void 0;
      var style = window.getComputedStyle(el, null);
      var cssTrans = style.transform || style.webkitTransform;

      if (window.getComputedStyle && cssTrans !== 'none') {
          defaulTrans = this.matrixTo(cssTrans);
      } else {
          defaulTrans = {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0
          };
      }
      return JSON.parse(el.getAttribute('data-mtouch-status')) || defaulTrans;
  },
  addCssRule: function addCssRule(selector, rules) {
      if (!sheet) {
          sheet = createStyleSheet();
      }
      sheet.insertRule(selector + '{' + rules + '}', sheet.rules.length);
  }
};
//初始化方法
export const initMtouch = (name) =>{
    var dragTrans = {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0
    };

    var $drag = $(document.querySelector(name));
    var $drags = $(document.querySelector(name));
    var freeze = false;
    var wrap = document.querySelector('.div2');
    wrap = document.querySelector("body");
    console.log("drag",$drag);
    var wrapRect = wrap.getBoundingClientRect();
    var elRect = $drag[0].getBoundingClientRect();
    let mt = new MTouch(document.querySelector(name));
    // bind the drag event锛�
    // $drag.append('<div class="mtouch-singleButton" data-singlebutton="true"></div>');


    mt.switch(document.querySelector(name), true);


    mt.on('drag', function(ev) {
      if (!freeze) {
        dragTrans.x += ev.delta.deltaX;
        dragTrans.y += ev.delta.deltaY;
        set($drag, limit(wrap, $drag[0], dragTrans));
      }
    });


    mt.on('pinch singlePinch', function(ev) {
      if (!freeze) {
        dragTrans.scale *= ev.delta.scale;
        set($drag, dragTrans);
      }
    });
    mt.on('rotate singleRotate', function(ev) {
      if (!freeze) {
        dragTrans.rotate += ev.delta.rotate;
        set($drag, dragTrans);
      }
    });

    $drags.on('click', function(e) {
      freeze = false;
      $drags.removeClass('active');
      $(this).addClass('active');
      
      dragTrans = active.getPos(this);
      $drag = $(this);
      mt.switch(this);
      e.stopPropagation();
    });
    $(wrap).on('click', function() {
      $drags.removeClass('active');
      mt.switch(null);
      freeze = true;
    });

    function set($el, transform) {
      window.requestAnimFrame(function() {
        $el.css('transform', 'translate3d(' + transform.x + 'px,' + transform.y +
          'px,0px) rotate(' + transform.rotate + 'deg) scale(' + transform.scale + ')');
      });
    }

    function limit(wrap, el, trans) {
      var bounce = 40;
      var minX = -el.offsetLeft - bounce;
      var maxX = wrapRect.width - el.offsetLeft - elRect.width + bounce;
      var minY = -el.offsetTop - bounce;
      var maxY = wrapRect.height - el.offsetTop - elRect.height + bounce;
      trans.x = trans.x < minX ? minX : trans.x;
      trans.x = trans.x > maxX ? maxX : trans.x;
      trans.y = trans.y < minY ? minY : trans.y;
      trans.y = trans.y > maxY ? maxY : trans.y;
      return trans;
    }
}



// 暴露 common.js 的方法
export default {
  initMtouch
}