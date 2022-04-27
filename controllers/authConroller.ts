import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index";

export const register: RequestHandler = async (req, res) => {
  const { email, password, phone, fullName } = req.body;

  if (!email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ where: { email: email } });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }

  const user: any = await User.create({
    email,
    password,
    phone,
    fullName,
  });
  user.hashPassword();

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user,
    token,
  });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user: any = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export const updateUser: RequestHandler = async (req, res) => {
  const {
    email,
    fullName,
    phone,
    password,
    id,
    city,
    dob,
    regAdress,
    driverLicense,
    representiveFullName,
    representiveLicense,
    idNumber,
    sportDriverLicense,
  } = req.body;
  if (!password) {
    throw new BadRequestError("Please provide all values");
  }
  const user: any = await User.upsert({
    id: id,
    email: email,
    fullName: fullName,
    phone: phone,
    password: password,
    city: city,
    dob: dob,
    regAdress: regAdress,
    driverLicense: driverLicense,
    representiveFullName: representiveFullName,
    representiveLicense: representiveLicense,
    idNumber: idNumber,
    sportDriverLicense: sportDriverLicense
  });

  const userUpdated: any = await User.findOne({ where: { id: id } });

  if (password) {
    userUpdated.hashPassword();
  }

  const token = userUpdated.createJWT();

  res.status(StatusCodes.OK).json({ userUpdated, token });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  await User.destroy({ where: { email: email } });

  res.status(StatusCodes.OK).json(`Deleted user with email ${email}`);
};
