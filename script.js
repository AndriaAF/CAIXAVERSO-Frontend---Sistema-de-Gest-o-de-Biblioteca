class Autor { 
    constructor(nome,nacionalidade,anoNascimento){ 
        this.nome=nome; 
        this.nacionalidade=nacionalidade; 
        this.anoNascimento=anoNascimento; 
    } 
}

class Livro { 
    constructor(titulo,autor,ano,genero){ 
        this.titulo=titulo; 
        this.autor=autor; 
        this.ano=ano; 
        this.genero=genero; 
        this.disponivel=true; 
    } 
}
class Usuario { 
    constructor(nome,matricula){ 
        this.nome=nome; 
        this.matricula=matricula; 
        this.livrosEmprestados=[]; 
    } 
}

class Biblioteca {
constructor(){ 
    this.autores=[]; 
    this.livros=[]; 
    this.usuarios=[]; 
}

cadastrarAutor(){
    const nome=document.getElementById("nomeAutor").value;
    const nac=document.getElementById("nacionalidade").value;
    const ano=document.getElementById("anoNascimento").value;
        if(!nome||!nac||!ano){
            alert("Preencha todos os campos");
            return;
    }
    this.autores.push(new Autor(nome,nac,ano));
    this.atualizarSelectAutores(); 
    this.mostrarAutores();
    document.getElementById("nomeAutor").value=""; 
    document.getElementById("nacionalidade").value=""; 
    document.getElementById("anoNascimento").value="";
}

cadastrarLivro(){
    const titulo=document.getElementById("tituloLivro").value;
    const autorIndex=document.getElementById("autorLivro").value;
    const ano=document.getElementById("anoLivro").value;
    const genero=document.getElementById("generoLivro").value;
        if(!titulo||autorIndex==""||!ano||!genero){
            alert("Preencha todos os campos");
            return;
    }
    const autor=this.autores[autorIndex].nome;
    this.livros.push(new Livro(titulo,autor,ano,genero));
    this.mostrarLivros(); 
    this.atualizarSelectLivros();
    document.getElementById("tituloLivro").value=""; 
    document.getElementById("anoLivro").value=""; 
    document.getElementById("generoLivro").value="";
}

cadastrarUsuario(){
    const nome=document.getElementById("nomeUsuario").value;
    const matricula=document.getElementById("matriculaUsuario").value;
        if(!nome||!matricula){
            alert("Preencha todos os campos");
            return;
    }
    this.usuarios.push(new Usuario(nome,matricula));
    this.mostrarUsuarios(); 
    this.atualizarSelectUsuarios(); 
    this.atualizarSelectUsuariosDevolucao();
    document.getElementById("nomeUsuario").value=""; 
    document.getElementById("matriculaUsuario").value="";
}

emprestarLivro(){
    const uI=document.getElementById("usuarioEmprestimo").value;
    const lI=document.getElementById("livroEmprestimo").value;
        if(uI==""||lI==""){
            alert("Selecione um usuário e o livro");
            return;
        }
        const livro=this.livros[lI];
            if(!livro.disponivel){
                alert("Livro indisponível");
                return;
            }
        livro.disponivel=false;
        this.usuarios[uI].livrosEmprestados.push(livro.titulo);
        this.mostrarLivros(); 
        this.mostrarUsuarios(); 
        this.atualizarSelectLivros(); 
        this.atualizarSelectLivrosDevolucao(uI);
}

devolverLivro(){
    const uI=document.getElementById("usuarioDevolucao").value;
    const livroTitulo=document.getElementById("livroDevolucao").value;
        if(uI==""||livroTitulo==""){
            alert("Selecione un usuário e o livro");
            return;
        }
    const usuario=this.usuarios[uI];
    const livro=this.livros.find(l=>l.titulo===livroTitulo);
        if(!livro) return;
    livro.disponivel=true;
    usuario.livrosEmprestados=usuario.livrosEmprestados.filter(t=>t!==livroTitulo);
    this.mostrarLivros(); this.mostrarUsuarios(); this.atualizarSelectLivros(); this.atualizarSelectLivrosDevolucao(uI);
}

    mostrarAutores(){ const div=document.getElementById("listaAutores"); div.innerHTML=""; this.autores.forEach((a,i)=>{div.innerHTML+=`<div class="card">${a.nome} - ${a.nacionalidade} - ${a.anoNascimento} <button onclick="biblioteca.excluirAutor(${i})">Excluir</button></div>`}); }
    mostrarLivros(){ const div=document.getElementById("listaLivros"); div.innerHTML=""; this.livros.forEach((l,i)=>{div.innerHTML+=`<div class="card">${l.titulo} - ${l.autor} - ${l.ano} - ${l.genero} - ${l.disponivel?"Disponível":"Emprestado"} <button onclick="biblioteca.excluirLivro(${i})">Excluir</button></div>`}); }
    mostrarUsuarios(){ const div=document.getElementById("listaUsuarios"); div.innerHTML=""; this.usuarios.forEach((u,i)=>{div.innerHTML+=`<div class="card">${u.nome} - ${u.matricula} <button onclick="biblioteca.excluirUsuario(${i})">Excluir</button></div>`}); }

    excluirAutor(i){ this.autores.splice(i,1); this.mostrarAutores(); this.atualizarSelectAutores(); }
    excluirLivro(i){ this.livros.splice(i,1); this.mostrarLivros(); this.atualizarSelectLivros(); }
    excluirUsuario(i){ this.usuarios.splice(i,1); this.mostrarUsuarios(); this.atualizarSelectUsuarios(); this.atualizarSelectUsuariosDevolucao(); }

    atualizarSelectAutores(){ 
        const sel=document.getElementById("autorLivro"); 
        sel.innerHTML='<option value="">Selecione Autor</option>'; 
        this.autores.forEach((a,i)=>sel.innerHTML+=`<option value="${i}">${a.nome}</option>`);
    }
    atualizarSelectUsuarios(){ 
        const sel=document.getElementById("usuarioEmprestimo"); 
        sel.innerHTML='<option value="">Selecione Usuário</option>'; 
        this.usuarios.forEach((u,i)=>sel.innerHTML+=`<option value="${i}">${u.nome}</option>`);
    }
    atualizarSelectUsuariosDevolucao(){ 
        const sel=document.getElementById("usuarioDevolucao"); 
        sel.innerHTML='<option value="">Selecione Usuário</option>'; 
        this.usuarios.forEach((u,i)=>sel.innerHTML+=`<option value="${i}">${u.nome}</option>`);
    }
    atualizarSelectLivros(){ 
        const sel=document.getElementById("livroEmprestimo"); 
        sel.innerHTML='<option value="">Selecione Livro</option>'; 
        this.livros.forEach((l,i)=>{
            if(l.disponivel) sel.innerHTML+=`<option value="${i}">${l.titulo}</option>`
        });
    }
    atualizarSelectLivrosDevolucao(userIndex){ 
        const sel=document.getElementById("livroDevolucao"); 
        sel.innerHTML='<option value="">Selecione Livro</option>'; 
            if(userIndex==="") return; 
            this.usuarios[userIndex].livrosEmprestados.forEach(t=>sel.innerHTML+=`<option value="${t}">${t}</option>`);
        }
}

const biblioteca = new Biblioteca();

