var connection = require("./connection");

function questionMarks(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push("?");
    }
    return arr.toString();
}

function convertToSql(obj) {
    var arr = [];
    for (var key in obj) {
        arr.push(key + "=" + obj[key]);
    }
    return arr.toString();
}

var orm = {
    all: function(table, callback) {
        var query = "SELECT * FROM " + table + ";";
        connection.query(query, function(err, result) {
            if(err) throw err;
            callback(result);
        });
    },
    
    create: function(table, column, value, callback) {
        var query = "INSERT INTO " + table + " (" + column.toString() + ") VALUES (" + questionMarks(value.length) + ")";
        connection.query(query, value, function(err, result) {
            if(err) throw err;
            callback(result);
        });
    },

    update: function(table, valToUpdate, condition, callback){
        var query = "UPDATE " + table + " SET " + convertToSql(valToUpdate) + " WHERE " + condition;
        connection.query(query, function(err, result) {
            if(err) throw err;
            callback(result);
        });
    }
};

module.exports = orm;