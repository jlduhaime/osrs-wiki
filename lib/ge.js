"use strict";

const url = require('./config').wiki;
const request = require('request-promise');
const cheerio = require('cheerio');

function grandExchange() {
    this.getItem = (item) => {
        return new Promise((resolve, reject) => {
            request.get(url + item).then(resolve).catch(reject);
        })
    }
}

function getData(item) {
    request(url + item, function(err, res, html) {
        var gdata = {price: 0, name: ""};
        var $ = cheerio.load(html);

        $("#GEPrice").filter(function() {
            gdata.price = parseInt($(this).text().substring(0, $(this).text().indexOf(" ")));
        });

        $(".page-header__title").filter(function() {
            gdata.name = $(this).text();
        });
        return gdata;
    }).then(function(data) {
        return data;
    });
}

module.exports = grandExchange;