<template>
    <div class="calculator">
        <div class="display">
            <input type="text" disabled=true v-model="expression" @input="onInput" class="input"/>
        </div>
        <div class="buttons">
            <button @click="clear">C</button>
            <button @click="appendNumber(7)">7</button>
            <button @click="appendNumber(8)">8</button>
            <button @click="appendNumber(9)">9</button>
            <button @click="appendOperator('+')">+</button>
            <button @click="appendNumber(4)">4</button>
            <button @click="appendNumber(5)">5</button>
            <button @click="appendNumber(6)">6</button>
            <button @click="appendOperator('-')">-</button>
            <button @click="appendNumber(1)">1</button>
            <button @click="appendNumber(2)">2</button>
            <button @click="appendNumber(3)">3</button>
            <button @click="appendOperator('*')">*</button>
            <button @click="appendNumber(0)">0</button>
            <button @click="appendDecimal('.')">.</button>
            <button @click="calculateResult">=</button>
            <button @click="appendOperator('/')">/</button>
            <button @click="calculatePower(2)">x²</button>
            <button @click="calculatePower(3)">x³</button>
            <button @click="calculateSquareRoot">√x</button>
            <button @click="calculateSin">sin</button>
            <button @click="calculateCos">cos</button>
            <button @click="calculateTan">tan</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
const expression = ref()
const appendNumber = (number) => {
    expression.value += String(number);
}

const onInput=()=> {
    // Ensure that only valid characters are entered (digits, operators, and decimal point)
    expression.value = expression.value.replace(/[^0-9+\-*/.]/g, "");
}
const clear=()=>{
    expression.value = ''
}

const appendDecimal=()=> {
    // Ensure that a decimal point is not added consecutively
    const lastChar = expression.value.slice(-1);
    if (lastChar !== "." && !expression.value.includes(".")) {
        expression.value += ".";
    }}


const appendOperator=(operator)=> {
    // Ensure that an operator is not added consecutively
    const lastChar = expression.value.slice(-1);
    if (lastChar !== operator) {
        expression.value += operator;
    }
}
const calculateResult=()=> {
    try {
        expression.value = eval(expression.value).toString();
    } catch (error) {
      expression.value = "Error";
    }
}
const calculatePower = (power) => {
    expression.value = Math.pow(parseFloat(expression.value), power).toString();
}

const calculateSquareRoot = () => {
    expression.value = Math.sqrt(parseFloat(expression.value)).toString();
}

const calculateSin = () => {
    expression.value = Math.sin(parseFloat(expression.value)).toString();
}

const calculateCos = () => {
    expression.value = Math.cos(parseFloat(expression.value)).toString();
}

const calculateTan = () => {
    expression.value = Math.tan(parseFloat(expression.value)).toString();
}
</script>

<style scoped>
.calculator {
    width: 300px;
    margin: 0 auto;
    font-size: 20px;
}

.display {
    text-align: right;
    width: 290px;
}

input {
    width: 100%;
    font-size: 35px;
    height: 40px;
    margin-bottom: 15px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
}

button {
    border-radius: 10px;
    border: 2px solid rgb(224, 230, 234);
    font-size: 24px;
    padding: 10px;
    background-color: #ffffff;
    color: black;
    cursor: pointer;
}

button:hover {
    background-color: #f6f9fc;
}
</style>
