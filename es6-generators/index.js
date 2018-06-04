function* myGenerator() {
    yield 'first'
    let input = yield 'second'
    yield input
}

let gen = myGenerator();

console.log(gen.next())
console.log(gen.next())
console.log(gen.next('third'))
console.log(gen.next())