const { Sequelize, Model } = require('sequelize');
const axios = require('axios')
const { db } = require('../../core/db');
const {wx} = require('../../config/config')
const {AuthFailed} = require('../../core/http-exception')

class Comment extends Model{
  //添加评论
  static async addComment(aid,uid,comment){
    let nowDate = new Date().toLocaleString();
    const row = await Comment.create({
      aid:aid,
      uid:uid,
      commentContent:comment,
      createTime:nowDate
    })
    console.log(row.toJSON())
    return row
  }
  //获取评论列表
  static async getComment(aid){
    const Comments = await Comment.findAll({
      where:{
        aid:aid
      }
    })
    return Comments
  }
}

Comment.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uid:Sequelize.INTEGER,
  aid:Sequelize.INTEGER,
  commentContent:Sequelize.STRING,
  createTime:Sequelize.DATE
}, { sequelize: db, tableName: 'comment', updatedAt: false, createdAt: false })

module.exports = Comment