'use strict'

function errorHandler(error){
    console.error(error);
    throw new Error('Server error trying to execute your query')
}

module.exports = errorHandler