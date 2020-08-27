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
		CurrencyShop.upsert({ name: 'prezervativ', cost: 15 }),
		CurrencyShop.upsert({ name: 'cutit', cost: 300, damage:10 }),
		CurrencyShop.upsert({ name: 'pistol', cost: 2500 , damage: 25}),
		CurrencyShop.upsert({ name: 'ak47', cost: 5500, damage: 50 }),
		CurrencyShop.upsert({ name: 'telefon', cost: 250 }),
		CurrencyShop.upsert({ name: 'armura', cost: 1500, damage: 100 }),
		CurrencyShop.upsert({ name: 'cheie', cost: 100 }),
		CurrencyShop.upsert({ name: 'cutie', cost: 1500 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
