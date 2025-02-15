function add(num1, num2) {

    return "This is Add Function :" + (Number(num1) + Number(num2))
}
function sub(num1, num2) {
    return "This is Sub Function :" + (num1 - num2);
}
function multi() {
    console.log("This is Multi Function");
}
function div() {
    console.log("This is Div Function");
}

module.exports = {
    add: add,
    sub: sub,
    multi: multi,
    div: div
}
