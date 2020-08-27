module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
	  level: {
			type: DataTypes.INTEGER,
		},
		xp: {
			type: DataTypes.INTEGER,
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
