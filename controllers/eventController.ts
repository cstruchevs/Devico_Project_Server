import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index";
import User from "../models/User";
import Event from "../models/Event";
import EventParticipants from "../models/EventParticipants";

export const postEvent: RequestHandler = async (req, res) => {
  const {
    name,
    date,
    place,
    discipline,
    status,
    series,
    costOfParticipation,
    eventInfo,
  } = req.body;

  if (
    !name ||
    !date ||
    !place ||
    !discipline ||
    !status ||
    !series ||
    !costOfParticipation ||
    !eventInfo
  ) {
    throw new BadRequestError("please provide all values");
  }

  const event: any = await Event.create({
    name,
    date,
    place,
    discipline,
    status,
    series,
    costOfParticipation,
    eventInfo,
  });

  res.status(StatusCodes.OK).json(event);
};

export const userRegisterEvent: RequestHandler = async (req, res) => {
  const { id: userId, eventId: eventId } = req.body;
  if (!userId || !eventId) {
    throw new BadRequestError("please provide all values");
  }
  EventParticipants.create({ userId, eventId });
  res
    .status(StatusCodes.OK)
    .json(`User with id ${userId} registered to the event with id ${eventId}`);
};

export const updateEvent: RequestHandler = async (req, res) => {
  const {
    id,
    name,
    date,
    place,
    discipline,
    status,
    series,
    costOfParticipation,
    eventInfo,
  } = req.body;

  if (!id) {
    throw new BadRequestError("Please provide id");
  }

  let event: any = await User.findOne({ where: { id: id } });
  if (!event) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  event = await Event.upsert({
    id: id,
    name: name,
    date: date,
    place: place,
    discipline: discipline,
    status: status,
    series: series,
    costOfParticipation: costOfParticipation,
    eventInfo: eventInfo,
  });
  res.status(StatusCodes.OK).json(event);
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide id");
  }
  await Event.destroy({ where: { id: id } });

  res.status(StatusCodes.OK).json(`Deleted event with id ${id}`);
};

export const getAllEvents: RequestHandler = async (req, res) => {
  const events = await Event.findAll();
  res.status(StatusCodes.OK).json(events);
};

export const getOneEvent: RequestHandler = async (req, res) => {
  const {id} = req.params
  if(!id) {
    throw new BadRequestError("Please provide id");
  }
  const event: any = await User.findOne({
    where: { id: id }
  });
  if (!event) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  res.status(StatusCodes.OK).json(event);
};

export const getEventForOneUser: RequestHandler = async (req, res) => {
  const {id} = req.params;
  if(!id) {
    throw new BadRequestError("Please provide id");
  }

  const events = EventParticipants.findAll( {include: {model: Event}})
  res.status(StatusCodes.OK).json(events);
}
