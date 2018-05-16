
import jscalc from 'jscalc';


// 计算 + - * /
const calc = function (type,paramOne,paramTwo) {
    switch( type )
    {
        case '+':
            return jscalc.Add(parseFloat(paramOne),parseFloat(paramTwo));
        case '-':
            return jscalc.Subtr(parseFloat(paramOne),parseFloat(paramTwo));
        case '*':
            return jscalc.Mul(parseFloat(paramOne),parseFloat(paramTwo));
        case '/':
            return jscalc.Div(parseFloat(paramOne),parseFloat(paramTwo));
    }
}

export {
    calc
}