var btn_0; var btn_1; var btn_2; var btn_3; var btn_4; var btn_5; var btn_6; var btn_7; var btn_8; var btn_9; var btn_p; var btn_n; var btn_e; var btn_m; var btn_d; var input; var btn_b; var btn_c;

window.addEventListener('load', (event) => {
    btn_0 = document.getElementById("btn_0");
    btn_1 = document.getElementById("btn_1");
    btn_2 = document.getElementById("btn_2");
    btn_3 = document.getElementById("btn_3");
    btn_4 = document.getElementById("btn_4");
    btn_5 = document.getElementById("btn_5");
    btn_6 = document.getElementById("btn_6");
    btn_7 = document.getElementById("btn_7");
    btn_8 = document.getElementById("btn_8");
    btn_9 = document.getElementById("btn_9");
    btn_p = document.getElementById("btn_+");
    btn_n = document.getElementById("btn_-");
    btn_e = document.getElementById("btn_=");
    btn_m = document.getElementById("btn_*");
    btn_d = document.getElementById("btn_/");
    input = document.getElementById("input");
    btn_c = document.getElementById("btn_c");
    btn_b = document.getElementById("btn_b");
});

document.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key.length == 1) {
        button_click(key);
    } else if (key == 'Backspace') {
        button_click('back')
    } else if (key == 'Enter') {
        button_click('=')
    }
});

let enter = false;

function button_click(key) {
    if (enter) {
        enter = false;
        input.value = '';
    }
    if (key == 'clear') {
        input.value = '';
    } else if (key == 'back') {
        input.value = input.value.slice(0, -1);
    } else if (key == '=') {
        enter = true;
        input.value = solve(input.value);
    } else {
        input.value += key;
    }
}

class Token {
    constructor(_type, _value){
        this.type = _type
        this.value = _value
    }
}

const TokenType = {
    Plus:'+',
    Minus:'-',
    Multiply:'*',
    Divide:'/',
    Number:'Number'
}

function solve(value) {
    let tokens = parse(value);
    if (typeof tokens === 'string') 
        return tokens;
    let result = interperate(tokens)
    return result
}

function interperate(tokens){
    try {
        let result = '';
        let last = 0;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (last > 1) throw Error(); 
            switch (token.type) {
                case TokenType.Number: last += 1; break;
                case TokenType.Plus: result = Number(tokens[i - 1].value) + Number(tokens[i + 1].value); last = 0; break;
                case TokenType.Minus: result = tokens[i - 1].value - tokens[i + 1].value; last = 0; break;
                case TokenType.Multiply: result = tokens[i - 1].value * tokens[i + 1].value; last = 0; break;
                case TokenType.Divide: result = tokens[i - 1].value / tokens[i + 1].value; last = 0; break;
            }
        }
        return result
    }
    catch {
        return 'Error'
    }
}

function parse(value){
    let tokens = [];
    let chars = value.split('');
    let currentnum = ''
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (isNumber(char)){
            isnum = true;
            currentnum += char;
            continue;
        }
        else if (currentnum != ''){
            tokens.push(new Token(TokenType.Number, currentnum));
            currentnum = '';
        }
        switch (char) {
            case '+': tokens.push(new Token(TokenType.Plus, char)); break;
            case '-': tokens.push(new Token(TokenType.Minus, char)); break;
            case '*': tokens.push(new Token(TokenType.Multiply, char)); break;
            case '/': tokens.push(new Token(TokenType.Divide, char)); break;
            default: return "Invalid char '" + char + "'";
        }
    }
    if (currentnum != ''){
        tokens.push(new Token(TokenType.Number, currentnum));
    }
    return tokens;
}

function isNumber(char) {
    return /^\d$/.test(char) || char === '.';
}