<h1 align="center">Products_Crowler</h1>

Este software funciona de maneiras simples e em pequena escala. Esta aplicação apenas tem como intuito estudos práticos de programação. Não há intenções maliciosas por trás deste código.

<h1 align="center"> 🤔 Oque faz este software? </h1>
  Este aplicativo faz requisições de informações em páginas web e salva essas informações de forma automatizada.
  
<h1 align="center"> 🔍 Como usar este software? </h1>
  O manuseio é simples conforme o passo-a-passo:<br>
  <ul>
    <a href="#Links">Links</a>
    <a href="#Produtos">Produtos</a>
    <a href="#Imagens">Imagens</a>
  </ul>
--------------------------
<h1 align="center" id="Links"> 🌍 Links</h1>
Para obter os links dos produtos você deve dar como input um arquivo .txt contendo o endereço do site desejado e o endereço de suas respectivas categorias, tal como o exemplo:
<br><ul>
<li>https://siteteste.com.br/</li>
<li>https://www.siteteste.com.br/</li>
<li>https://www.sitesteste.com.br/categoriateste</li>
</ul>


Obs: Este arquivo deve possuir o nome LINKS.txt e os links devem estar separados por *";"* e sem espaços.
<br><br>
O segundo input é um arquivo .txt nomeado INPUT.txt onde dentro dele vai constar a classe do elemento de produto. Basicamente onde está localizado o link dos produtos na página, como por exemplo:<br>
* .product-link<br>
* .product-info a<br>

Apenas um input deverá ser fornecido no formato de seletor CSS

Execute: "npm run produto"; A saída de dados esperada é um .txt nomeado LINKS com todos os links de cada produto na loja.

<h1 align="center" id="Produtos"> 🛍 Produtos</h1>
Para obter uma planilha com informações sobre cada produto você deverá deixar na pasta de input *apenas e somente ele* o arquivo LINKS.txt que foi dado gerado no passo anterior.
<br>
Execute: "npm run produto";
Feito isso será gerada uma planilha chamada Produtos.xlsx e dois arquivos CODES.txt e IMAGES.txt que serão usados no passo seguinte.

<h1 align="center" id="Imagens"> 📷 Imagens</h1>
Para obter todas as imagens de cada produto na loja use como input os arquivos CODE.txt e IMAGES.txt gerados no passo anterior.

Execute "npm run download"
Feito isso a saída esperada será todas as imagens de cada produtos salvas na pasta output, seguindo os nomes tal como exemplo:<br>
* Código<br>
* Código_2<br>
* Código_3<br>
