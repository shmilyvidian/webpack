require('babel-polyfill')
//expose-loader 暴露全局的loader
import $ from 'jquery';
const fn = (a,b=5)=>console.log(a+b)
class A{
  a = 1;
  constructor(){
    console.lo('hhhhh2222222222')
  }
}

const a = new A();
function *s(){
  yield 1
}
const b = s().next();
console.log($,'jquery')
'aaa'.includes('a')
require('./index.css')
require('./index.less')