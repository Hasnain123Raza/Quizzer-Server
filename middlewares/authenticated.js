export default (request, response, next) => {
  if (Boolean(request.user)) next();
  else response.sendStatus(403);
};
