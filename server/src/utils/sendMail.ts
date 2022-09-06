const nodemailer = require("nodemailer");

export const sendEmail = async (email: string, subject: string, message: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: "emmalee.hintz@ethereal.email",
                pass: "4DZxYtyW7t1ESZFdaZ",
            }
        });

        await transporter.sendMail({
            from: "Reset",
            to: email,
            subject: subject,
            text: message,
        });
        console.log("Message sent: %s", message, email, subject);
        
        console.log("Email successfully sent!");
    } catch (error) {
        console.log(error, `Something went wrong!\n${error}`);
    }
};