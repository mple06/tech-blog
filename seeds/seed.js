const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models")

const seed = async () => {
    const userData = await User.bulkCreate([
        {
            username: "MV",
            password: "password",
            email: "mv@mv.mv"
        },
        {
            username: "randy",
            password: "password",
            email: "randy@randy.randy"
        },
        {
            username: "tim",
            password: "password",
            email: "tim@tim.tim"
        }
    ], {
        individualHooks: true
    })
    const blogData = await Blog.bulkCreate([
        {
            title: "MV's post",
            body: "I like coding",
            UserId: 1
        },
        {
            title: "Randy's post",
            body: "I hate coding",
            UserId: 2
        },
        {
            title: "Tim's post",
            body: "I'm indifferent",
            UserId: 3
        }
    ])
    const commentData = await Comment.bulkCreate([
        {
            body: "Ok",
            username: "MV",
            UserId: 1,
            BlogId: 2
        },
        {
            body: "I'm hungry",
            username: "Randy",
            UserId: 2,
            BlogId: 3
        },
        {
            body: "Like my comment",
            username: "Tim",
            UserId: 3,
            BlogId: 1
        },
    ])
}

sequelize.sync({ force: true }).then(() => {
    seed();
})