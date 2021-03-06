const calculator = document.querySelector(".calculator")
const keys = document.querySelector(".calculator__keys")
const display = document.querySelector(".calculator__display")

const calculate = (n1, operator, n2) => {
    let result = ""

    if (operator === "add") {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === "subtract") {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === "multiply") {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === "divide") {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        //Remove 'is-depressed' class from all operator keys after number key is pressed
        Array.from(key.parentNode.children).forEach((k) =>
            k.classList.remove("is-depressed")
        )

        if (!action) {
            //replace default 0 in calc with number pressed
            if (displayedNum === "0" || previousKeyType === "operator") {
                display.textContent = keyContent
                calculator.dataset.previousKeyType = "number"
                //add key pressed to number already in display
            } else {
                display.textContent = displayedNum + keyContent
            }

            console.log("number key")
        }

        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator && previousKeyType !== "operator") {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue

                //update calculated value as firstValue
                calculator.dataset.firstValue = calcValue
            } else {
                //if there are no calculations, set displayedNum as the firstValue
                calculator.dataset.firstValue = displayedNum
            }

            calculator.dataset.operator = action
            //to know which operator is active
            key.classList.add("is-depressed")
            //add custom attribute
            calculator.dataset.previousKeyType = "operator"
            console.log("operator key")
        }

        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + "."
            } else if (previousKeyType === "operator") {
                display.textContent = "0."
            }

            calculator.dataset.previousKeyType = "decimal"

            console.log("decimal key")
        }

        if (action === "clear") {
            calculator.dataset.previousKeyType = "clear"
            console.log("clear key")
        }

        if (action === "calculate") {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)

            calculator.dataset.previousKeyType = "calculate"

            console.log("calculate key")
        }
    }
})
