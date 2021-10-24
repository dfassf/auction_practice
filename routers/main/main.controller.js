const { sequelize, Auction, Items } = require('../../models/index')
const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')

const server = http.createServer(app)
const io = socket(server)

let insert = (req, res) => {
    console.log('main')
    res.render('insert.html')
}

let insertData = async (req, res) => {
    console.log(req.body)
    const {price, time} = req.body
    await Items.create({price, dueDate:time})
    res.send({success: true})
}

let main = (req, res) => {
    // 애매한데, 쿼리문을 통해서 상태값 저장을 시키면 mainData에서 끌어올 수 있을 것 같다
    console.log('main')
    res.render('index.html')

}

let mainData = async (req, res) => {
    let {productId} = req.body
    console.log(productId)

    let bidList = await Auction.findAll({
        where:{
            productId
        }
    })
    res.send(bidList)
}

let auction = async (req, res) => {
    const {name, price, productId} = req.body
    console.log(req.body)
    // 테스트 버전에서 상품 ID는 1번으로만 진행되나, 실제로는 상품별로 ID값을 다르게 주어야 함
    let result = await Auction.findAll({
        where:{
            productId
        }
    })
    let getDue = await Items.findOne({
        where:{
            id: productId
        }
    })
    let dueTime = getDue.dataValues.dueDate.toLocaleString()
    let lastPrice
    result.length == 0 ? lastPrice = 0 : lastPrice = result[result.length-1].dataValues.price
    function timeCalc(time){
        let now = new Date().toTimeString()
        return (now<time)
        // true면 만료 안됨, false면 만료됨
    }
    console.log(timeCalc(dueTime))
    if(timeCalc(dueTime) === false){
        if(price>lastPrice){
            await Auction.create({
                name,
                price,
                productId
            })
            let asd = await sequelize.query(`UPDATE items SET 
            dueDate = items.dueDate + INTERVAL 5 MINUTE 
            WHERE id=${getDue.dataValues.id};
            `)
            // console.log(asd)
            // console.log('5분 연장됨')
            res.send({success: true})
        } else{
            res.send({success: false, reason: 'price'})
        }
    } else{
        console.log('경매 종료')
        res.send({success: false, reason: 'expired'})
    }

}

module.exports = {insert, insertData, main, mainData, auction}
