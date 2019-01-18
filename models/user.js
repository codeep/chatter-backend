'use strict';
export default (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 200]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 200]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 200]
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['female', 'male']],
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },

  });
  
  return User;
};
