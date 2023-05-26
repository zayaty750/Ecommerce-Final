import { mongo } from "mongoose";
import Client from "../models/Client";

// Get all clients
const getClient = async (req, res, next) => {
  const clients = Client.find({})
    .then((clients) => {
      if (clients.length > 0) {
        clients.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        });
      }
      res.render("pages/clients", { clients: clients });
    }) //get all clients
    .catch((err) => {
      next(err);
    });
};

export  {getClient};