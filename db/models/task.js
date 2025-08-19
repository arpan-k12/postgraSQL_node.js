const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const task = sequelize.define(
  "task",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description cannot be null",
        },
        notEmpty: {
          msg: "description Not be an empty",
        },
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "project",
        key: "id",
      },
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high", "urgent"),
      allowNull: false,
      validate: {
        notNull: {
          msf: "priority cannot be null",
        },
        notEmpty: {
          msg: "priority Not be an empty",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "review", "done"),
      allowNull: false,
      validate: {
        notNull: {
          msf: "status cannot be null",
        },
        notEmpty: {
          msg: "status Not be an empty",
        },
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "dueDate must be a valid date",
        },
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
    modelName: "task",
  }
);

module.exports = task;
