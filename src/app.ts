import { Servidor } from './config/servidor/servidor';
import {BancoDeDados} from './config/bancoDados/DB';
import {Person} from './schemas/geotest';


const appServidor = new Servidor().getAppConfig();
const appDB = new BancoDeDados().getMongo();
//https://www.sitepoint.com/using-json-web-tokens-node-js/
//https://codeburst.io/building-a-budget-manager-with-vue-js-and-node-js-part-i-f3d7311822a8
//https://www.npmjs.com/package/jsonwebtoken
//https://nodejs.org/api/crypto.html
//https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr
//https://github.com/auth0/node-jsonwebtoken


appServidor.get('/hello', (req, res) => {
  res.status(200).send('Hello world I\'m alive bitch');
});



appServidor.listen(3000, () => {
  Person.find().then((result)=>{
    main(result);
  });
  //pessoa4.findClosest()

});
async function populaBD():Promise<boolean>{
  let pessoa1 = new Person({
    name: 'Luigi',
    age:20,
    geometry: {
      type: 'Point',
      coordinates: [20,20]
    }
  });
  pessoa1.save();

  console.log('Criando pessoa2');
  let pessoa2 = new Person({
    name: 'Ryu',
    age:17,
    geometry: {
      type: 'Point',
      coordinates: [7,7]
    }
  });
  pessoa2.save();

  console.log('Criando pessoa3');
  let pessoa3 = new Person({
    name: 'Helder',
    age:20,
    geometry: {
      type: 'Point',
      coordinates: [6,6]
    }
  });
  pessoa3.save();
  return true;
}

async function executaSearch():Promise<boolean>{
  Person.find({geometry:{$nearSphere:{
    $geometry:
    {type:"Point", coordinates:[5,5]}
  }}}).limit(1).exec((err, result)=>{
    if(result){
      //Tem de aparecer Helder
      console.log('Closest to %s is %s', [5,5], result);
    }
    else{
      console.log('Cant find!');
    }
  });
  return true;
}
//Pode ser necessario executar 2 vezes
async function main(resultado:any){
  try{
    console.log(resultado.length);
    if(resultado.length==0){
      const ola = await populaBD();
      if(ola===true){
        await executaSearch();
        
      }
    }else{
      await executaSearch();
    }
  }
  catch(err){

  }
}