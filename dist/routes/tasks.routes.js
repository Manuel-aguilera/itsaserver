"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var taskCtrl = _interopRequireWildcard(require("../controllers/task.controller"));

var router = (0, _express.Router)();
router.post('/', taskCtrl.createTask);
router.get('/', taskCtrl.findAllTasks);
router.get('/done', taskCtrl.findAllDoneTask);
router.get('/:id', taskCtrl.findOneTask);
router["delete"]('/:id', taskCtrl.deleteTask);
router.put('/:id', taskCtrl.updateTask);
var _default = router;
exports["default"] = _default;