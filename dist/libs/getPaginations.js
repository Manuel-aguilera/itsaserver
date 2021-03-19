"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagination = void 0;

var getPagination = function getPagination(page, size) {
  var limit = size ? +size : 3; //limite de documentos (objetos) por pagina

  var offset = page ? page * limit : 0;
  return {
    limit: limit,
    offset: offset
  };
};

exports.getPagination = getPagination;