const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.post('/',(req,res)=>{
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;

    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }]
    };

    const JsonData=JSON.stringify(data);
    const url="https://us9.api.mailchimp.com/3.0/lists/e728fadc33";
    const options={
        method:"POST",
        auth:"azhar:316d3d0f44c5dcb0fabdc22b81375a6d-us9"
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    // console.log(request);
    request.write(JsonData);
    request.end();
    // res.send('Form submitted successfully');
})

app.post("/failure",(req,res)=>{
    res.redirect('/');
})


app.listen(3000,()=>{
    console.log('server is running on port :3000');
});

// APIKEY
// 316d3d0f44c5dcb0fabdc22b81375a6d-us9
// audienceID
//  e728fadc33.