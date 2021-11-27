const express = require("express");
const server = express();

const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true
});

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true}));

const bd = require("./bd")
var dados_user;

server.get("/", function(req, res){
    return res.render("login.html");
});


server.post("/logar", function(req, res){
    const query = `
    SELECT * FROM tb_user WHERE email_user = ? and senha_user = ?` ;
    const values = [req.body.email_user, req.body.senha_user];
    bd.get(query, values, function(err, result){
        if(err) return console.log(err);
        if (result){
            dados_user = [result.id, result.nome_user, result.email_user, result.telefone_user, result.senha_user];
            console.log("Autenticado com Sucesso!")
            return res.redirect("index")
        }else{
            console.log("Erro ao Autenticar!")
            return res.send("<script>alert('Autenticação Invalida!'); location='http://localhost:3030/'; </script>")

        }        
        
    });
    // return res.redirect("/index");

});

server.get("/register", function(req, res){
    return res.render("cadastro.html");
});

server.post("/registrar", function(req, res){
    const query = `
    INSERT INTO tb_user(
        nome_user,
        email_user,
        telefone_user,
        senha_user
    ) VALUES (?,?,?,?)` ;
    const values = [req.body.nome_user, req.body.email_user, req.body.telefone_user, req.body.senha_user];
    dados_user = values;
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Dado armazenado com sucesso!");
    });
    return res.redirect("/");

});

server.get("/index", function(req, res){
    bd.all("SELECT * FROM tb_user WHERE id = ?",dados_user[0], function(err, rows){
        if(err) return console.log(err)
        bd.all("SELECT * FROM tb_posts", function(err, rows1){
            if(err) return console.log(err)
            let postsRevert = [...rows1].reverse();
            bd.all("SELECT * FROM tb_user", function(err, rows2){
                if(err) return console.log(err)
                console.log(rows)
                console.log(postsRevert)
                return res.render("index.html", { rows , postsRevert , rows2 });
            })
        })
    })
});

server.post("/postar", function(req, res){
    const query = `
    INSERT INTO tb_posts(
        nome_user,
        post
    ) VALUES (?,?)` ;
    const values = [dados_user[1], req.body.post];
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Texto Postado com sucesso!");
    });
    return res.redirect("/index");
});

server.listen(3030);
