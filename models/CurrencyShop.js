module.exports = (sequelize, DataTypes) => {
	return sequelize.define('currency_shop', {
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		description: {
					type: DataTypes.STRING,
				},
		imgurl: {
							type: DataTypes.STRING,
							allowNull: true,
						},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
