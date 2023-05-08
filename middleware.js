export function middleware(req, res, next) {
  const regex = /^(?!\/(api|\[user\])).*/; // Regex to match paths that don't start with /api or /[user]
  const path = req.path;
  if (regex.test(path)) {
    // Run middleware logic here for paths that don't match /api or /[user]
    console.log(`Request to ${path} passed middleware.`);
    // next();
  } else {
    // Ignore requests to /api or /[user]
    console.log(`Request to ${path} ignored by middleware.`);
    res.status(404).end();
  }
}
