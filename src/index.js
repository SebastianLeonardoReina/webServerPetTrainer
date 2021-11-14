require('./database')
const app=require('./app')


app.listen(app.get('port'));
console.log('Server on part',app.get('port'));