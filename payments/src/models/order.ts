import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@ticketingservice/common';

interface OrderAtters {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

interface OrderModel extends mongoose.Model< OrderDoc > {
    build( attrs: OrderAtters): OrderDoc
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform( doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

orderSchema.set('versionKey', 'version')
orderSchema.plugin( updateIfCurrentPlugin )

orderSchema.statics.build = ( attrs: OrderAtters ) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    })
}

const Order = mongoose.model< OrderDoc, OrderModel >( 'Order', orderSchema )

export { Order }