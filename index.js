const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");




const app=express();


app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));







app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
   fname= req.body.fName;
   lname=req.body.lName;
   email=req.body.email;
   var data={
     members:[
       {
        email_address:email,
        status:"subscribed",
        MergeField:{
          FNAME:fname,
          LNAME:lname
        }
       }
     ]
   }
   const Json_data=JSON.stringify(data);
   const options={
     method:"POST",
     auth:"parsa:4329906eb91481b55179e559f19cb1f7-us14"
   }
   const url="https://us14.api.mailchimp.com/3.0/lists/3e4969f66c"
   const request = https.request(url,options,function(response){

    if(response.statusCode===200){
      res.send("done!")
    }else{
      res.send("fuck!");
    }
     response.on("data",function(data){
       console.log(JSON.parse(data));
     });
   });
   request.write(Json_data);
   request.end();

});
app.listen(process.env.PORT||3000,function(req,res){
    console.log("server!!")
});

