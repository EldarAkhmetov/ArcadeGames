"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            login: {
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
            },
            games: {
                type: Sequelize.INTEGER,
            },
            wins: {
                type: Sequelize.INTEGER,
            },
            cage1: {
                type: Sequelize.INTEGER,
            },
            cage2: {
                type: Sequelize.INTEGER,
            },
            cage3: {
                type: Sequelize.INTEGER,
            },
            cage4: {
                type: Sequelize.INTEGER,
            },
            fifteenGames: {
                type: Sequelize.INTEGER,
            },
            fifteenRecord: {
                type: Sequelize.INTEGER,
            },
            fifteenMedium: {
                type: Sequelize.INTEGER,
            },
            mineEasy: {
                type: Sequelize.INTEGER,
            },
            mineNormal: {
                type: Sequelize.INTEGER,
            },
            mineHard: {
                type: Sequelize.INTEGER,
            },
            mineEasyWin: {
                type: Sequelize.INTEGER,
            },
            mineNormalWin: {
                type: Sequelize.INTEGER,
            },
            mineHardWin: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
