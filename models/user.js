module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          len: {
            args: [6, 50],
            msg: 'Name must be between 6 and 50 characters'
          },
          notEmpty: true,
          notNull: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
          isEmail: true,
          notEmpty: true,
          notNull: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Person, { foreignKey: 'user_id' });
  };

  return User;
};
