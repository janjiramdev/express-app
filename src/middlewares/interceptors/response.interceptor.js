const responseInterceptor = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    const data = JSON.parse(body);
    const isError = res.statusCode >= 400;

    const response = {
      path: req.originalUrl,
      success: !isError,
      statusCode: res.statusCode,
      ...(!isError ? { data } : { error: data })
    };

    return originalSend.call(this, JSON.stringify(response));
  };

  next();
};

export default responseInterceptor;
