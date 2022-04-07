const handler = (req,res) => {
    if(req.accepts("html")){
        res.render("pages/file.html")
    }else{
        res.send("Hello Vai...")
    }
    console.log(req.app.get("view engine"))
    res.send("Outside of world")
}

module.exports = handler