<template>
    <div class="calculator">
        <el-dialog
                v-model="rateVisible"
                title="利率计算"
                width="95%"
        >
            <div style="display:flex;">
                <div>
                    <div>
                        <div style="margin: 10px;">存款利率</div>
                        <table>
                            <tr v-for="(item, index) in saveRates" :key="index">
                                <td>{{ item.duration }}</td>
                                <td style="cursor:pointer;">
                                    <el-input v-if="updateOne" style="width: 50px;height: 25px;font-size: 15px;"
                                              v-model="item.rate"/>
                                    <div v-else style="width: 50px;height: 25px;font-size: 15px;"> {{
                                        item.rate
                                        }}%
                                    </div>
                                </td>

                            </tr>
                        </table>
                    </div>
                    <el-button v-if="!updateOne" style="margin-top: 10px;width: 50px;height: 25px;font-size: 15px;"
                               @click="updateOne=!updateOne">修改
                    </el-button>
                    <el-button v-if="updateOne" style="margin-top: 10px;width: 50px;height: 25px;font-size: 15px;"
                               @click="uploadSave">上传
                    </el-button>
                </div>

                <div style="margin-left: 20px;">
                    <div>
                        <div style="margin: 10px;">贷款利率</div>
                        <table>
                            <tr v-for="(item, index) in borrowRates" :key="index">
                                <td>{{ item.duration }}</td>
                                <td style="cursor:pointer;">
                                    <el-input v-if="updateTwo" style="width: 50px;height: 25px;font-size: 15px;"
                                              v-model="item.rate"/>
                                    <div v-else style="width: 50px;height: 25px;font-size: 15px;"> {{
                                        item.rate
                                        }}%
                                    </div>
                                </td>

                            </tr>
                        </table>
                    </div>
                    <el-button v-if="!updateTwo" style="margin-top: 10px;width: 50px;height: 25px;font-size: 15px;"
                               @click="updateTwo=!updateTwo">修改
                    </el-button>
                    <el-button v-if="updateTwo" style="margin-top: 10px;width: 50px;height: 25px;font-size: 15px;"
                               @click="uploadBorrow">上传
                    </el-button>
                </div>
                <div style="display: flex;flex-direction: column;">
                    <div style="margin-left: 20px;">
                        <div style="margin: 10px;">
                            存款时间（单位/年）
                        </div>
                        <el-input v-model="saveNum"></el-input>
                        <div style="margin: 10px;">
                            存款本金
                        </div>
                        <el-input v-model="savePrincipal"></el-input>
                        <div style="display: flex; align-items: center; margin-top: 10px;">
                            <el-button @click="handleSaveResult" style="width: 80px; height: 20px; font-size: 15px;">
                                计算总额
                            </el-button>
                            <span style="margin-left: 20px;">{{ saveResult }}元</span>
                        </div>
                    </div>
                    <div style="margin-left: 20px;margin-top: 10px;">
                        <div style="margin: 10px;">
                            借款时间（单位/年）
                        </div>
                        <el-input v-model="borrowNum"></el-input>
                        <div style="margin: 10px;">
                            借款金额
                        </div>
                        <el-input v-model="borrowPrincipal"></el-input>
                        <div style="display: flex; align-items: center; margin-top: 10px;">
                            <el-button @click="handleBorrowResult" style="width: 80px; height: 20px; font-size: 15px;">
                                计算总额
                            </el-button>
                            <span style="margin-left: 20px;">{{ borrowResult }}元</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
                v-model="dialogVisible"
                title="历史记录"
                width="95%"
        >
            <el-table :data="historyData" style="width: 100%;min-height: 120px;overflow-y: scroll;max-height:450px;">
                <el-table-column prop="data" label="计算式" width="140"/>
                <el-table-column prop="result" label="结果" width="120"/>
                <el-table-column prop="time" label="时间"/>
            </el-table>
            <a @click="handleClearHistory" style="margin-top: 30px;cursor: pointer;">清空</a>
        </el-dialog>
        <div class="head">
            <button class="h-button" @click="openHistory">查看历史</button>
            <button class="h-button" @click="handleInterestRate">利率计算</button>
        </div>
        <div class="display">
            <input type="text" disabled=true v-model="expression" @input="onInput" class="input"/>
        </div>
        <div class="buttons">
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
            <button @click="clear" class="small">C</button>
            <button @click="back" class="small">&lt-</button>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'
import {
    clearHistory,
    getBorrowResult,
    getRateBorrow,
    getRateSave,
    getSaveResult,
    list,
    updateRate,
    upload
} from "../request/api";

const borrowNum = ref()
const borrowPrincipal = ref()
const saveNum = ref()
const savePrincipal = ref()
const saveResult = ref(0.00)
const borrowResult = ref(0.00)
const saveRates = ref([]);
const borrowRates = ref([]);
const updateOne = ref(false)
const updateTwo = ref(false)
const rateVisible = ref(false)
const dialogVisible = ref(false)
const expression = ref("")
const historyData = ref([{}])
const handleInterestRate = () => {
    rateVisible.value = true;
}
onMounted(() => {
    getRateBorrow().then(res => {
        borrowRates.value = res.data
    })
    getRateSave().then(res => {
        saveRates.value = res.data
    })
})
const openHistory = () => {
    dialogVisible.value = true;
    list().then((res) => {
        historyData.value = res.data
    })
}
const  handleSaveResult = ()=>{
    getSaveResult(saveNum.value,savePrincipal.value).then(res=>{
        saveResult.value = res.data
    })
}
const  handleBorrowResult = ()=>{
    getBorrowResult(borrowNum.value,borrowPrincipal.value).then(res=>{
        borrowResult.value = res.data
    })
}
const uploadSave = () => {
    updateOne.value = !updateOne.value
    updateRate(saveRates.value).then(res => {
    })
    ElMessage.success("修改利率成功！")
}
const uploadBorrow = () => {
    updateTwo.value = !updateTwo.value
    updateRate(borrowRates.value).then(res => {
    })
    ElMessage.success("修改利率成功！")
}
const appendNumber = (number) => {
    expression.value += String(number);
}

const onInput = () => {
    // Ensure that only valid characters are entered (digits, operators, and decimal point)
    expression.value = expression.value.replace(/[^0-9+\-*/.]/g, "");
}
const clear = () => {
    expression.value = ''
}
const back = () => {
    expression.value = expression.value.slice(0, -1)

}
const handleClearHistory = () => {
    clearHistory().then(res => {
    });
    list().then((res) => {
        historyData.value = res.data
    });
    ElMessage.success("清空成功");
}
const appendDecimal = () => {
    // Ensure that a decimal point is not added consecutively
    const lastChar = expression.value.slice(-1);
    if (lastChar !== "." && !expression.value.includes(".")) {
        expression.value += ".";
    }
}


const appendOperator = (operator) => {
    // Ensure that an operator is not added consecutively
    const lastChar = expression.value.slice(-1);
    if (lastChar !== operator) {
        expression.value += operator;
    }
}

const last = ref("")
const calculateResult = () => {
    try {
        last.value = expression.value
        expression.value = eval(expression.value).toString();
        if (expression.value == "Infinity") {
            expression.value = "0不能做除数";
        }
    } catch (error) {
        expression.value = "算式有误";
    }
    upload({
        data: last.value,
        result: expression.value
    })

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

.h-button {
    margin-bottom: 20px;
}

table {
    border-collapse: collapse; /* 合并边框 */
    text-align: center; /* 文字居中 */
}

th, td {
    border: 1px solid black; /* 加上边框 */
    padding: 8px; /* 设置内边距 */
}

th {
    background-color: #ddd; /* 设置表头背景颜色 */
}

tr:nth-child(odd) {
    background-color: #f2f2f2; /* 设置奇数行背景颜色 */
}

button:hover {
    background-color: #f6f9fc;
}

.h-button {
    font-size: 15px;
    margin: 20px;
    margin-top: 0;
}


</style>
