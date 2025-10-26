import nodemailer from 'nodemailer';

interface OrderEmailData {
  to: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsList = data.items
    .map(
      (item) =>
        `<li>${item.productName} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    )
    .join('');

  const deliveryInfo =
    data.deliveryMethod === 'delivery' && data.deliveryAddress
      ? `
      <h3>Delivery Address:</h3>
      <p>
        ${data.deliveryAddress.street}<br>
        ${data.deliveryAddress.city}, ${data.deliveryAddress.zipCode}<br>
        ${data.deliveryAddress.country}
      </p>
      <p><strong>Estimated delivery time:</strong> 30-45 minutes</p>
    `
      : `
      <h3>Pickup Information:</h3>
      <p>
        <strong>Location:</strong> 361Degustation<br>
        123 Sushi Street, Tokyo District<br>
        San Francisco, CA 94102
      </p>
      <p><strong>Estimated ready time:</strong> 20-30 minutes</p>
    `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #dc2626, #d4af37);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .order-number {
            font-size: 24px;
            font-weight: bold;
            color: #d4af37;
            margin: 20px 0;
          }
          .items-list {
            background: white;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
            color: #dc2626;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>361Degustation</h1>
            <p>Thank you for your order!</p>
          </div>
          <div class="content">
            <p>Dear ${data.customerName},</p>
            <p>Your order has been successfully placed and is being prepared with care.</p>
            
            <div class="order-number">
              Order #${data.orderNumber}
            </div>

            <div class="items-list">
              <h3>Order Details:</h3>
              <ul>
                ${itemsList}
              </ul>
              <div class="total">Total: $${data.totalAmount.toFixed(2)}</div>
            </div>

            ${deliveryInfo}

            <p>
              You can track your order status by visiting your account on our website.
            </p>

            <p>
              If you have any questions, please don't hesitate to contact us at 
              <a href="mailto:info@361degustation.com">info@361degustation.com</a> 
              or call us at +1 (555) 361-3610.
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} 361Degustation. All rights reserved.</p>
            <p>Beyond Perfection</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: `361Degustation <${process.env.EMAIL_USER}>`,
    to: data.to,
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent to:', data.to);
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error);
    throw error;
  }
}

