const nameInput = document.querySelector('.nameInput')
const txtInput = document.querySelector('.txtInput')
const btn = document.querySelector('.btn')
let timer = document.querySelector('.timer')
let shown = document.querySelector('.shown')
let oneLine = document.querySelector('.oneLine')
let printName = document.querySelector('.printName')
let printPrice = document.querySelector('.printPrice')
let trigga = false
let priceArr = 0

let m = 1
let s = 0

async function init(){
    trigga = true
    countDown()
    let {data} = await axios.post('http://localhost:3000/mainData')
    for(let i = 0; i<data.length; i++){
        let nameDiv = document.createElement('div')
        let priceDiv = document.createElement('div')
        let frame = document.createElement('div')
        nameDiv.className = 'printName'
        priceDiv.className = 'printPrice'
        frame.className = 'oneLine'
        nameDiv.innerHTML = data[i].name
        priceDiv.innerHTML = data[i].price
        frame.appendChild(nameDiv)
        frame.appendChild(priceDiv)
        oneLine.appendChild(frame)
    }
    btn.addEventListener('click',submitValue)

}

async function submitValue(){
    if(nameInput.value.length !== 0 && txtInput.value.length !== 0){
        if(isNaN(txtInput.value) === false){
            let test = await axios.post('http://localhost:3000/auction',{
            name: nameInput.value, price: txtInput.value
            })
            if(test.data.success === true){
                let nameDiv = document.createElement('div')
                let priceDiv = document.createElement('div')
                let frame = document.createElement('div')
                nameDiv.className = 'printName'
                priceDiv.className = 'printPrice'
                frame.className = 'oneLine'
                nameDiv.innerHTML = nameInput.value
                priceDiv.innerHTML = txtInput.value
                frame.appendChild(nameDiv)
                frame.appendChild(priceDiv)
                oneLine.appendChild(frame)
                trigga = false
                m = 1
                s = 0
                countDown()
            } else{
                alert('you must put a price higher than the current price')
            }
        } else if(test.data.success === false){
            alert('price must be number')
        }
    } else {
        alert('please fill the boxes')
    }
}

function countDown(){

    setInterval(() => {
        if(s === 0 && m>=0){
            if(s===0 && m=== 0){
                trigga = false
                console.log('asd')
                return
            }
            s = 60
            s--
            m--
            timer.innerHTML = `${m}:${s}`
        } else if(s !==0 && m>=0){ 
            s-- 
            if(s<10){
                timer.innerHTML = `${m}:0${s}`
            } else{
                timer.innerHTML = `${m}:${s}`
            }
        }
    }, 1000) 
    if(s == 0 && m == 0){console.log('a');return}

}

async function triggered(){
    trigga = false
    alert('auction ended')
    let {data} = await axios.post('http://localhost:3000/ended')
    console.log(data)
}


document.addEventListener('DOMContentLoaded',init)