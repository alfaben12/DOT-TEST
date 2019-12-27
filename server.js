var RajaOngkir = require('rajaongkir-nodejs').Starter('0df6d5bf733214af6c6644eb8717c92c');
const express = require('express')
const cors = require('cors');
const app = express()

// allow request
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // allow preflight
    
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});


app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:'100mb',parameterLimit:1000000 }));
app.use(express.static('./'));

app.get('/provinces', (req, res) => 
RajaOngkir.getProvinces().then(function (result){
    let searchKey = req.query.searchKey;
    let data;
    if(searchKey != ''){
        data = [];
        for (let i = 0; i < result.rajaongkir.results.length; i++) {
            if (result.rajaongkir.results[i].province.indexOf(searchKey) !== -1) {
                data.push(result.rajaongkir.results[i]);
            }
        }
    }else{
        data = result.rajaongkir.results;
    }
    return res.status(200).json(data);
}).catch(function (error){
    return res.json(error);
})
)
app.get('/cities', (req, res) => 
RajaOngkir.getCities().then(function (result){
    let searchKey = req.query.searchKey;
    let data;
    if(searchKey != ''){
        data = [];
        for (let i = 0; i < result.rajaongkir.results.length; i++) {
            if (result.rajaongkir.results[i].city_name.indexOf(searchKey) !== -1) {
                data.push(result.rajaongkir.results[i]);
            }
        }
    }else{
        data = result.rajaongkir.results;
    }
    return res.status(200).json(data);
}).catch(function (error){
    return res.json(error);
})
)
app.listen(3009, () => {
    console.log(`Server listening on port 3009`);
});