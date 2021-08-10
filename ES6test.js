let {length : len} = 'hello';
console.log(len);

var arr1 = [1, 2];
var arr2 = [3, 4];
let ab = [arr1, arr2].map(arr => {
    var a = arr[0];
    var b = arr[1];
    return a + b
})
console.log(ab);

const json = '"\u2028"';
JSON.parse(json); // 可能报错,json字符串转对象
console.log(json);

//raw方法斜杠也会转义
let str = String.raw`Hi\\`
console.log(str);

/* 字符以 UTF-16 的格式储存，每个字符固定为2个字节。
对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），
JavaScript 会认为它们是两个字符。用charCodeAt */
var s = "𠮷a"
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271
console.log( s.length);

function push(array, ...items) {
    items.forEach(function(item) {
      array.push(item);
      console.log(item);
    });
  }
  
  var a = [];
  push(a, 1, 2, 3)
  console.log(a);

  var handler = {
    id: '123456',
  
    init: function() {
      document.addEventListener('click',
        event => this.doSomething(event.type), false);
    },
  
    doSomething: function(type) {
      console.log('Handling ' + type  + ' for ' + this.id);
    }
  };
  
  function foo(){}
  console.log( foo.toString());

  /* 当一个函数并非对象的属性，而是直接作为函数进行调用时，为函数调用模式。
  在非严格模式下，`this`绑定到全局对象，否则为`undefined`。 */
  var name = "windowsName";

  var a = {
      name : "Cherry",

      func1: function () {
          console.log(this.name)     
      },

      func2: function () {
          setTimeout( function () {
              console.log(this.name);
          },100);
      }

  };
  a.func2()  

  var name = "windowsName";

  var a = {
      name : "Cherry",

      func1: function () {
          console.log(this.name)     
      },

      func2: function () {
        _this = this
        www();
        //www为全局函数
        function www() {
              console.log(_this.name);
          };
      }

  };
  a.func2()  

  var wxt = [1,2,3]
  function w(){
      let wxx = [3,3]
      wxt = wxx
      wxx.push(6)
      console.log(wxx); 
  }
  w()
  console.log(wxt);

var a1 = [1, 2];
// 写法一
var a2 = [...a1];
a1[0]=3
console.log(a1[0]===a2[0])

let str = 'x\uD83D\uDE80y';
console.log([...str].reverse().join(''));

for(item in {a:2,b:3}){
    console.log(item);
}

//super和this
const proto = {
    foo: 'hello'
  };
  
const obj = {
foo: 'world',
find() {
    return this.foo;
}
};

Object.setPrototypeOf(obj, proto);
console.log(obj.find()); 

//原型
var obj1 = {
    a: "asfssdf",
    b: 121111,
    c: [1, 2, 3],
    e: 322
};
var obj2 = {
    d: ["sdf", 111, "ok"],
    e: 999
};
Object.setPrototypeOf(obj1, obj2); //将obj1原型设置为obj2
for (item in obj1) { //for in会遍历原型中部分属性
    console.log(obj1[item])
} //a b c d e
console.log(obj1['d']); //["sdf", 111, "ok"]

//解构赋值
function baseFunction({ a, b }) {
    console.log(a,b);
  }
  function wrapperFunction({ x, y, ...restConfig }) {
    // 使用 x 和 y 参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
  }
  wrapperFunction({ x:1,y:2,a:3,b:4})

//Object.setPrototypeOf()
  let proto = {x:30};
  let obj = { x: 10 };
  Object.setPrototypeOf(obj, proto);
  
  proto.y = 20;
  proto.z = 40;
  
  console.log(obj.x);
  console.log(obj.y )// 20
  obj.z // 40

const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map);  // Map { foo: "bar", baz: 42 }

const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');

const  firstName = '' || 'default';
console.log(firstName==false);


var a = [1,2,3,4];
var newa = a.map(function(x){
 return x+1;
});
console.log(newa,a); 

