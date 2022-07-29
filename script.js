const calculatordisplay = document.querySelector('h1');
const inputbtn = document.querySelectorAll('button'); //array
const clearbtn = document.getElementById('clear-btn');

//ตัวเลขที่ 1 ตัวดำเนินการ ตัวเลขที่ 2 ex. 1 + 2

const calculate = {
    "/": (firstnumber, secondnumber) =>secondnumber!=0? firstnumber / secondnumber: "error",
    "*": (firstnumber, secondnumber) => firstnumber * secondnumber,
    "+": (firstnumber, secondnumber) => firstnumber + secondnumber,
    "-": (firstnumber, secondnumber) => firstnumber - secondnumber,
    "=": (firstnumber, secondnumber) => secondnumber
}

let firstvalue = 0; //ตัวเลขที่ 1
let operatorvalue = ''; //เก็บตัวดำเนินการ
let waitfornext = false; //เก็บาถานะของตัวเลชและตัวดำเนินการ


function setNumberValue(number) {
    if (waitfornext) {
        calculatordisplay.textContent = number;
        waitfornext = false;
    } else {
        const displayvalue = calculatordisplay.textContent;
        calculatordisplay.textContent = displayvalue === '0' ? number : displayvalue + number;
    }
}

function calloperator(operator) {
    const currentvalue = Number(calculatordisplay.textContent);

    if (operatorvalue && waitfornext) {
        operatorvalue = operator;
        return;
    }

    if (!firstvalue) {
        firstvalue = currentvalue; //ค่าเริ่มต้น
    } else {
        const result = calculate[operatorvalue](firstvalue, currentvalue);
        calculatordisplay.textContent = result;
        firstvalue = result;
        if(result == "error"){
            resetall();
        }
    }
    waitfornext = true;
    operatorvalue = operator;

}

function addDecimal() {
    if (waitfornext) return;
    if (!calculatordisplay.textContent.includes(".")) {
        calculatordisplay.textContent = `${calculatordisplay.textContent}.`;
    }

}





inputbtn.forEach((input) => {
    //ปุ่ม 0-9
    if (input.classList.length === 0) {
        input.addEventListener('click', () => setNumberValue(input.value));
    } else if (input.classList.contains("operator")) {
        //ปุ่ม + - * /
        input.addEventListener('click', () => calloperator(input.value));
    } else if (input.classList.contains("decimal")) {
        //ปุ่ม .
        input.addEventListener('click', () => addDecimal());
    }

});

function resetall() {
    firstvalue = 0;
    operatorvalue = '';
    waitfornext = false;
    calculatordisplay.textContent = '0';
}
clearbtn.addEventListener('click', () => resetall());