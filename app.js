require('dotenv').config();
const { ValidationError } = require('express-validation');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const authRoute = require('./src/routes/auth.routes');
const userRoute = require('./src/routes/user.routes');
const customerRoute = require('./src/routes/customer.routes');

const app = express();
const port = process.env.PORT || 3001

const corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const { role: Role } = db;

// db.sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Drop and Resync DB');
//     initial();
//   });

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });
  Role.create({
    id: 2,
    name: 'moderator',
  });
  Role.create({
    id: 3,
    name: 'admin',
  });
};

db.sequelize.sync();

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

authRoute(app);
userRoute(app);
customerRoute(app);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
})

app.listen(port, () => console.log(`🚀 App running on port: ${port}`));
