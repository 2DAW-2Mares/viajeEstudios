module.exports = {
  restApiRoot: "/api",
  host: "0.0.0.0",
  port: 3000,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false
    },
    json: {
      strict: false,
      limit: "100kb"
    },
    urlencoded: {
      extended: true,
      limit: "100kb"
    },
    cors: false
  },
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 3306,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  email_user: process.env.EMAIL_USER,
  email_password: process.env.EMAIL_PASSWORD,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
  admin_role: "administrador"
}
