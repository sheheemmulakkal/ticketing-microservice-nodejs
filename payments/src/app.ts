import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ticketingservice/common'
import { createChargeRouter } from './routes/new';



const app = express();
app.use( cookieSession({ 
  signed : false,
//   secure : process.env.NODE_ENV !== 'test'
  secure : false,
}) )
app.set('trust proxy', true )
app.use( express.json() );

app.use( currentUser )

app.use( createChargeRouter )


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use( errorHandler );

export { app }