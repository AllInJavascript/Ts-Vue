//类型注解
let var1: string
var1 = 'xixi'
// var1 = 1 //no

// 类型推论
let var2 = 1
// var2 = null //no

//原始类型： string number boolean undefined null symbol
let var3: null
var3 = null



//类型数组
let arr: string[]
//arr = ['a', 1] //no
arr = ['a', 'b']

//any类型
let var5: any
var5 = 1
var5 = 'xixi'

//函数类型约束
function greet(person: string): string {
  return 'hello' + person
}
const msg = greet('xiaoning')

//void类型 没有返回值的函数
function warn(): void { }

//对象 object, 不是原始类型的都是对象类型
function fn1(o: object) { }
fn1({ prop: 0 })
// fn1(1) no


//正确姿势:用对象字面量约束参数类型
function fn2(o: { prop: number }) { }
fn2({ prop: 0 })
// fn2({prop:'xixi'}) no 

//类型别名 type， 自定义类型
type Prop = { prop: number }
function fn3(o: Prop) { }
fn3({ prop: 1 })

//interface 和 type区别 基本一致 ，兼容性上有区别，type2.7  建议用interface
//用interface很难描述用 type

interface Prop2 {
  prop: number
}


//类型断言
const someValue: any = 'this is a string'
console.log((someValue as string).length)


//联合类型声明： 相当于或语句 
let var4: string | number
//var4 = null //no
var4 = 1
var4 = 'test'


//交叉类型: 扩展
type First = { first: number }
type Second = { second: number }
type FirstAndSecond = First & Second

function fn4(): FirstAndSecond {
  return { first: 1, second: 2 }
}

//函数
//1 设置了就是必填参数
//2 默认值 msg = 'abc'
//3 可选参数,放到最后 sex?:string
function greeting(person: string, msg: string = 'abc', sex?: string): string {
  return ''
}

greeting('xiaoyan')

//函数重载: 先声明， 在实现
//场景：源码 框架
//通过不同参数个数、参数类型或者返回值的类型来区分同名函数

//函数声明
function watch(cb1: () => void): void
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void

//函数实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void) {
  if (cb1 && cb2) {
    console.log('执行重载2');

  } else {
    console.log('执行重载1');

  }
}
// watch()

// 类
// 1 访问修饰符 priva protected public
// 2 参数属性
// 3 方法也有修饰符
// 4 存取器, 可用于计算属性
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问

  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") { }

  // 方法也有修饰符
  private someMethod() { }
  // 存取器：属性方式访问，可添加额外逻辑，控制读写性

  get foo() {
    return this._foo;
  }

  set foo(val) {
    this._foo = val;
  }
}

const p = new Parent()
// p.foo
// p.tua

class Child extends Parent {
  say() {
    // this.bar
  }
}

const c = new Child()
// c.foo
// c.tua


//接口 ：约束结构，不要求实现，使用更简单
interface Person {
  one: string,
  two: string
}

function sayHi(person: Person): string {
  return 'Hello' + person.one + ' ' + person.two
}

// sayHi({ one: 'XIAOYAN', two: 'AGE' })  //OK
// sayHi('XIAOYAN') //ON

//泛型
//指在定义函数，接口，类的时候，不预先指定具体类型，而在使用的时候再指定类型的一种特性，以此增加类型的通用性
//泛型是ts的精华

//返回的结果数据 不通用
// interface Result {
//   ok: 0 | 1,
//   data: Feature[];
// }


//使用泛型
interface Result<T> {
  ok: 0 | 1,
  data: T
}
//定义泛型方法
function getResult<T>(data: T): Result<T> {
  return { ok: 1, data }
}

//用尖括号的方式指定 T 为string
getResult<string>('hello')

//类型推断 指定T为number
getResult(1)

//声明文件 *.d.ts
//使用ts开发时，如果要使用第三方js库的同时还想利用ts诸如类型检测等特性就需要声明文件，类似xx.d.ts
//同时，vue项目中还可以在shims-vue.d.ts中编写，从而扩展模块，这个特性叫做模块补充


//装饰器
//装饰器表达式会在运行时当做函数被调用
//1 类装饰器 参数只有一个 就是要装饰的类
function log(target: Function) {
  console.log(target === Foo)
  target.prototype.log = function () {
    console.log(this.bar)
  }
}

//2 方法装饰器
//三个参数： target类、 name方法名、 descriptor描述符
function dong(target: any, name: string, descriptor: any) {
  const baz = descriptor.value; //保存原方法
  descriptor.value = function (val: string) { //覆盖原方法
    console.log('dong~~') // 添加修饰内容

    baz.call(this, val)
  }
  return descriptor
}

//3 属性装饰器
//两个参数： target类的实例 name属性
function mua(option: string) {
  return function mua(target: any, name: string) {
    target[name] = option
  }
}


@log
class Foo {
  bar = 'bar'
  @mua('xiaozhang') ns!: string

  @dong
  setBar(val: string) {
    this.bar = val
  }
}

const foo = new Foo()
//foo.log()
foo.setBar('xiaoming')
console.log(foo.ns)


console.log('ts code running!!!')