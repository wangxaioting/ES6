// function Foo () { 
//     try { 
//         console.log(this) 
//         console.log('内部1', this.a()) 
//     } catch (e) { } 
//     this.a = function(){ 
//         console.log('内部2',1) 
//     } 
//     Foo.a = function() { 
//         console.log('内部3',2) 
//     } 
//     return Foo 
// } 

// Foo.a = function() {
//     console.log('外部',4)
// } 

// Foo.prototype.a = function() {
//     console.log('外部5',5)
// } 

// Foo.a() 

// const obj = new Foo() 

// obj.a() 
// Foo.a()

var a =1,b=2

a = [b,b=a][0]
console.log(a,b);
