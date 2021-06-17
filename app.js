// Módulos para requisições
const axios = require('axios'), cheerio = require('cheerio');
const { DH_CHECK_P_NOT_SAFE_PRIME } = require('constants');

// Módulos Gravar Arquivos
const fs = require('fs'), xl = require('excel4node'), wb = new xl.Workbook();

// Issue With UTF8
const iso88592 = require('iso-8859-2'), iconv = require('iconv-lite')

// Requisição
function mainRequest () {
  // Lendo arquivos na pasta /input
  const urlsrepeat = JSON.parse(fs.readFileSync(__dirname + '/LINKS.txt', 'utf-8')),
        urls = urlsrepeat.filter((elem, i) => urlsrepeat.indexOf(elem) === i);

    if(fs.existsSync(__dirname + '/INPUT.txt')) {
      // Caso o arquivo de input exista, então é uma requisição por links
      linksRequest(urls);
    } else {
      // Caso o arquivo de input não exista, então é uma requisição por produtos
      productsRequest(urls);
    }
}


// Requisições por Links
function linksRequest (urls) {
  // Declarando input para o parametro do Cheerio
  const input = fs.readFileSync(__dirname + '/INPUT.txt', 'utf-8').toString();

  new Promise((resolve, reject) => {
    // Declarando buffers
    let productslinks = [];
    let urlindex = 1;
    let urlnum = urls.length;
    let mainurl = urls[0].split('/')[0]+'//'+urls[0].split('/')[2];
    urls.forEach(url => {
      // Fazendo uma requisição com Axios
      axios(url)
        .then(response => {
          // Carregando a reposta do Axios com o Cheerio
          let $ = cheerio.load(response.data);

          // Incrementando todos o link de todos produtos de cada página
          $(input).toArray().forEach(element => { 
            if (element.attribs.href != null || element.attribs.href != null) {
              if (element.attribs.href.toString().startsWith('/')) {
                productslinks.push(mainurl+element.attribs.href.trim());
              } else {
                productslinks.push(element.attribs.href.trim());
              }
            }
          })

          // Quando as requisições forem iguais a quantidade de URLS ele retorna.
          urlindex == urlnum ? resolve(productslinks) : null;
  
          urlindex++;
        })
    })
  })
  .then(links => {
    let nonrepeatlinks = links.filter((elem, i) => links.indexOf(elem) === i);
    // Salva o arquivo de texto
    fs.writeFileSync(__dirname + '/output/LINKS.txt', nonrepeatlinks.join(';'), 'utf-8')
    console.log('Arquivo de texto salvo :)');
  })
}


// Requisições por Produtos
function productsRequest(urls) {
  new Promise ((resolve, reject) => {
    // Declarando buffers
    let ws = wb.addWorksheet('Produtos');
    let rowindex = 2, urlnum = urls.length;
    let imagesarray = [], codearray = [];

        urls.forEach(url => {
          // Fazendo uma requisição com Axios
          axios({
            url,
            method: 'get'
            // Para Problemas Relacionados Com Codificação Use:
              // responseType: 'arraybuffer',
              // responseEncoding: 'binary'
          })
            .then((response) => {
              // Para Problemas Relacionados Com Codificação Use:
                // let body = iso88592.decode(response.data.toString('binary'));
                // let body = iconv.decode(response.data, 'utf-8');

              // Carregando a reposta do Axios com o Cheerio
              let $ = cheerio.load(response.data);
              
              // Tratamento do scpript retornado (Pode variar)
              let data = $('script').get()[1].children[0].data;
              data = data.substr(86)
              data = data.toString().split(',"component_groups')[0] + '}';
              
              let dataclean = JSON.parse(data)

              // Declaração Do Produto
              let produto = {
                  url:  dataclean.url,
                  code: dataclean.external_id,
                  name: dataclean.name,
                  newprice: dataclean.price.toString(),
                  description: dataclean.description
              }
              
              // Lista de imagens adicionais
              if (dataclean.images != null || dataclean.images != undefined) {
                for(let i = 0; dataclean.images[i] != null; i++) {
                  codearray.push(dataclean.external_id)
                  imagesarray.push(dataclean.images[i].src)
                }
              }
          
              // Incrementando planilha com produtos
              let columnindex = 1;
              Object.keys(produto).forEach(columnName => {
                ws.cell(rowindex, columnindex++).string(produto[columnName]);
              })
          
              // Quando as requisições forem iguais a quantidade de URLS ele retorna
              rowindex - 1 == urlnum ? resolve([wb, imagesarray, codearray])  : null;     

              rowindex++;
            })
      })
    })
    .then(results => {
      // Salva o arquivo de planilha
      results[0].write(__dirname + '/output/Produtos.xlsx');
      fs.writeFileSync(__dirname + '/output/IMAGES.txt', results[1].join('\n'))
      fs.writeFileSync(__dirname + '/output/CODES.txt', results[2].join('\n'))
      console.log('Arquivo de Planilha Salvo :)')
    })
}

mainRequest();