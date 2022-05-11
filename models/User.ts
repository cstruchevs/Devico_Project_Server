import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sequelize from "../db/database";

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: true },
  fullName: { type: Sequelize.STRING, allowNull: true },
  city: { type: Sequelize.STRING, allowNull: true },
  dob: { type: Sequelize.DATE, allowNull: true },
  regAdress: { type: Sequelize.STRING, allowNull: true },
  driverLicense: { type: Sequelize.STRING, allowNull: true },
  representiveFullName: { type: Sequelize.STRING, allowNull: true },
  representiveLicense: { type: Sequelize.STRING, allowNull: true },
  idNumber: { type: Sequelize.STRING, allowNull: true },
  sportDriverLicense: { type: Sequelize.STRING, allowNull: true },
});

User.beforeCreate(async (user: any, next) => {

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user: any, next) => {
  if(user.changed('password')) {
    return
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.createJWT = function () {
  return jwt.sign({ userId: this.id }, "jwtsecret", {
    expiresIn: "1d",
  });
};

User.prototype.comparePassword = async function (candidatePassword: any) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default User;
