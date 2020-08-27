module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_item', {
		user_id: {
			type: DataTypes.STRING,
		},
		item_id: DataTypes.STRING,
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
		damage: {
			type: DataTypes.INTEGER,
			allowNull: true,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};
