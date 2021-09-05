# ES6

### 变量解构赋值

1. 由于数组本质是特殊的对象, 因此可以对数组进行对象属性的解构.

```javaScript
let arr = [1, 2, 3];
let {
    0: first,
    [arr.length - 1]: last
} = arr;
first // 1
last // 3
```

上面代码对数组进行对象解构. 数组 `arr` 的 `0` 键对应的值是 `1` , `[arr.length - 1]` 就是 `2` 键, 对应的值是 3. 方括号这种写法, 属于"属性名表达式"(参见《对象的扩展》一章).

2. 函数参数的解构赋值

```javaScript
[
    [1, 2],
    [3, 4]
].map(([a, b]) => a + b);
// [ 3, 7 ]

//等价于
var arr1 = [1, 2];
var arr2 = [3, 4];
[arr1, arr2].map(arr => {
    var a = arr[0];
    var b = arr[1];
    return a + b
})
```

3. undefined就会触发函数参数的默认值.

```JS
[1, undefined, 3].map((x = 'yes') => x);
// [ 1, 'yes', 3 ]
```

### 字符串的扩展

1. 大括号内部可以放入任意的 `JavaScript` 表达式, 可以进行运算, 调用函数以及引用对象属性.

```JS
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {
    x: 1,
    y: 2
};
`${obj.x + obj.y}`
// "3"

function fn() {
    return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar 
```

 2. 字符以 UTF-16 的格式储存, 每个字符固定为2个字节. 对于那些需要 `4` 个字节储存的字符(Unicode 码点大于0xFFFF的字符), JavaScript 会认为它们是两个字符. 就用charCodeAt .
 

```JS
var s = "𠮷";

s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97
```

 codePointAt()方法的参数是不对的, 比如上面代码中, 字符a在字符串s的正确位置序号应该是 `1` , 但是必须向codePointAt()方法传入 `2` . 解决这个问题的一个办法是使用 `for...of` 循环
 

```JS
 let s = '𠮷a';
 for (let ch of s) {
     console.log(ch.codePointAt(0).toString(16));
 }
 // 20bb7
 // 61
```

另一种方法也可以, 使用扩展运算符 `(...)` 进行展开运算.

```JS
let arr = [...'𠮷a']; // arr.length === 2
arr.forEach(
    ch => console.log(ch.codePointAt(0).toString(16))
);
// 20bb7
// 61
```

3. `padStart()`，`padEnd()` 方法

```JS
//padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"

//另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### 数值扩展

1. `Math.hypot() `返回所有参数的平方和的平方根 
2. ` Math.expm1(x)`返回 `e^x - 1`，即`Math.exp(x) - 1`。
3. `Math.log1p(x)`方法返回`1 + x`的自然对数，即`Math.log(1 + x)`。如果`x`小于`-1`，返回`NaN`。
4. `Math.log10(x)`返回以` 10 `为底的`x`的对数。如果`x`小于` 0`，则返回 `NaN`。
5. `JavaScript` 所有数字都保存成 `64` 位浮点数, 这给数值的表示带来了两大限制. 一是数值的精度只能到 `53` 个二进制位(相当于 `16` 个十进制位), 大于这个范围的整数,  `JavaScript` 是无法精确表示的, 这使得 `JavaScript` 不适合进行科学和金融方面的精确计算. 二是大于或等于`2`的`1024`次方的数值,  `JavaScript` 无法表示, 会返回`Infinity`.
    -  ES2020 引入了一种新的数据类型 `BigInt`(大整数), 来解决这个问题, 这是 `ECMAScript` 的第八种数据类型.`BigInt` 只用来表示整数, 没有位数的限制, 任何位数的整数都可以精确表示.  
    - 为了与 `Number` 类型区别, `BigInt` 类型的数据必须添加后缀`n`
    - `BigInt` 不能与普通数值进行混合运算.
    - `比较运算符（比如>）`和`相等运算符（==）`允许 `BigInt` 与其他类型的值混合计算，因为这样做不会损失精度。

```JS
    // 错误的写法
    Math.sqrt(4n) // 报错

    // 正确的写法
    Math.sqrt(Number(4n)) // 2
```

### 函数的扩展   

#### 函数参数的默认值

1. 基本用法
    - ES6 允许为函数的参数设置默认值, 即直接写在参数定义的后面
    - 参数变量是默认声明的, 所以不能用let或const再次声明.

    - 参数默认值不是传值的, 而是每次都重新计算默认值表达式的值. 也就是说, 参数默认值是惰性求值的.      

```JS
                function log(x, y = 'World') {
                    console.log(x, y);
                }
```

2. 与解构赋值默认值结合使用
* 下面代码指定, 如果没有提供参数, 函数foo的参数默认为一个空对象.
 

```JS
    function foo({
        x,
        y = 5
    } = {}) {
        console.log(x, y);
    }

    foo() // undefined 5
```

```JS
function fetch(url, {
    body = '',
    method = 'GET',
    headers = {}
}) {
    console.log(method);
}

fetch('http://example.com', {})
// "GET"

fetch('http://example.com')
// 报错
```

3. 参数默认值的位置
* 如果传入undefined, 将触发该参数等于默认值, null则没有这个效果.    

```JS
function foo(x = 5, y = 6) {
    console.log(x, y);
}

foo(undefined, null)
// 5 null
```

```JS
// 例一
function f(x = 1, y) {
    return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
    return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, , 2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

上面代码中, 有默认值的参数都不是尾参数. 这时, 无法只省略该参数, 而不省略它后面的参数, 除非显式输入undefined.

4. 作用域
* 一旦设置了参数的默认值, 函数进行声明初始化时, 参数会形成一个单独的作用域(context). 等到初始化结束, 这个作用域就会消失.

```JS
var x = 1;

function foo(x, y = function() {
    x = 2;
}) {
    var x = 3;
    y();
    console.log(x);
}

foo() // 3
x // 1
```

上面代码中, 函数foo的参数形成一个单独作用域. 这个作用域里面, 首先声明了变量x, 然后声明了变量y, y的默认值是一个匿名函数. 这个匿名函数内部的变量x, 指向同一个作用域的第一个参数x. 函数foo内部又声明了一个内部变量x, 该变量与第一个参数x由于不是同一个作用域, 所以不是同一个变量, 因此执行y后, 内部变量x和外部全局变量x的值都没变.

如果将var x = 3的var去除, 函数foo的内部变量x就指向第一个参数x, 与匿名函数内部的x是一致的, 所以最后输出的就是2, 而外层的全局变量x依然不受影响.

```JS
var x = 1;

function foo(x, y = function() {
    x = 2;
}) {
    x = 3;
    y();
    console.log(x);
}

foo() // 2
x // 1
```

#### rest参数

* `rest参数` 之后不能再有其他参数(即只能是最后一个参数), 否则会报错

```JS
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}

var a = [];
push(a, 1, 2, 3)
```

#### 严格模式("use strict")

* ES2016 做了一点修改, 规定只要函数参数使用了默认值、 解构赋值、 或者扩展运算符, 那么函数内部就不能显式设定为严格模式, 否则会报错.
* 变量必须声明后再使用
* 函数的参数不能有同名属性, 否则报错
* 不能使用with语句
* 不能对只读属性赋值, 否则报错
* 不能使用前缀0表示八进制数, 否则报错
* 不能删除不可删除的属性, 否则报错
* 不能删除变量delete prop , 会报错, 只能删除属性 selete global[prop]
* eval 不会在它的外层作用域引入变量
* eval和arguments不能被重新赋值
* arguments不会自动反映函数参数的变化
* 不能使用arguments.callee
* 不能使用arguments.caller
* 禁止this指向全局对象
* 不能使用fn.caller和fn.arguments获取函数调用的堆栈
* 增加了保留字(比如protected、 static和interface)

#### 箭头函数

1. 如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```JS
// 报错
let getTempItem = id => {
    id: id,
    name: "Temp"
};

// 不报错
let getTempItem = id => ({
    id: id,
    name: "Temp"
});
```

2. rest 参数与箭头函数结合

```JS
const numbers = (...nums) => nums;

numbers(1, 2, 3, 4, 5)
// [1,2,3,4,5]

const headAndTail = (head, ...tail) => [head, tail];

headAndTail(1, 2, 3, 4, 5)
// [1,[2,3,4,5]]
```

3. 箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。**(箭头函数导致this总是指向函数定义生效时所在的对象)**

```JS
function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function() {
        this.s2++;
    }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0
```

上面代码中, Timer函数内部设置了两个定时器, 分别使用了箭头函数和普通函数. 前者的this绑定定义时所在的作用域(即Timer函数), 后者的this指向运行时所在的作用域(即全局对象). 所以, 3100 毫秒之后, timer.s1被更新了 3 次, 而timer.s2一次都没更新.

```JS
let obj = { //对象不构成单独作用域，所以箭头函数指向全局
    a: 10,
    b: () => {
        console.log(this.a); // undefined
        console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
    },
    c: function() {
        console.log(this.a); // 10
        console.log(this); // {a: 10, b: ƒ, c: ƒ}
    }
}
obj.b();
obj.c();
```

4. 箭头函数的this指向在定义(注意: 是定义时, 不是调用时)的时候继承自外层第一个普通函数的this. 所以, 箭头函数中 this 的指向在它被定义的时候就已经确定了, 之后永远不会改变.

5. 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。
6. 如果箭头函数被非箭头函数包含, 则 `this` 绑定的是最近一层非箭头函数的 `this`, 否则,  `this` 为 `undefined`.
7. 当一个函数并非对象的属性，而是直接作为函数进行调用时，为函数调用模式。在非严格模式下，`this`绑定到全局对象，否则为`undefined`。

#### 尾调用优化

1. 递归函数的改写-柯里化（currying），意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

```JS
function currying(fn, n) {
    return function(m) {
        return fn.call(this, m, n); //fn(m,n)
    };
}

function tailFactorial(n, total) {
    if (n === 1) return total;
    return tailFactorial(n - 1, n * total);
}

const factorial = currying(tailFactorial, 1);

factorial(5) // 120
```

2. ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
3. 尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。
    - 蹦床函数(trampoline)可以将递归执行转为循环执行. 这样就避免了递归执行, 从而就消除了调用栈过大的问题

```JS
function trampoline(f) {
    while (f && f instanceof Function) {
        f = f(); //每次执行结果用一个变量接收
    }
    return f;
}

function sum(x, y) {
    if (y > 0) {
        return sum.bind(null, x + 1, y - 1);
    } else {
        return x;
    }
}

trampoline(sum(1, 100000))
// 100001
```

4. 改变this指向
    - 使用 ES6 的箭头函数
    - 在函数内部使用 `_this = this`
    - new 实例化一个对象
        1. 面试经典问题：new 的过程
        * 创建一个空对象 obj; 
        * 将新创建的空对象的隐式原型指向其构造函数的显示原型
        * 使用 call 改变 this 的指向
        * 如果无返回值或者返回一个非对象值, 则将 obj 返回作为新对象; 如果返回值是一个新对象的话那么直接直接返回该对象.
    - 使用 `apply`、 `call`、 `bind`
        1. `apply` 和 `call` 的区别是 `call` 方法接受的是若干个参数列表, 而 `apply` 接收的是一个包含多个参数的数组.
        2. `bind` 是创建一个新的函数, 我们必须要手动去调用

```JS
        var a = new myFunction("Li", "Cherry");

        new myFunction {
            var obj = {};
            obj.__proto__ = myFunction.prototype;
            var result = myFunction.call(obj, "Li", "Cherry");
            return typeof result === 'obj' ? result : obj;
        }
```

    

```JS
        b.apply(a, [1, 2])
        b.call(a, 1, 2)
        b.bind(a, 1, 2)()
```

### 数组的扩展

1. 扩展运算符（...[1, 2, 3]）
* 只有函数调用时, 扩展运算符才可以放在圆括号中, 否则会报错.

* 复制数组

```JS
//浅拷贝
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
```

* 字符串
    - 凡是涉及到操作四个字节的 `Unicode` 字符的函数, 最好都用扩展运算符改写.

```JS
let str = 'x\uD83D\uDE80y';

//reverse操作就不正确
str.split('').reverse().join('')
// 'y\uDE80\uD83Dx'

[...str].reverse().join('')
// 'y\uD83D\uDE80x'
```

* 对于那些没有部署 `Iterator` 接口(`Iterator`接口有`Map` 和 `Set` 结构,  `Generator` 函数)的类似数组的对象, 扩展运算符就无法将其转为真正的数组.
2. Array.from()
* `Array.from`方法用于将两类对象转为真正的数组: 类似数组的对象(array-like object)和可遍历(iterable)的对象
* 实际应用中, 常见的类似数组的对象是 DOM 操作返回的 NodeList 集合, 以及函数内部的arguments对象. Array.from都可以将它们转为真正的数组.
* 扩展运算符(...)也可以将某些数据结构转为数组.
* 函数中的`argument`s对象, 虽然具有length属性, 但并不是数组, 无法使用数组原型中的方法, 此时通过`Array.prototype.slice.call(arguments)`可将其转换为数组

```JS
function getArray() {
    var tmp = Array.prototype.slice.call(arguments);
    return tmp;
}
```

* Array.from方法还支持类似数组的对象. 所谓类似数组的对象, 本质特征只有一点, 即必须有length属性. 因此, 任何有length属性的对象, 都可以通过Array.from方法转为数组, 而此时扩展运算符就无法转换.

```JS
Array.from({
    length: 3
});
// [ undefined, undefined, undefined ]
```

* `Array.from()`的另一个应用是, 将字符串转为数组, 然后返回字符串的长度.
3. Array.of()
* `Array.of()`方法用于将一组值, 转换为数组.
4. 数组实例的 flat()，flatMap() 
* ` Array.prototype.flat()` 用于将嵌套的数组"拉平", 变成一维的数组. 该方法返回一个新数组

```JS
[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]
```

* `flatMap()`方法对原数组的每个成员执行一个函数(相当于执行`Array.prototype.map()`), 然后对返回值组成的数组执行`flat()`方法. 该方法返回一个新数组, 不改变原数组.**(只能展开一层数组.)**

```JS
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [
    [x * 2]
])
// [[2], [4], [6], [8]]
```

5. 数组的空位
* 数组的空位指, 数组的某一个位置没有任何值. 比如, `Array`构造函数返回的数组都是空位.
* 注意, 空位不是`undefined`, 一个位置的值等于`undefined`, 依然是有值的. 空位是没有任何值, `in`运算符可以说明这一点.

```JS
0 in [undefined, undefined, undefined] // true
0 in [, , , ] // false
```

* 会将数组的空位, 转为`undefined`的方法(`Array.from`, `扩展运算符(...)`), `copyWithin()`会连空位一起拷贝, `for...of`循环也会遍历空位(如果改成`map`方法遍历, 空位是会跳过的).`entries()、 keys()、 values()、 find()和findIndex()`会将空位处理成`undefined`.
* 由于空位的处理规则非常不统一, 所以建议避免出现空位.

```JS
// entries()
[...[, 'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[, 'a'].keys()] // [0,1]

// values()
[...[, 'a'].values()] // [undefined,"a"]

// find()
[, 'a'].find(x => true) // undefined

// findIndex()
[, 'a'].findIndex(x => true) // 0
```

### 对象的扩展

#### 属性名表达式

* 属性名表达式与简洁表示法, 不能同时使用, 会报错.

#### 属性的可枚举性和遍历

* 可枚举性(enumerable)用来控制所描述的属性, 是否将被包括在`for...in`循环之中. 具体来说, 如果一个属性的`enumerable`为`false`, 下面4个操作不会取到该属性.
    -  for..in循环
    -  Object.keys方法
    -  JSON.stringify方法
    - Object.assign()方法
* 属性的遍历
    -  for...in
    -  Object.keys(obj)
    -  Object.getOwnPropertyNames(obj)
    -  Object.getOwnPropertySymbols(obj)
    -  Reflect.ownKeys(obj)

#### super 关键字(指向当前对象的 `原型` 对象) 

1. `Object.setPrototypeOf(obj1,obj2)`设置原型

```JS
var obj1 = {
    a: "asfssdf",
    b: 121111,
    c: [1, 2, 3]
};
var obj2 = {
    d: ["sdf", 111, "ok"],
    e: 999
};
Object.setPrototypeOf(obj1, obj2); //将obj1原型设置为obj2
for (item in obj1) { //for in会遍历原型中部分属性
    console.log(item)
} //a b c d e
```

```JS
var o = {};

function Person(name) {
    this.name = name;
}
//把构造函数放在对象o中执行，那么这个this就是o对象了，执行完后，该o对象就有了实例属性name了。
Person.call(o, "zhenglijing");
```

2. super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错(`目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。`)
3. `super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）或`Object.getPrototypeOf(this).foo.call(this)`（方法）。

```JS
const proto = {
    x: 'hello',
    foo() {
        console.log(this.x);
    },
};

const obj = {
    x: 'world',
    foo() {
        super.foo();
    }
}

Object.setPrototypeOf(obj, proto);

obj.foo() // "world"
```

`super.foo` 指向原型对象 `proto` 的 `foo` 方法, 但是绑定的 `this` 却还是当前对象 `obj` , 因此输出的就是world.

#### 对象扩展运算符

1. 解构赋值
* 解构赋值的拷贝是浅拷贝, 即如果一个键的值是复合类型的值(数组、 对象、 函数)、 那么解构赋值拷贝的是这个值的引用, 而不是这个值的副本.(浅拷贝只会赋值制对象的非对象属性, 不会指向同一个地址.)

```JS
let obj = {
    a: {
        b: 1
    }
};
let {
    ...x
} = obj;
obj.a.b = 2;
x.a.b // 2
```

* 扩展运算符的解构赋值, 不能复制继承自原型对象的属性.

```JS
//设置原型对象属性
const o = Object.create({
    x: 1,
    y: 2
});
o.z = 3;

let {
    x,
    ...newObj
} = o;
let {
    y,
    z
} = newObj;
x // 1
y // undefined
z // 3
```

2. 扩展运算符
* 扩展运算符的参数对象之中, 如果有取值函数get, 这个函数是会执行的.

```JS
let a = {
    get x() {
        throw new Error('not throw yet');
    }
}

let aWithXGetter = {
    ...a
}; // 报错
```

### 对象的新增方法

#### Object.assign()

1. 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果（`这是因为只有字符串的包装对象，会产生可枚举属性。`）
2. `Object.assign()`拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性`（enumerable: false）`。
3. 浅拷贝
4. 取值函数的处理,`Object.assign()`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。

```JS
const source = {
    get foo() {
        return 1
    }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

#### Object.getOwnPropertyDescriptors() 

1. ` ES2017` 引入了`Object.getOwnPropertyDescriptors()`方法, 返回指定对象所有自身属性(非继承属性)的描述对象.
2. ` Object.getOwnPropertyDescriptors()` 方法配合 `Object.defineProperties()` 方法, 就可以实现正确拷贝.(为了解决 `Object.assign()` 无法正确拷贝 `get` 属性和 `set` 属性的问题)

```JS
const source = {
    set foo(value) {
        console.log(value);
    }
};

const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, 'foo')
// { get: undefined,
//   set: [Function: set foo],
//   enumerable: true,
//   configurable: true }
```

3. `Object.getOwnPropertyDescriptors()`方法的另一个用处，是配合`Object.create()`方法，将对象属性克隆到一个新对象。这属于浅拷贝。

```JS
//第一个参数是设置原型，第二个参数是设置自身属性
const clone = Object.create(Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj));
```

#### __proto__属性, Object.setPrototypeOf(), Object.getPrototypeOf() 

1. __proto__属性
* 如果一个对象本身部署了__proto__属性, 该属性的值就是对象的原型.
2. Object.entries()
* Object.entries()方法返回一个数组, 成员是参数对象自身的(不含继承的)所有可遍历(enumerable)属性的键值对数组.

```JS
const obj = {
    foo: 'bar',
    baz: 42
};
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

* Object.entries方法的另一个用处是, 将对象转为真正的Map结构.

```JS
const obj = {
    foo: 'bar',
    baz: 42
};
const map = new Map(Object.entries(obj));
map // Map { 'foo' => 'bar', 'baz' => 42 }
```

3. Object.fromEntries()
* ` Object.fromEntries()`方法是`Object.entries()`的逆操作, 用于将一个键值对数组转为对象.
* 该方法的主要目的, 是将键值对的数据结构还原为对象, 因此特别适合将 `Map` 结构转为对象.

```JS
// 例一
const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

// 例二
const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }
```

### Symbol

1. ES6 引入了一种新的原始数据类型`Symbol`, 表示独一无二的值. 它是 `JavaScript` 语言的第七种数据类型, 前六种是:`undefined`、 `null`、 `布尔值(Boolean)`、 `字符串(String)`、 `数值(Number)`、 `对象(Object)`.
2. 注意，Symbol 值作为对象属性名时，不能用点运算符。
3. 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

```JS
let s = Symbol();

let obj = {
    [s]: function(arg) {
        ...
    }
};

obj[s](123);
```

上面代码中, 如果s不放在方括号中, 该属性的键名就是字符串s, 而不是s所代表的那个 Symbol 值.

4. 属性名的遍历 
* `Symbol` 作为属性名, 遍历对象的时候, 该属性不会出现在`for...in`、 `for...of`循环中, 也不会被`Object.keys()`、 `Object.getOwnPropertyNames()`、 `JSON.stringify()`返回.
* 使用`for...in`循环和`Object.getOwnPropertyNames()`方法都得不到 `Symbol` 键名, 需要使用`Object.getOwnPropertySymbols()`方法.
5. Symbol.for()，Symbol.keyFor()

```JS
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

上面代码中, s1和s2都是 Symbol 值, 但是它们都是由同样参数的Symbol.for方法生成的, 所以实际上是同一个值.
* `Symbol.for()`与`Symbol()`这两种写法, 都会生成新的` Symbol`. 它们的区别是, 前者会被登记在全局环境中供搜索, 后者不会.

5. Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key。

```JS
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

6. 注意，`Symbol.for()`为` Symbol` 值登记的名字，是全局环境的，不管有没有在全局环境运行。

### 运算符的扩展

#### 链判断运算符

* `?. 运算符`, 直接在链式调用的时候判断, 左侧的对象是否为`null`或`undefined`. 如果是的, 就不再往下运算, 而是返回`undefined`.

```JS
a?.b
// 等同于
a == null ? undefined : a.b

a?.[x]
// 等同于
a == null ? undefined : a[x]

a?.b()
// 等同于
a == null ? undefined : a.b()

a?.()
// 等同于
a == null ? undefined : a()
```

#### Null 判断运算符

* `||运算符`, 属性的值如果为`空字符`串或`false`或`0`, 默认值也会生效.
* `ES2020` 引入了一个新的 `Null` 判断运算符`??`. 它的行为类似`||`, 但是只有运算符左侧的值为`null`或`undefined`时, 才会返回右侧的值.

```JS
const animationDuration = response.settings?.animationDuration ? ? 300;
```

上面代码中, 如果response.settings是null或undefined, 或者response.settings.animationDuration是null或undefined, 就会返回默认值300.

### Set 和 Map 数据结构

#### Set 

* Set本身是一个构造函数, 用来生成 Set 数据结构.

```JS
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
// 2 3 5 4
```

* 该方法也可以用于, 去除字符串里面的重复字符.

```JS
[...new Set('ababbc')].join('')
// "abc"
```

* 向 `Set` 加入值的时候, 不会发生类型转换, 所以`5`和`"5"`是两个不同的值.
* `Array.from`方法可以将` Set `结构转为数组. 这就提供了去除数组重复成员的另一种方法.

```JS
function dedupe(array) {
    return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

* `Set` 结构的实例与数组一样, 也拥有`forEach`方法, 用于对每个成员执行某种操作, 没有返回值.

```JS
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

这里需要注意, `Set` 结构的键名就是键值(两者是同一个值), 因此第一个参数与第二个参数的值永远都是一样的.

#### WeakSet

* ` WeakSet` 的成员只能是对象, 而不能是其他类型的值.
* 其次,  `WeakSet` 中的对象都是弱引用, 即垃圾回收机制不考虑 `WeakSet` 对该对象的引用, 也就是说, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存, 不考虑该对象还存在于 `WeakSet` 之中.
* 下面代码是a数组的成员成为 WeakSet 的成员, 而不是a数组本身. 这意味着, 数组的成员只能是对象.

```JS
const a = [
    [1, 2],
    [3, 4]
];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

#### Map

1. 含义和基本用法 
* 只有对同一个对象的引用,  `Map` 结构才将其视为同一个键. 这一点要非常小心.

```JS
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

上面代码的 `set` 和 `get` 方法, 表面是针对同一个键, 但实际上这是两个不同的数组实例, 内存地址是不一样的, 因此 `get` 方法无法读取该键, 返回 `undefined` .
* 如果 `Map` 的键是一个简单类型的值(数字、 字符串、 布尔值), 则只要两个值严格相等,  `Map` 将其视为一个键, 比如`0`和`-0`就是一个键, 布尔值`true`和字符串`true`则是两个不同的键. 另外, `undefined`和`null`也是两个不同的键. 虽然`NaN`不严格相等于自身, 但 `Map` 将其视为同一个键.
2. 遍历方法 
* `Map` 结构的默认遍历器接口(`Symbol.iterator`属性), 就是`entries`方法.

```JS
map[Symbol.iterator] === map.entries
// true
```

```JS
const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

#### WeakMap 

* `WeakMap`只接受对象作为键名(`null`除外), 不接受其他类型的值作为键名.
* `WeakMap` 弱引用的只是键名, 而不是键值. 键值依然是正常引用.

```JS
const wm = new WeakMap();
let key = {};
let obj = {
    foo: 1
};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

* 只要外部的引用消失,  `WeakMap` 内部的引用, 就会自动被垃圾回收清除. 由此可见, 有了 `WeakMap` 的帮助, 解决内存泄漏就会简单很多.

### Proxy

#### 概述

> var proxy = new Proxy(target, handler); 

`Proxy` 对象的所有用法, 都是上面这种形式, 不同的只是handler参数的写法. 其中, `new Proxy()` 表示生成一个 `Proxy` 实例, `target` 参数表示所要拦截的目标对象, `handler` 参数也是一个对象, 用来定制拦截行为.
* 如果`handler`没有设置任何拦截, 那就等同于直接通向原对象.

```JS
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

```JS
var proxy = new Proxy({}, {
    get: function(target, propKey) {
        return 35;
    }
});

let obj = Object.create(proxy);
obj.time // 35
```

上面代码中, `proxy` 对象是 `obj` 对象的原型, `obj` 对象本身并没有 `time` 属性, 所以根据原型链, 会在 `proxy` 对象上读取该属性, 导致被拦截

#### Proxy 实例的方法

1. get() 
* `get`方法用于拦截某个属性的读取操作, 可以接受三个参数, 依次为目标对象、 属性名和 `proxy` 实例本身(严格地说, 是操作行为所针对的对象), 其中最后一个参数可选.
* `get`方法可以继承.

```JS
let proto = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('GET ' + propertyKey);
        return target[propertyKey];
    }
});

let obj = Object.create(proto);
obj.foo // "GET foo"
```

所以如果读取 `obj` 对象继承的属性时, 拦截会生效.

2. set() 
* `set`方法用来拦截某个属性的赋值操作, 可以接受四个参数, 依次为目标对象、 属性名、 属性值和 `Proxy` 实例本身, 其中最后一个参数可选.
* 如果目标对象自身的某个属性不可写, 那么`set`方法将不起作用.

```JS
const obj = {};
Object.defineProperty(obj, 'foo', {
    value: 'bar',
    writable: false
});

const handler = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = 'baz';
        return true;
    }
};

const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // "bar"
```

3. apply() 
* `apply`方法拦截函数的调用、 `call`和`apply`操作.`apply`方法可以接受三个参数, 分别是目标对象、 目标对象的上下文对象(`this`)和目标对象的参数数组.
4. has()
* `has()`方法用来拦截`HasProperty`操作, 即判断对象是否具有某个属性时, 这个方法会生效. 典型的操作就是`in`运算符.`has()`方法可以接受两个参数, 分别是目标对象、 需查询的属性名.

```JS
var handler = {
    has(target, key) {
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
};
var target = {
    _prop: 'foo',
    prop: 'foo'
};
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```

* `has()`方法拦截的是`HasProperty`操作, 而不是`HasOwnProperty`操作, 即`has()`方法不判断一个属性是对象自身的属性, 还是继承的属性.
* 虽然`for...in`循环也用到了`in`运算符, 但是`has()`拦截对`for...in`循环不生效.
5. construct()
* `construct()`方法用于拦截`new`命令
* `construct()`方法返回的必须是一个对象, 否则会报错.
* 由于`construct()`拦截的是构造函数, 所以它的目标对象必须是函数, 否则就会报错.

```JS
const p = new Proxy({}, {
    construct: function(target, argumentsList) {
        return {};
    }
});

new p() // 报错
// Uncaught TypeError: p is not a constructor
```

上面例子中, 拦截的目标对象不是一个函数, 而是一个对象( `new Proxy()` 的第一个参数), 导致报错.
* `construct()`方法中的`this`指向的是`handler`, 而不是实例对象
6. ownKeys()
* `ownKeys()`方法用来拦截对象自身属性的读取操作
* 使用`Object.keys()`方法时, 有三类属性会被`ownKeys()`方法自动过滤, 不会返回.
    - 目标对象上不存在的属性
    - 属性名为 `Symbol` 值
    - 不可遍历（`enumerable`）的属性

    

#### this 问题

```JS
const _name = new WeakMap();

class Person {
    constructor(name) {
        _name.set(this, name);
    }
    get name() {
        return _name.get(this);
    }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined
```

上面代码中, 目标对象 `jane` 的 `name` 属性, 实际保存在外部 `WeakMap` 对象 `_name` 上面, 通过 `this` 键区分. 由于通过 `proxy` . `name` 访问时, `this` 指向 `proxy` , 导致无法取到值, 所以返回 `undefined` .

### Reflect

#### 概述

1. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。
2. 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

#### 静态方法

1. Reflect.get(target, name, receiver)
* 如果`name`属性部署了读取函数(`getter`), 则读取函数的`this`绑定`receiver`.

```JS
var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};

var myReceiverObject = {
    foo: 4,
    bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

2. Reflect.set(target, name, value, receiver)
* 如果`name`属性设置了赋值函数, 则赋值函数的`this`绑定`receiver`.

```JS
var myObject = {
    foo: 4,
    set bar(value) {
        return this.foo = value;
    },
};

var myReceiverObject = {
    foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```

* 注意, 如果 `Proxy`对象和 `Reflect`对象联合使用, 前者拦截赋值操作, 后者完成赋值的默认行为, 而且传入`receiver`, 那么`Reflect.set`会触发`Proxy`.`defineProperty`拦截. 这是因为`Proxy.set`的`receiver`参数总是指向当前的 `Proxy`实例(即上例的`obj`), 而`Reflect.set`一旦传入`receiver`, 就会将属性赋值到`receiver`上面(即`obj`), 导致触发`defineProperty`拦截.

```JS
let p = {
    a: 'a'
};

let handler = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver)
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
};

let obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty
```

3. Reflect.construct(target, args)

```JS
function Greeting(name) {
    this.name = name;
}

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法,如果Reflect.construct()方法的第一个参数不是函数，会报错。
const instance = Reflect.construct(Greeting, ['张三']);
```

### Promise 对象

#### 基本用法

```JS
const promise = new Promise(function(resolve, reject) {
    // ... some code

    if ( /* 异步操作成功 */ ) {
        resolve(value);
    } else {
        reject(error);
    }
});
```

1. `resolve`函数的作用是, 将`Promise`对象的状态从"未完成"变为"成功"(即从 `pending` 变为 `resolved`), 在异步操作成功时调用, 并将异步操作的结果, 作为参数传递出去; `reject`函数的作用是, 将`Promise`对象的状态从"未完成"变为"失败"(即从 `pending` 变为 `rejected`), 在异步操作失败时调用, 并将异步操作报出的错误, 作为参数传递出去.

```JS
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function() {
    console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
2. 上面代码中，`Promise` 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

```JS
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
3. 上面代码中，`p1`是一个 `Promise`，`3` 秒之后变为`rejected`。`p2`的状态在 `1` 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 `Promise`，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态。所以，后面的`then`语句都变成针对后者（`p1`）。又过了 `2 `秒，`p1`变为`rejected`，导致触发`catch`方法指定的回调函数。