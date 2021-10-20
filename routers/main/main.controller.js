const { sequelize, Auction } = require('../../models/index');

let main = (req, res) => {
    console.log('main')
    res.render('index.html')
}

let mainData = async (req, res) => {
    let result = await Auction.findAll()
    res.send(result)
}

let auction = async (req, res) => {
    const {name, price} = req.body

    let result = await Auction.findAll()
    let lastPrice
    result.length == 0 ? lastPrice = 0 : lastPrice = result[result.length-1].dataValues.price
    if(price>lastPrice){
        await Auction.create({
            name,
            price
        })
        res.send({success: true})
    } else{
        res.send({success: false})
    }

}

let ended = async (req, res) => {
    let result = await Auction.findAll()
    let lastPrice
    result.length == 0 ? lastPrice = 0 : lastPrice = result[result.length-1].dataValues.price
    res.send({lastPrice})
}



module.exports = {main, mainData, auction, ended}
