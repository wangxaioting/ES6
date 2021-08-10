function Greeting(name) {
    this.name = name;
}



// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);
