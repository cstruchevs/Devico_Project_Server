import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index";
import Car from "../models/Car";
import User from "../models/User";

export const deleteCar: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide id");
  }
  await Car.destroy({ where: { id: id } });

  res.status(StatusCodes.OK).json(`Deleted car with id ${id}`);
};

export const postCar: RequestHandler = async (req, res) => {
  const {
    model,
    year,
    capaciteEngine,
    regVihicleNumber,
    technicalPassNumber,
    viaNumber,
    driveTrain,
    fullNameOwner,
    id,
  } = req.body;

  if (
    !model ||
    !year ||
    !capaciteEngine ||
    !regVihicleNumber ||
    !technicalPassNumber ||
    !viaNumber ||
    !driveTrain ||
    !fullNameOwner
  ) {
    throw new BadRequestError("please provide all values");
  }

  const user: any = await User.findOne({
    where: { id: id },
    include: ["cars"],
  });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
    const createdCar = await user.createCar({
    model,
    year,
    capaciteEngine,
    regVihicleNumber,
    technicalPassNumber,
    viaNumber,
    driveTrain,
    fullNameOwner,
  });

  

  res.status(StatusCodes.OK).json(createdCar);
};

export const getAllCars: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user: any = await User.findOne({
    where: { id: id },
    include: ["cars"],
  });
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json(user.cars);
};

export const updateCar: RequestHandler = async (req, res) => {
  const {
    id,
    model,
    year,
    capaciteEngine,
    regVihicleNumber,
    technicalPassNumber,
    viaNumber,
    driveTrain,
    fullNameOwner,
  } = req.body;

  if (!id) {
    throw new BadRequestError("Please provide id");
  }
  let car: any = await Car.findOne({ where: { id: id }, include: ["cars"] });

  if (!car) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  car = await Car.upsert({
    id: id,
    model: model,
    year: year,
    capaciteEngine: capaciteEngine,
    regVihicleNumber: regVihicleNumber,
    technicalPassNumber: technicalPassNumber,
    viaNumber: viaNumber,
    driveTrain: driveTrain,
    fullNameOwner: fullNameOwner,
  });

  res.status(StatusCodes.OK).json(car);
};
