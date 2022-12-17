const KEYS = require("../config/keys");
const models = require('../../db/models')
const { HTTP } = require("../constants/http");
const { RESPONSE } = require("../constants/response");
const createError = require("../helpers/createError");
const {jwtVerify} = require('../helpers/token')
const {Merchant, User, Product, Admin} = models

exports.authorize = () => async (req, _, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Authorization token is missing.",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const {id} = await jwtVerify(token)
    const merchant = await Merchant.findOne({
    where:{id}
    });
    const user = await User.findOne({
    where:{id}
    });

    if (!merchant && !user) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: 'Unauthorized to perform this action',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if (merchant) {
      req.userId = merchant.id;
      req.user = merchant;
      req.token = token
      next();
    }else if(user) {
      req.userId = user.id
      req.user = user
      req.token = token
      next()
    } else {
      next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status:  RESPONSE.ERROR,
          message: err.message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};

exports.authorizeUser = () => async (req, _, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Authorization token is missing.",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const {id} = await jwtVerify(token)
     const user = await User.findOne({
    where:{id}
    });

    if (!user) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: 'Unauthorized to perform this action',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if(user) {
      req.userId = user.id
      req.user = user
      req.token = token
      next()
    } else {
      next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status:  RESPONSE.ERROR,
          message: err.message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};


exports.authorizeMerchant = () => async (req, _, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Authorization token is missing.",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const {id} = await jwtVerify(token)
    const merchant = await Merchant.findOne({
    where:{id}
    });

    // const ownedProduct = await Product.findOne({
    //   where: {id: (req.params.id)}
    // })

    if (!merchant) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: 'Unauthorized to perform this action',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }

    // if (merchant.id !== ownedProduct.MerchantId) {
    //   return next(
    //     createError(HTTP.UNAUTHORIZED, [
    //       {
    //         status: RESPONSE.ERROR,
    //         message: 'Unauthorized to perform this action',
    //         statusCode: HTTP.UNAUTHORIZED,
    //       },
    //     ])
    //   );
    // }



    if (merchant) {
      req.userId = merchant.id;
      req.user = merchant;
      next();
    } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: err.message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};


exports.authorizeAdmin = async (req, _, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Authorization token is missing.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    const {id} = await jwtVerify(token)
    const admin = await Admin.findOne({
    where:{id}
    });

    if (!admin) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: 'Unauthorized to perform this action',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if(admin) {
      req.userId = admin.id
      req.user = admin
      req.token = token
      next()
    } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status:  RESPONSE.ERROR,
          message:  err.message,
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};

exports.authorizeSuperAdmin =  async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status: RESPONSE.ERROR,
          message: "Authorization token is missing.",
          statusCode: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
  try {
    const {id} = await jwtVerify(token)
    const admin = await Admin.findOne({
    where:{id, role: "super"}
    });

    if (!admin) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: 'Unauthorized to perform this action',
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    if(admin) {
      req.userId = admin.id
      req.user = admin
      req.token = token
      next()
    } else {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "Invalid auth token.",
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
  } catch (err) {
    return next(
      createError(HTTP.BAD_REQUEST, [
        {
          status:  RESPONSE.ERROR,
          message: err.message,
          statusCode:  HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
};

