# Products_Crowler

Este software funciona de maneiras simples e em pequena escala. Esta aplicação apenas tem como intuito estudos práticos de programação. Não há intenções maliciosas por trás deste código.

# 🤔 Oque faz este software?
  Este aplicativo faz requisições de informações em páginas web e salva essas informações de forma automatizada.
  
# 🔍 Como usar este software?
  O manuseio é simples conforme o passo-a-passo:
   * [Links](#Links)
   * [Produtos](#Produtos)
   * [Imagens](#Imagens)

--------------------------
<h1 id="Links"> 🌍 Links</h1>
Para obter os links dos produtos você deve dar como input um arquivo .txt contendo o endereço do site desejado e o endereço de suas respectivas categorias, tal como o exemplo:
- https://wwww.lojateste.com.br
- www.lojateste.com.br
- https://wwww.lojateste.com.br/categoriateste
*Obs:* Este arquivo deve possuir o nome LINKS.txt e os links devem estar separados por *";"* e sem espaços.

O segundo input é um arquivo .txt nomeado INPUT.txt onde dentro dele vai constar a classe do elemento de produto. Basicamente onde está localizado o link dos produtos na página, como por exemplo:\
- .product-link\
- .product-info a\
Apenas um input deverá ser fornecido no formato de seletor CSS

Execute: "npm run produto";
A saída de dados esperada é um .txt nomeado LINKS com todos os links de cada produto na loja.

<h1 id="Produtos"> 🛍 Produtos</h1>
Para obter uma planilha com informações sobre cada produto você deverá deixar na pasta de input *apenas e somente ele* o arquivo LINKS.txt que foi dado gerado no passo anterior.


Execute: "npm run produto";
Feito isso será gerada uma planilha chamada Produtos.xlsx e dois arquivos CODES.txt e IMAGES.txt que serão usados no passo seguinte.

<h1 id="Imagens"> 📷 Imagens</h1>
Para obter todas as imagens de cada produto na loja use como input os arquivos CODE.txt e IMAGES.txt gerados no passo anterior.

Execute "npm run download"
Feito isso a saída esperada será todas as imagens de cada produtos salvas na pasta output, seguindo os nomes tal como exemplo:
- Código
- Código_2
- Código_3

