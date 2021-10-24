const socket = io('http://localhost:3000/')
socket.on('connection', () => { console.log('client') })
socket.on('trying',data=>{/*console.log(data)*/})



const nameInput = document.querySelector('.nameInput')
const txtInput = document.querySelector('.txtInput')
const btn = document.querySelector('.btn')
let timer = document.querySelector('.timer')
let shown = document.querySelector('.shown')
let oneLine = document.querySelector('.oneLine')
let printName = document.querySelector('.printName')
let printPrice = document.querySelector('.printPrice')

let m = 1
let s = 0

async function init(){

    let {data} = await axios.post('http://localhost:3000/maindata',{
        productId: 1
    }) //productId는 상태값에서 가져오면 된다?
    console.log(data)
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
            name: nameInput.value, price: txtInput.value, productId: 1
            // 테스트 버전에서 상품 ID는 1번으로만 진행되나, 실제로는 상품별로 ID값을 다르게 주어야 함
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
            } else if(test.data.success === false && test.data.reason == 'price'){
                alert('현재 입찰 가격보다 낮은 가격을 쓸 수 없습니다.')
            } else if(test.data.success === false && test.data.reason == 'expired'){
                alert('종료된 경매입니다.')
            }
        } else if(test.data.success === false){
            alert('가격은 숫자로 써 주세요.')
        }
    } else {
        alert('please fill the boxes')
    }
}

document.addEventListener('DOMContentLoaded',init)