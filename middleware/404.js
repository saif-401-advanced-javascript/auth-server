'use strict';

function middle404(req, res, next) {
  try {
    res.status(404).send('404/Not-Found');
  } catch (e) {
    res.statusCode = 404;
  }
}

module.exports = middle404;
