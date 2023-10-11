import express, { Request, Response } from "express";
import { NotFoundError, requireAuth, validateRequest, OrderStatus, BadRequestError, NotAuthorizedError } from "@ticketingservice/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

const router = express.Router();

router.get( '/api/orders/tickets',  async ( req: Request, res: Response ) => {
  console.log('helooo');
  

  const tickets = await Ticket.find()
  if( !tickets ) {
    throw new Error("No tickets found");    
  }
  res.send(tickets)
})
router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {

  const order = await Order.findById( req.params.orderId ).populate('ticket')
  if( !order ) {
    throw new NotFoundError()
  }
  if( order.userId !== req.currentUser!.id ){
    throw new NotAuthorizedError()
  }

  res.send(order);
});


export { router as showOrderRouter };
