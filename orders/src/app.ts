import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ticketingservice/common' 
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';



const app = express();
app.use( cookieSession({ 
  signed : false,
//   secure : process.env.NODE_ENV !== 'test'
  secure : false,
}) )

app.use( currentUser )
app.set('trust proxy', true )
app.use( express.json() );

app.use( deleteOrderRouter )
app.use( indexOrderRouter )
app.use( newOrderRouter )
app.use( showOrderRouter )


app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use( errorHandler );

export { app }