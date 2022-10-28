const express = require('express')
const { 
    userCreateCtrl,
    pagination,
    allUsersCtrl,
    deleteUsersCtrl,
    updateUserCtrl
 } = require('../controller/userCtrl')

const authRouts = express.Router()

authRouts.post("/add",userCreateCtrl)
authRouts.get("/", allUsersCtrl)
authRouts.get("/pagination", pagination)
authRouts.put("/update/:id", updateUserCtrl)
authRouts.delete("/delete/:id", deleteUsersCtrl)

module.exports = authRouts