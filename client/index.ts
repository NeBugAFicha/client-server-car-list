import cmd from 'node-stdio';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { URL, URLSearchParams } from 'url';
dotenv.config();

function getParamsObj(paramArr: string[]){
  const params: {[key: string]: string} = {};
  for(let i = 0; i < paramArr.length; i++){
    cmd.printsth(`${paramArr[i]} : `);
    const value = cmd.readLine().trim();
    if(value === '') continue;
    if(value === '\\s') break;
    params[paramArr[i]] = value;
  }
  return params;
}

function findOptions(){
  const params = getParamsObj(['sort', 'sortKind', 'id', 'brand', 'name', 'prodYear', 'price']);
  const url = new URL(process.env.SERVER_URL);
  url.search = new URLSearchParams(params).toString();
  return [url];
}

function createOptions(){
  const params = getParamsObj(['brand', 'name', 'prodYear', 'price']);
  const url = new URL(process.env.SERVER_URL);
  return [url, {method: 'POST', body: JSON.stringify(params), headers: {'Content-Type': 'application/json'}}]
}

function deleteOptions(){
  const params = getParamsObj(['id']);
  const url = new URL(`${process.env.SERVER_URL}/${params.id}`);
  return [url, {method: 'DELETE'}];
}

(async ()=>{
  while(true){
    let action: number;
    try{
      console.log('\nСписок действий :')
      console.log(' 1) Найти автомобили (query параметры sort, sortKind ("ASC", "DESC"), id, brand, name, prodYear, price);')
      console.log(' 2) Создать автомобиль (body параметры brand, name, prodYear, price);')
      console.log(' 3) Удалить автомобиль (params параметр :id);\n')
      cmd.printsth('Введите действие (номер): ')

      action = cmd.readInt().valueOf();
      if(!action || ![1,2,3].includes(action)) throw new Error();
    } catch (e){
      console.log('\nНекорректный ввод номера действия');
      continue;
    };

    console.log('\nВведите значения параметров запроса')
    console.log(' Для пропуска параметра (Space -> Enter)');
    console.log(' Для пропуска ввода остальных параметров нажмите введите "\\s")\n');

    let options;
    switch(action){
      case 1: options = findOptions(); break;
      case 2: options = createOptions(); break;
      case 3: options = deleteOptions(); break;
    } 
    const result = await fetch(options[0], options[1]).then(response=>response.json()).catch(e=>e.message);
    console.log(JSON.stringify(result, null, 4))
  };
})();