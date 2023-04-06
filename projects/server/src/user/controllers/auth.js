const db = require("../../models");
const user = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars")

module.exports = {
    register: async (req,res) => {
        try {

        } catch (err) {
            res.status(400).send(err)
        }
    },

    verification: async (req, res) => {
        try {
            
        } catch (err) {
            res.status(400).send(err)
            
        }
    }
}