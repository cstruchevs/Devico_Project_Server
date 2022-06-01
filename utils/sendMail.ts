import nodemailer from 'nodemailer'

interface ISendEmail {
    link?: string
    mainInfo: string
    subject: string
    text: string
    email: string
}

const sendEmail = ({email, mainInfo, subject, text, link}: ISendEmail) => {
  let mail = nodemailer.createTransport({
    port: 587,
    service: 'gmail',
    auth: {
      user: 'cstruchevs@gmail.com',
      pass: 'semenDigital20124265000s',
    },
  })
  let mailOptions = {
    from: 'cstruchevs@gmail.com',
    to: `${email}`,
    subject,
    text,
    html: `<p>Click <a href=${link}>here</a> to reset your password</p>`,
  }

  mail.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export default sendEmail
