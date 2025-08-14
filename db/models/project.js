const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "project",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msf: "title cannot be null",
        },
        notEmpty: {
          msg: "title Not be an empty",
        },
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          arg: [[true, false]],
          msg: "isFeatured value must be true or false",
        },
      },
    },
    productImge: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: "productImge cannot be null",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "price cannot be null",
        },
        isDecimal: {
          msg: "price value is must be a decimal",
        },
      },
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        notNull: {
          msg: "shortDescription cannot be null",
        },
        notEmpty: {
          msg: "shortDescription Not be an empty",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validation: {
        notNull: {
          msg: "description cannot be null",
        },
        notEmpty: {
          msg: "description Not be an empty",
        },
      },
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: "productUrl cannot be null",
        },
        notEmpty: {
          msg: "productUrl Not be an empty",
        },
        isUrl: {
          msg: "invalid ProductUrl string",
        },
      },
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validator: {
        notNull: {
          msg: " category not be null",
        },
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validator: {
        notNull: {
          msg: " tags not be null",
        },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: "project",
  }
);
