export let  getImagem =function(readerEvt, midia){
    //console.log('change no input file', readerEvt);
   // let file = fi;
   let file = readerEvt.target.files[0];
   var reader = new FileReader();
   reader.readAsDataURL(file);
    reader.onload = function () {
        //console.log('base64 do arquivo',reader.result);
        midia=btoa(reader.result);
        //console.log('base64 do arquivo codificado',midia.binario);
    };
   return reader.onerror = function (error) {
        console.log('Erro ao ler a imagem : ', error);
        midia= null;
    };
}