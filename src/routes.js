const { Router } = require('express')
const User = require('./app/models/User')

const routes = new Router()

routes.get('/',async (req,res) => {
    const user = await User.create({
        name: "Raphael Mota",
        email: "rphmota@gmail.com",
        password_hash: "010203",
        access_level: 'A',
        cpf: '02233372344',
        phone: '85981091897'
    })
    return res.json(user)
})
 
module.exports = routes