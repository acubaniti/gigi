const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'Hot123', '132435465768798', {
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
		CurrencyShop.upsert({ name: 'Tigari', cost: 10 }),
		CurrencyShop.upsert({ name: 'Prajitura', cost: 3 }),
		CurrencyShop.upsert({ name: 'Cafea', cost: 15 }),
		CurrencyShop.upsert({ name: 'Sticla de whiskey', cost: 500 }),
		CurrencyShop.upsert({ name: 'Ranga', cost: 1500 }),
		CurrencyShop.upsert({ name: 'Prezervativ', cost: 15 }),
		CurrencyShop.upsert({ name: 'Bata de baseball', cost: 1500 }),
		CurrencyShop.upsert({ name: 'Cagula', cost: 1500 }),
		CurrencyShop.upsert({ name: 'Pistol', cost: 3500 }),
		CurrencyShop.upsert({ name: 'Mitraliera', cost: 4500 }),
		CurrencyShop.upsert({ name: 'Masina', cost: 5500 }),
		CurrencyShop.upsert({ name: 'Cautiune', cost: 99999 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
});
