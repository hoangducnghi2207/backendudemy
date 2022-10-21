require("dotenv").config()
import jwt from "jsonwebtoken"
import db from "../models/models"
const nonSecurePaths = ['/', '/login', '/register'];
const createJwt = (payload) => {
    let token = null
    try {
        token = jwt.sign(payload, process.env.JWT_SECRET);
        return token
    }
    catch (e) {
        console.log(e);
    }

}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key)
        data = decoded
    }
    catch (e) {
        console.log(23, e);
    }
    return data

}

const checkUserJwt = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies
    console.log(33,cookies);
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        let decoded = verifyToken(token)
        if (decoded) {
            req.user=decoded
            req.token=token
            next()
        }
        else {
            return res.status(401).json({
                message: 'not authenticated user',
                errorcode: 1,
                data: ''
            })
        }}
        else {
        return res.status(401).json({
            message: 'not authenticated user',
            errorcode: 1,
            data: ''
        })
    }
}
const checkUserPermission=(req,res,next)=>{
    if (nonSecurePaths.includes(req.path)||req.path==='/account') return next();
    if(req.user){
        let role=req.user.role.Roles
        let email=req.user.email
        let currentUrl=req.path
        let canAccess=role.some(item =>item.url=== currentUrl)
        console.log(63,canAccess);
        if(!role||role.length==0){
            return res.status(401).json({
                message: 'You do not have permission to access this resource',
                errorcode: 1,
                data: ''
            })
        }
        if(canAccess===true){
            next()
        }
        else{
            return res.status(401).json({
                message: 'You do not have permission to access this resource',
                errorcode: 1,
                data: ''
            })
        }
    }
    else{
        return res.status(401).json({
            message: 'not authenticated user',
            errorcode: 1,
            data: ''
        })
    }
}

module.exports = { createJwt, verifyToken, checkUserJwt,checkUserPermission }