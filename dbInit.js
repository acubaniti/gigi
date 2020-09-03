const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'prezervativ', cost: 15 , description:'Prezervativ cu striatii, pentru placerea ei.'}),
		CurrencyShop.upsert({ name: 'cutit', cost: 300, damage: 10 , description:'Cutit de bucatarie'}),
		CurrencyShop.upsert({ name: 'cheie', cost: 100 , description:'O cheie simpla'}),
		CurrencyShop.upsert({ name: 'pistol',cost: 2500 , damage: 25, description:'Pistol Carpați Md. 1974', }),
		CurrencyShop.upsert({ name: 'ak47', cost: 5500, damage: 50 , description:'Automat Kalașnikov model 1947'}),
		CurrencyShop.upsert({ name: 'telefon', cost: 250 , description:'Pistol Carpați Md. 1974'}),
		CurrencyShop.upsert({ name: 'armura', cost: 1500, damage: 100 , description:'Armura de corp folosita'}),
		CurrencyShop.upsert({ name: 'cutie', cost: 1500 , description:'O cutie cu lacat, pare grea.'}),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
