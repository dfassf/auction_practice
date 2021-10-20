const Sequelize = require('sequelize');
const moment = require('moment');

// 추후 상품id 추가할 것
module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({ 
            name:{
                type:Sequelize.STRING(50),
                allowfull:false,
            },
            price:{
                type:Sequelize.INTEGER(30),
                allowfull:false,
            },
            registeredAt:{
                type:Sequelize.DATE,
                allowfull:false,
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
            modelName:'Auction',
            tableName:'auction',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
