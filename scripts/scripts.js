let firstNumber = 0;
let secondNumber = 0;
let selectedOperator = null;
let result;
let avaiblePages = ["calculator"]
let numbers = document.querySelectorAll('.calculatorNumber');

let operators = document.querySelectorAll('.calculatorOperator');

let methdods = document.querySelectorAll('.calculatorMethod');

function backHome(){
    window.location = "index.html";
}


numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        if (selectedOperator == null) {
            firstNumber = firstNumber * 10 + parseInt(number.textContent);
            document.getElementById("screen").textContent = firstNumber;
        }else if (selectedOperator != null) {
            secondNumber = secondNumber * 10 + parseInt(number.textContent);
            document.getElementById("screen").textContent = firstNumber + selectedOperator + secondNumber;
        }


    })
})

operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        selectedOperator = operator.textContent;


    })
})

methdods.forEach(methdod => {
    methdod.addEventListener('click', (event) => {
        switch (methdod.textContent) {
            case 'C':
                if (selectedOperator != null) {
                    secondNumber = 0;
                    document.getElementById("screen").textContent = firstNumber + selectedOperator + secondNumber;
                }else{
                    firstNumber = 0;
                    document.getElementById("screen").textContent = firstNumber;
                }
                break;
            case "CE":
                reset(0);
                break;
            case '=':
                result = equals();
                reset(result);
                document.getElementById("screen").textContent = result;

                break;
        }
    })
})


function equals(){

    switch(selectedOperator){
        case '-':
            return firstNumber - secondNumber;
        case '+':
            return firstNumber + secondNumber;
        case '/':
            if (secondNumber == 0){
                explode();
            }

            return firstNumber / secondNumber;
        case '*':
            return firstNumber * secondNumber;
        default:
            return firstNumber;
    }
}


function reset(result) {
    selectedOperator = null;
    firstNumber = result;
    secondNumber = 0;
    document.getElementById("screen").textContent = firstNumber;
}

function explode() {
    const table = document.getElementById('explode-table');
    const cells = table.querySelectorAll('th, td');
    const text = document.getElementById('final-words');


    text.innerText = "I told you!!!";
    text.classList.add('explode');

    cells.forEach(cell => {
        cell.classList.add('explode');

    });
}

let screen = document.getElementById("console-screen");

function setScreen(){
    screen.editable = true;
    consoleInputPrefix.classList.add('blink_me');
    screen.innerText = "Welcome to 0xVacent's terminal. Where do you wish to go?";
    for (page in avaiblePages){
        screen.innerText = screen.innerText + "\n- " + avaiblePages[page];
    }

}


let consoleInput = document.getElementById("console-input");
let consoleInputPrefix = document.getElementById("consoleInputPrefix");
let consoleInputContainer = document.getElementById("console-input-container");


consoleInput.addEventListener("focusin", (event) => {
    consoleInputContainer.classList.add('outline_me');
    consoleInput.addEventListener("keydown", (event) => {
        if(screen.editable == true) {
            if (event.key === "Enter") {
                switch (consoleInput.value) {
                    case "cls":
                        screen.innerText = " ";
                        consoleInput.value = "";
                        break;
                    case "help":
                        screen.innerText = screen.innerText + "\n" + "> " + consoleInput.value;
                        screen.innerText = screen.innerText + "\n" + "Enter the name of the page you want to visit!";
                        consoleInput.value = "";
                        break;
                    case "calculator":
                        screen.innerText = screen.innerText + "\n" + "> " + consoleInput.value;
                        screen.innerText = screen.innerText + "\n" + "Loading...";
                        consoleInput.value = "";
                        screen.editable = false;
                        setTimeout(() => {
                            window.location = "calculator.html";
                        }, 2000);
                        break;
                    default:
                        screen.innerText = screen.innerText + "\n" + "> " + consoleInput.value;
                        consoleInput.value = "";
                        break;
                }
            }
        }
    })
})


consoleInput.addEventListener("focusout", (event) => {
    consoleInputContainer.classList.remove('outline_me');

})

