const translate = require('node-google-translate-skidz');

const traducir = async(texto) =>{
    // let traducido='';
    if (texto) {
        traducido = await translate({
          text: texto,
          source: 'en',
          target: 'es'
        });
        console.log(traducido.translation);
        return traducido.translation;
    }else{
        return '';
    }
}
//traducir json

const traducirJSON = async(texto) =>{
    // let traducido='';
    if (texto) {
        traducido = await translate({
          text: JSON.stringify(texto),
          source: 'en',
          target: 'es'
        });
        console.log(traducido.translation);
        return JSON.parse(traducido.translation);
    }else{
        return {};
    }
}

module.exports = {traducir, traducirJSON}