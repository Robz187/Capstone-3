import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const data = 
{
    admin:false,
    posts:["11Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    ,"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",],
    postIndex:null,
    postContent:null,
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{

    res.render("index.ejs")

})

app.post("/login",(req,res)=>{
   
   if(req.body.uName === "Admin" && req.body.psw === "admin")
   {
    data.admin=true;
    console.log("Admin password correct")
    res.render("blog.ejs",data)
   }
   else
   {    
    data.admin=false;
    console.log("Admin data incorrect");
    res.render("blog.ejs",data);
    }
})
app.get("/login",(req,res)=>
{
    if(data.admin === true)
    {
        res.render("blog.ejs" ,data);
    }
    else
    {
        res.redirect("/guest");
    }
})

app.get("/guest",(req,res)=>{
    data.admin =false;
    res.render("blog.ejs",data)

})


app.post("/new-post",(req,res)=>{
        const newPost=req.body.newpost;
        data.posts.push(newPost);
        data.admin=true;
        res.redirect("/login",);

})
app.post("/delete",(req,res)=>{
    const whichPost = req.body.innertext;
    data.posts.pop(whichPost);
    res.redirect("/login");
})
app.get("/edit",(req,res)=>{
  data.postIndex = req.query.postindex;
  data.postContent = req.query.postcontent;
    console.log(data.postIndex+data.postContent)
    res.render("edit.ejs",{data})
})

app.post("/update",(req,res)=>{
 const update = req.body.editpost;
 data.admin=true;
 data.posts[data.postIndex]=update;   
 res.render("blog.ejs",data)
})

app.listen(port,()=>{

console.log("Server is running...");

})