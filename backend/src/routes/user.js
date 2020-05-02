const express = require('express');
const controller = require('../controllers/userController')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const authorization = req.headers['authorization']

    if(!authorization) return res.status(401).json({error: 'You need login'})

    if(!/^Bearer$/i.test(authorization.split(' ')[0])) return res.status(400).json('invalid token')

    jwt.verify(authorization.split(' ')[1], process.env.API_KEY_SECRET,(err,data)=>{
        if (err) res.status(401).send({error: err.message})

        next()
    })
}

const router = express.Router()

router.get('/',controller.index)

router.get('/:id', authentication ,controller.show)

router.post('/' ,controller.store)

router.put('/', authentication ,controller.update)

router.delete('/', authentication ,controller.destroy)

module.exports =  router