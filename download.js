// Declarando modulos
const fs = require('fs'), Path = require('path'), axios = require('axios')

// Lendo Inputs
const urls = fs.readFileSync(__dirname + '/input/IMAGES.txt', 'utf8').split('\n'), 
    codes = fs.readFileSync(__dirname + '/input/CODES.txt', 'utf8').split('\n');

// Criando função de download
function downloadImage (x) {
    // Declarando url atual
    let url = urls[x], code;

    new Promise((resolve, reject) => {
        // Verificando por cópias de código
        let i = 1;
        code = codes[x];
        while (codes[x] == codes[x-i]) {
            code = codes[x].trim() + '_' + (i+1);
            i++;
        }
        resolve(code)
    })
    .then(code => {
        // Declarando buffer de arquivo para salvamento
        let path = Path.resolve(__dirname + '/output/' + code.trim() + '.jpg')
        let writer = fs.createWriteStream(path)

        // Realizando requisições das imagens
        axios({
            url,
            method: 'GET',
            responseType: 'stream'
          })
          .then(response => {
            // Gravando a imagem
            response.data.pipe(writer)

            // Sinalizando Gravação
            console.log('Donwloaded: ' + code);

            // Verificando se existe uma próxima imagem
            if (codes[x+1] != undefined && codes[x+1] != '') {
                downloadImage(x+1);
            } else {
                console.log('\n Operação Terminada :)')
            }
          })
          .catch(err => {
              console.log(err)
          })
    }) 
}

// Executando a função começando pela primeira Imagem (Imagem 0)
downloadImage(0)  