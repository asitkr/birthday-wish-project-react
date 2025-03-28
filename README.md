# Birthday Reminder System 🎂  

## Features 🚀  
- **Admin Authentication**: Secure login using JWT.  
- **User Management**: Admin can add users with name, email, DOB, and description.  
- **Automated Birthday Emails**: Sends birthday wishes via email using Nodemailer.  
- **Daily Cron Job**: Runs at 9 AM to send birthday notifications automatically.  
- **Manual Email Trigger**: Admin can send emails via an API endpoint.  

## Technologies Used 🛠  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Frontend**: React.js (optional for UI)  
- **Authentication**: JWT (JSON Web Token)  
- **Email Service**: Nodemailer (Gmail SMTP)  
- **Scheduler**: node-cron  

## Installation & Setup ⚙️  
Clone the repo:  
   ```bash
   git clone https://github.com/your-repo.git
   cd your-project

   npm install

### Environment Variables 🌍  
Create a `.env` file in the root directory and add:  

```ini
JWT_SECRET_ACCESS_TOKEN_KEY=your-secret-key
JWT_SECRET_REFRESH_TOKEN_KEY=your-refresh-key
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password



npm start

