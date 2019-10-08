function eval() {
    // Do not use eval!!!
    return;
}
const priority = {
    '(': 1,
    '+': 2,
    '-': 2,
    '*': 3,
    '/': 3
}

function expressionCalculator(expr) {

    let output = [];
    let stack = [];
    let input = expr.replace(/\s/g, '').match(/((\+{1})|(\-{1})|(\*{1})|(\/{1})|(\({1})|(\){1})|(\d+))/g);
    let i = 0;
    while (i < input.length) {
        let token = input[i];
        if (isFinite(token)) {
            output.push(token);
        }
        if (token in priority) {
            if ((priority[token] > priority[stack[stack.length - 1]]) || (!stack.length)) {
                stack.push(token);
            } else {
                if ((stack.length) && (token != '(')) {
                    while ((priority[stack[stack.length - 1]] >= priority[token])) {
                        let last_token = stack.pop();
                        output.push(last_token);
                    }
                }
                stack.push(token);
            }
        } else {
            if (token == ')') {
                let item = '';
                let flag_bracket = false;
                while (stack.length) {
                    item = stack.pop();
                    if (item != '(') {
                        output.push(item);
                    }
                    if ((item == '(')) {
                        flag_bracket = true;
                        break;
                    }
                }
                if ((!flag_bracket) && (!stack.length)) throw new Error("ExpressionError: Brackets must be paired");
            }
        }
        i++;
    }
    while (stack.length) {
        let token = stack.pop();
        if (token == "(") throw new Error("ExpressionError: Brackets must be paired");
        else output.push(token);
    }
    return rpn(output);
}


function rpn(expr) {
    let stack = [];
    let result = 0;
    expr.forEach((item) => {
        if (item in priority) {
            if (stack.length < 2) {
                throw new Error("Not enough data in stack");
            }
            let y = Number(stack.pop());
            let x = Number(stack.pop());
            switch (item) {
                case '*':
                    result = x * y;
                    break;
                case '/':
                    if (y != 0) {
                        result = x / y;
                        break;
                    } else throw new Error("TypeError: Division by zero.");
                case '+':
                    result = x + y;
                    break;
                case '-':
                    result = x - y;
                    break;
            }
            stack.push(result);
        } else if (isFinite(item)) {
            stack.push(item);
        } else throw new Error("Not a number");
    });
    if (stack.length > 1) throw new Error("Error of amount operands and operators");
    return stack.pop();

}

module.exports = {
    expressionCalculator
}