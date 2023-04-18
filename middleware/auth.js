const jwt = require('jsonwebtoken');
const ErrorResponse = require('../helpers/errorResponse');
module.exports = {
  ensureAuth: function (req, res, next) {
    jwt.verify(
      req.cookies.cookieToken,
      process.env.SECRET,
      function (err, decoded) {
        if (err) {
          res.redirect('auth/login');
        } else {
          req.user = decoded;
          next();
        }
      }
    );
  },
  ensureGuest: function (req, res, next) {
    jwt.verify(
      req.cookies.cookieToken,
      process.env.SECRET,
      function (err, decoded) {
        if (err) {
          next();
        } else {
          res.redirect('/etusivu_opiskelija');
        }
      }
    );
  },
  authorize: function (...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorResponse(`Käyttäjäroolilla: ${req.user.role} ei ole oikeutta käyttää tätä toimintoa`, 403)
        );
      }
      next();
    };
  },
};



// const jwt = require('jsonwebtoken');

// module.exports = {
//   ensureAuth: function (req, res, next) {
//     jwt.verify(
//       req.cookies.cookieToken,
//       process.env.SECRET,
//       function (err, decoded) {
//         if (err) {
//           res.redirect('auth/login');
//         } else {
//           next();
//         }
//       }
//     );
//   },
//   ensureGuest: function (req, res, next) {
//     jwt.verify(
//       req.cookies.cookieToken,
//       process.env.SECRET,
//       function (err, decoded) {
//         if (err) {
//           next();
//         } else {
//           res.redirect('/etusivu_opiskelija');
//         }
//       }
//     );
//   },
// };
