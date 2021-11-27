const sqlite3 = require("sqlite3");
const bd = new sqlite3.Database("./PlusNotes.bd");

bd.serialize(function(){
    // // Criar Tabela
    // bd.run(` 
    //     CREATE TABLE IF NOT EXISTS tb_user(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nome_user TEXT,
    //         email_user TEXT,
    //         telefone_user TEXT,
    //         senha_user TEXT);
    // `);

    // // Criar Tabela
    // bd.run(` 
    //     CREATE TABLE IF NOT EXISTS tb_posts(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         nome_user TEXT,
    //         post TEXT);
    // `);
    
    // //Inserir Dados
    // const query = `
    // INSERT INTO tb_user(
    //     nome_user,
    //     email_user,
    //     telefone_user,
    //     senha_user
    // ) VALUES (?,?,?,?)` ;
    // const values = ["Rafael", "rafael@gmail.com", "953130404", "rafael123"];
    // bd.run(query, values, function(err){
    //     if(err) return console.log(err);        
    //     console.log("Dado armazenado com sucesso!");
    // });

    //Cosultar Dados
    bd.all("SELECT * FROM tb_user", function(err, rows){
        if(err) return console.log(err)
        console.log(rows)
    })

    //Cosultar Dados
    bd.all("SELECT * FROM tb_posts", function(err, rows){
        if(err) return console.log(err)
        console.log(rows)
    })
    
    // //Deletar Dados
    // bd.run("DELETE FROM projetos WHERE id=?", [8], function(err){
    //     if(err) return console.log(err);
    //     console.log("Deletei", this)
    // })

    // //O Famoso CRUD
})

module.exports = bd;