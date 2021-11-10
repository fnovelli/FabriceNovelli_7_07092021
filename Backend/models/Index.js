const Comments = require('../Models/Comments')
const Users = require('../Models/User')
const Posts = require('../Models/Posts')

Posts.belongsTo(Users, {foreignKey: 'userId', as: 'user', });

Comments.belongsTo(Users, {foreignKey: 'userId', as: 'user', });
Comments.belongsTo(Posts, {foreignKey: 'msgId', as: 'post', });

Users.hasMany(Posts, {as: 'posts', foreignKey: 'userId'})
Users.hasMany(Comments, {as: 'comments', foreignKey: 'userId'})