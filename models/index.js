
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog);

User.hasMany(Comment);

Blog.belongsTo(User);

Blog.hasMany(Comment);

Comment.belongsTo(Blog);

Comment.belongsTo(User);


module.exports = { User, Blog, Comment };