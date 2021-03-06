const Sequelize = require('sequelize')
const moment = require('moment')

// 추후 상품id 추가할 것
module.exports = class Items extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            price:{
                type:Sequelize.INTEGER(30),
                allowNull:false,
            },
            dueDate:{
                type:Sequelize.DATE,
                allowNull:true,
            },
            ifExtended:{ // 경매 연장 여부 옵션; 0=false 1=true
                type:Sequelize.INTEGER(1),
                allowNull: true,
            },
            registeredAt:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
                get: function(){
                    return moment(this.getDataValue('date')).format('Y-M-D')
                }
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Items',
            tableName:'items',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
}
