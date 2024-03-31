
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import User from '@/models/userModel';


// email send login is remaining

const sendEmail = async ({email, emailType, userId} : any) =>{
    try {
        // hashing the token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === 'verify'){
           await User.findByIdAndUpdate(userId, {
               $set: {
                   verifyToken: hashedToken,
                   verifyTokenExpiry: Date.now() + 3600000
               }
           })
        } else if (emailType === 'reset'){
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d9ac76e775fded",
                pass: "58e9ac6810e7b5"
            }
        });

        const customMailData = {
            from: 'next@auth.test', // sender address
            to: email,
            subject: emailType === 'verify' ? 'Verification email' : 'Reset password email',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType === 'verify' ? 'verify your email' : 'reset your password'} or copy and past link in blow 
             </br>
             ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
              </p>`
        }

        const emailRes = await transporter.sendMail(customMailData);

        return emailRes
        
    } catch (error : any) {
        throw new Error("Error :", error)
    }

   

}
export default sendEmail;