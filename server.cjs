const express = require ('express')
const app = express('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const {ObjectId} =require('mongodb')
const{connectToDb,getDb} = require('./dbConnection.cjs')

connectToDb(function(error){
    if(error){
        console.log("cant establish")
    }else{
        const port = process.env.PORT || 8000
        app.listen(8000)
        db=getDb()
        console.log("listening")
    }
})
//login 
app.post('/add-datas',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    // const signUp = async (req,res)=>
    db.collection('signup').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(200).json({
                'status':'user logged'
            })
          }  else{
            response.status(500).json({
                'status':'Invalid user'
            })
          }
    })
    
})
//signup
app.post('/add-data',function(request,response){
    var email = request.body.email;
    var password = request.body.password;
    db.collection('signup').findOne({email}).then((result) => {
        console.log(result)
        if(result){
            response.status(500).json({
                'status':'You already registered'
            })
        } else {
            db.collection('signup').insertOne(request.body).then(function(){
                response.status(201).json({
                    'status':'data added'

                    
                })
            }).catch(function(){
                response.status(500).json({
                    'status':'data is not added'
                })
            }) 
           
        } 
    })
})
 
app.get('/get-data',function(request,response) {
    const datas = [] 
    db.collection('signup')

    .find() 
    .forEach(entry => datas.push(entry)).then(function(){
        response.status(200).json(datas)
    }).catch(function(){ 
        response.status(500).json({
            "status" : "entry is not added"
        })
    })
 } )
 // jobs-listing
app.post('/add-jobs',function(request,response){ 
    db.collection('jobs').insertOne(request.body).then(function(){// insert entry in body
        response.status(201).json({
            'status':'job added'
        })
    }).catch(function(){
        response.status(500).json({
            'status':'entry is not added'
        })
    }) 
})
app.get('/get-jobs',function(request,response) {
    const datas = [] 
    db.collection('jobs')
    .find() 
    .forEach(entry => datas.push(entry)).then(function(){
        response.status(200).json(datas)
    }).catch(function(){ 
        response.status(500).json({
            "status" : "jobs are not added"
        })
    })
 } )

 app.patch('/update-jobs/:id',function(request,response){
    if(ObjectId.isValid(request.params.id)){db.collection('jobs').updateOne(
        { _id : new ObjectId(request.params.id)},//frst parametr => identifier:select which one is to update
        { $set : request.body} // the data to be set or updated
    ).then(function(){
        response.status(200).json({
            "status" : "updated"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "sorry"
        })
    })
}else{
    response.status(500).json({
        "status" : "object is not valid"
    })
}
    
 })
 app.delete('/del-jobs',function(request,response){
    if(ObjectId.isValid(request.query.id)){
        // console.log(request.query) // to console the query from postman
        db.collection('jobs').deleteOne({
            _id: new ObjectId(request.query.id) 
        }).then(function(){
            response.status(200).json({
                "status" : "job is deleted"
            })
        }).catch(function(){
            response.status(500).json({
                "status" : "job is not deleted"
            })
        })
    }else{
        response.status(500).json({
            "status" : "entry is not valid"
        })
    }
   
 })
// filtering

 app.post('/add-filters',function(request,response){ 
    db.collection('jonportal').insertOne(request.body).then(function(){// insert entry in body
        response.status(201).json({
            'status':'job added'
        })
    }).catch(function(){
        response.status(500).json({
            'status':'entry is not added'
        })
    }) 
})