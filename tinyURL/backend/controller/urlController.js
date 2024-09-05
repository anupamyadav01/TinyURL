import { nanoid } from "nanoid";
import { urlModel } from "../model/urlModel.js";

const portNo = process.env.PORT_NO || 8080;

const isURLValid = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

const getShortURL = async (req, res) => {
  const urlFromUser = req.body.url;

  if (!isURLValid(urlFromUser)) {
    return res.status(400).json({
      status: false,
      message: "Please provide a valid URL",
    });
  }
  const shortURL = nanoid(6);

  try {
    const response = await urlModel.create({
      shortURL,
      originalURL: urlFromUser,
    });

    res.send({
      success: true,
      shortURL: `http://localhost:${portNo}/${shortURL}`,
    });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const redirectOriginalURL = async (req, res) => {
  const shortURL = req.params.shortURL;
  console.log(shortURL);

  try {
    const response = await urlModel.findOne({ shortURL: [shortURL] });
    console.log(response?.originalURL);
    // res.send({
    //   status: true,
    //   result: response,
    // });
    res.redirect(response?.originalURL);
  } catch (error) {
    console.error("Error finding URL:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export default { getShortURL, redirectOriginalURL };
