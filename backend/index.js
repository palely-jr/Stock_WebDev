const express = require("express")
const mysql = require("mysql")
const cors=require("cors")

const app = express();

app.use(express.json());
app.use(cors());

const db= mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"ifn666_users"
});

app.post("/savesymbol", (req,res)=>{
    const company_symbol=req.body.company_symbol;
    const company_name=req.body.company_name;


    console.log("came here");

    db.query(
        "INSERT INTO company (company_symbol,company_name) VALUES (?,?)",
        [company_symbol,company_name],
        (err, result) => {          
            if(err){
                console.log(err);
            }
    
            if(result){
                res.send({message:"Company added to wishlist"});
            }else{
    
                res.send({message: "Creation Failed"});
            }
        }


    );
})





app.post("/register", (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;
    db.query(
        "INSERT INTO users (username,password,name) VALUES (?,?,?)",
        [username,password,name],
        (err, result) => {          
            if(err){
                console.log(err);
            }
    
            if(result){
                res.send({message:"User Creation Successful"});
            }else{
    
                res.send({message: "Creation Failed"});
            }
        }


    );
})


app.post("/deleteCompany", (req,res)=>{
  const company_symbol=req.body.company_symbol;
    db.query(
        "DELETE from company where (company_symbol)=(?)",
        [company_symbol],
        (err, result) => {
           
            if(err){
            console.log(err);
        }

        if(result){
                res.send({message: "Company Deleted"});
            }
        else{

            res.send({message: "Filed to delete Company"});
        }


            }
            );
        }
    );














app.get("/companylist", (req,res)=>{
  

    db.query(
        "SELECT * from company",
        (err, result) => {
           
            if(err){
            console.log(err);
        }

        if(result){

            if(Object.keys(result).length == 0){
                res.send({message: "No Company Found"});
            }else{

                res.send(result);
            }

            
        }else{

            res.send({message: "No Company found"});
        }


            }
            );
        }
    );







app.post("/login", (req,res)=>{
  
    const username=req.body.username;
    const password=req.body.password;
        
    console.log("user name that came from the request is ",username);
    console.log("password that came from the request is ",password);



    db.query(
        "SELECT * from users WHERE username = ? AND password  =?",
        [username,password],
        (err, result) => {
            if(err){
            console.log(err);
        }

        if(result){


            console.log(Object.keys(result).length)

            if(Object.keys(result).length == 0){
                res.send({message: "Incorrect password/username"});

            }else{

                res.send(result);
            }


        }else{


            res.send({message: "Incorrect password/username"});
        }

            }
            );
        }
    );


app.listen(3001,()=>{
    console.log("running server");
});