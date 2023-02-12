const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Notice = require("../models/notice");

const getNotices = async (req, res, next) => {
  let notices;
  try {
    notices = await Notice.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ notices: notices });
};

const createNotice = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  if (req.userData.type != "admin") {
    // console.log(req.userData.type);
    return next(new HttpError("Unauthorised access", 403));
  }

  const { header, body, date } = req.body;

  console.log(req);
  const createdNotice = new Notice({
    header,
    body,
    date,
  });

  try {
    await createdNotice.save();
  } catch (err) {
    const error = new HttpError(
      "Creating notice failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ notice: createdNotice });
};

const deleteNotice = async (req, res, next) => {
  const noticeId = req.params.nid;

  if (req.userData.type != "admin") {
    return next(new HttpError("Unauthorised access", 403));
  }

  let notice;
  try {
    notice = await Notice.findById(noticeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete notice.",
      500
    );
    return next(error);
  }

  if (!notice) {
    const error = new HttpError("Could not find notice for this id.", 404);
    return next(error);
  }

  // if (place.creator.id !== req.userData.userId) {
  //   const error = new HttpError(
  //     'You are not allowed to delete this place.',
  //     401
  //   );
  //   return next(error);
  // }

  try {
    await notice.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete notice.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted notice." });
};

exports.getNotices = getNotices;
exports.createNotice = createNotice;
exports.deleteNotice = deleteNotice;
