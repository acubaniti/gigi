module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			defaultValue: 'Fraier',
			allowNull: true,
		},
	  level: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		hp: {
			type: DataTypes.INTEGER,
			defaultValue: 100,
		},
		xp: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};
