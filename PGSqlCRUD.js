const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const dbUrl = 'postgres://webadmin:SOTyvy79529@node50124-env-7377511.proen.app.ruk-com.cloud/books'

const sequelize = new Sequelize(dbUrl);