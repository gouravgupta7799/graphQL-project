const User = require("./model/user.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resolvers = {

  Query: {
    users: async () => await User.findAll(),
    user: async (parent, args) => await User.findByPk(args.id),
  },
  Mutation: {
    signup: async (parent, args) => {
      const checkEmail = args.email
      const passCode = args.password

      try {
        if (checkEmail.trim().length <= 0 || passCode.trim().length <= 0) {
          console.log('invalid email or password')
        }
        const foundEmail = await User.findOne({ where: { email: checkEmail } })
        if (foundEmail) {
          console.log('user alredy exixt email found')
        }
        else {

          const newUser = await User.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: passCode,
            age: args.age,
          });

          const salt = 5;
          bcrypt.hash(passCode, salt, async (err, hash) => {
            newUser.password = hash
            await newUser.save()
          })
          jwtFunctionCall(newUser.id, newUser)
          return newUser;
        }
      }

      catch (err) {
        return err
      }
    },

    login: async (parent, args) => {

      const checkEmail = args.email;
      const passCode = args.password;
      let token;
      try {
        if (checkEmail.trim().length <= 0 || passCode.trim().length <= 0) {
          console.log({ error: 'invalid email or password' })
        }
        const foundEmail = await User.findOne({ where: { email: checkEmail } })

        if (!foundEmail) {
          console.log({ error: 'user not found' });
        }

        if (foundEmail) {
          return bcrypt.compare(passCode, foundEmail.password)

            .then(async (pass, err) => {
              if (pass) {
                jwtFunctionCall(foundEmail.id, foundEmail)
                return foundEmail;
              } else {
                console.log({ message: 'invalid password' });
              }
            })
            .catch((err) => {
              return { result: false, message: err.message };
            });
        } else {
          console.log({ error: 'invalid credential, try after sometime' });
        }
      }
      catch (err) {
        return err
      }

    },
    User: {
      __resolveReference(user, { User }) {
        console.log(user, '>1111>>', User)
        return User.findByPk(user.id);
      },
    },
  },
};

async function jwtFunctionCall(id, foundEmail) {
  // console.log(id,'>>>>', foundEmail)
  token = jwt.sign({ id: id }, process.env.JWTPasscode)
  foundEmail.token = token;
  await foundEmail.save()
  return token;
}

module.exports = { resolvers };

