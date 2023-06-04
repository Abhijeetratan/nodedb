//import modules
const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//import token
let token=require('../token/token')
//create rest api

router.post("/nodedb",(req,res)=>{
    let u_name=req.body.u_name
    let u_pwd=req.body.u_pwd
    //compare with database

mcl.connect(url,(err,conn)=>{
    if(err)
        console.log('Error in connection:- ',err)
    else{
        let db = conn.db("nodedb")
        db.collection('login').find(`{u_name:'${u_name}'&& u_pwd:'${u_pwd}'}`).toArray((err, array)=>{
            if(array.length>0){
                let myToken = token({u_name,u_pwd},JSON.stringify(new Date()))
                res.json({'auth' : 'success',token:myToken})
                conn.close()
            }
            else
       res.json({'auth' : 'failed'})
        })
    }
})
})
module.exports=router
