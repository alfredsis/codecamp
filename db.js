const { Sequelize, QueryTypes  } = require('@sequelize/core');
const { MsSqlDialect } = require('@sequelize/mssql');

const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'localhost',
  port: 1433,
  database: 'codecamp',
  authentication: {
    type: 'default',
    options: {
      userName: 'edgar',
      password: '12345',
    },
  },  
  
  encrypt: true, 
  trustServerCertificate: true, 
});

const dbConnection = async() =>{

  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito :).');
   
    
  } catch (err) {
    console.log('No se pudo conectar a la base de datos:', err);
  }

}

module.exports = { sequelize, dbConnection };
