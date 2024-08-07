import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import db from "../../config/dbConnection.mjs";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validates: {
        isEmail: true,
        len: [3, 255],
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    andress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] },
      },
      loginUser: {
        attributes: {},
      },
    },
  }
);

User.associate = function (models) {};

User.prototype.toSafeObject = function () {
  const { id } = this;

  return { id };
};

User.login = async function ({ email, password }) {
  const user = await User.scope("loginUser").findOne({
    where: { email },
  });
  if (user && user.validatePassword(password)) {
    return await User.scope("currentUser").findByPk(user.id);
  }
};

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

User.getCurrentUserById = async function (id) {
  return await User.scope("currentUser").findByPk(id);
};

User.signup = async function ({
  firstName,
  lastName,
  cpf,
  email,
  phone,
  andress,
  number,
  complement,
  neighborhood,
  province,
  state,
  country,
  zipCode,
  password,
}) {
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({
    firstName,
    lastName,
    cpf,
    email,
    phone,
    andress,
    number,
    complement,
    neighborhood,
    province,
    state,
    country,
    zipCode,
    hashedPassword,
  });
  return await User.scope("currentUser").findByPk(user.id);
};

export default User;
