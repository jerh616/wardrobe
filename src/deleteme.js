function foo() {
  console.log(this.a);
}

const a = 5;

const obj = {
  a: 2,
};

function bar() {
  foo.call(obj);
}

bar();
setTimeout(bar, 100);

bar.call(global);
