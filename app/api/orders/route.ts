import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const query = session.user.role === 'admin' 
      ? {} 
      : { user: session.user.id };

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await req.json();

    const order = await Order.create({
      user: session.user.id,
      ...data,
      paymentStatus: 'paid',
      status: 'pending',
    });

    // Send confirmation email
    try {
      await sendOrderConfirmationEmail({
        to: data.customerEmail,
        orderNumber: order.orderNumber,
        customerName: data.customerName,
        items: data.items,
        totalAmount: data.totalAmount,
        deliveryMethod: data.deliveryMethod,
        deliveryAddress: data.deliveryAddress,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

