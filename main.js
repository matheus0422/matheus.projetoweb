let produtos = [];

function adicionarProduto() {
   const nome = document.getElementById('Pdt').value;
   const quantidade = parseInt(document.getElementById('Qtd').value);
   const valor = parseFloat(document.getElementById('Vlr').value);
   const categoria = document.getElementById('categoriaProduto').value;

   if (nome && !isNaN(quantidade) && !isNaN(valor) && categoria !== "Informe a categoria.") {
       produtos.push({ nome, quantidade, valor, categoria });
       mostrarProdutos();
   } else {
       alert("Por favor, preencha todos os campos corretamente.");
   }
   console.log("Produto adicionado:", { nome, quantidade, valor, categoria });
}

function mostrarProdutos(filtroTexto = '') {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    const produtosFiltrados = produtos.filter(produto => produto.nome.toLowerCase().includes(filtroTexto.toLowerCase()));

    const produtosPorCategoria = produtosFiltrados.reduce((acc, produto) => {
        acc[produto.categoria] = acc[produto.categoria] || [];
        acc[produto.categoria].push(produto);
        return acc;
    }, {});

    Object.keys(produtosPorCategoria).forEach(categoria => {
        const divCategoria = document.createElement('div');
        divCategoria.innerHTML = `<h3>${categoria}</h3>`;
        listaProdutos.appendChild(divCategoria);

        produtosPorCategoria[categoria].forEach((produto, index) => {
            const divProduto = document.createElement('div');
            divProduto.className = 'alert alert-info d-flex justify-content-between align-items-center';
            divProduto.innerHTML = `
                <div>
                    Produto: ${produto.nome},
                    Quantidade: ${produto.quantidade},
                    Valor: R$ ${produto.valor.toFixed(2)},
                    Preço total: R$ ${(produto.valor * produto.quantidade).toFixed(2)}
                </div>
                <div>
                    <button onclick="abrirModalEdicao(${index})" class="btn btn-primary btn-sm">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button onclick="excluirProduto(${index})" class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            listaProdutos.appendChild(divProduto);
        });
    });
}

function abrirModalEdicao(index) {
   const produto = produtos[index];
   document.getElementById('editPdt').value = produto.nome;
   document.getElementById('editQtd').value = produto.quantidade;
   document.getElementById('editVlr').value = produto.valor;
   document.getElementById('editCategoria').value = produto.categoria;
   $('#modalEdicao').modal('show');
   $('#modalEdicao').data('index', index);
}

function salvarEdicao() {
   const index = $('#modalEdicao').data('index');
   const nome = document.getElementById('editPdt').value;
   const quantidade = parseInt(document.getElementById('editQtd').value);
   const valor = parseFloat(document.getElementById('editVlr').value);
   const categoria = document.getElementById('editCategoria').value;

   if (nome && !isNaN(quantidade) && !isNaN(valor) && categoria !== "Informe a categoria.") {
       produtos[index] = { nome, quantidade, valor, categoria };
       $('#modalEdicao').modal('hide');
       mostrarProdutos();
   } else {
       alert("Por favor, preencha todos os campos corretamente.");
   }
}

function excluirProduto(index) {
   if (confirm("Tem certeza que deseja excluir este produto?")) {
       produtos.splice(index, 1);
       mostrarProdutos();
   }
}

mostrarProdutos();



  
  
  
  
  
  
  
  






