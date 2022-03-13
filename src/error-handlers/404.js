'use strict';
function handler404(req, res, next) {

    const error = {
      status: 404,
      message: 'page not found'
    };
  
    res.status(404).json(error);
  }
  
  module.exports = handler404;