import logger from "./../utils/logger";

module.exports = (req, res, next) => {
  logger.info(
    `[REQUEST] method=${req.method} route=${
      req.originalUrl
    } platform=${req.useragent.browser} body=${JSON.stringify(req.body)}`
  );

  res.on("finish", () => {
    logger.info(
      `[RESPONSE] method=${req.method} method=${req.originalUrl} [FINISHED]`
    );
  });

  res.on("close", () => {
    log.error(`${req.method} ${req.originalUrl} [CLOSED]`);
  });
  next();
};
