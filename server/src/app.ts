require('dotenv').config()
import express, { Application, NextFunction, Response, Request } from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import adminRoutes from './routes/admin';
import menuRoutes from './routes/menu';
import restaurantRoutes from './routes/restaurant';
import foodRoutes from './routes/food';
import orderRoutes from './routes/order';
import basketRoutes from './routes/basket';
import categoryRoutes from './routes/category';
import errorHandler from './middlewares/error.handler';
import { NotFoundError } from './errors/not-found-error';
import helmet from 'helmet';
import 'express-async-errors';

const port = process.env.PORT || 3001;
const app: Application = express();

app.use(express.json())
app.use(errorHandler);
app.use(helmet());
app.set("trust proxy", true);
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use('/api/auth', authRoutes);
app.use('/api/user-management', userRoutes);
app.use('/api/admin-management', adminRoutes);
app.use('/api/restaurant-management', restaurantRoutes);
app.use('/api/menu-management', menuRoutes);
app.use('/api/food-management', foodRoutes);
app.use('/api/category-management', categoryRoutes);
app.use('/api/basket-management', basketRoutes);
app.use('/api/order-management', orderRoutes);

app.all('*', async () => {
    throw new NotFoundError();
})

app.listen(port, function () {
    console.log(`Server is listening on port ${port}!`)
})