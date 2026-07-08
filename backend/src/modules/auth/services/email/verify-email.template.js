const verifyEmailTemplate = ({ fullName, otp }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </head>

      <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
          <tr>
            <td align="center">

              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;">

                <tr>
                  <td align="center">
                    <h1 style="color:#2563eb;margin:0;">
                      JobOrbit
                    </h1>

                    <p style="color:#666;">
                      Job Journey Management Platform
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:30px;">

                    <h2>Hello ${fullName},</h2>

                    <p style="color:#555;line-height:1.7;">
                      Welcome to JobOrbit. Please verify your email address to activate your account.
                    </p>

                    <p style="color:#555;line-height:1.7;">
                      Use the following OTP code to confirm your email.
                    </p>

                    <div style="text-align:center;margin:40px 0;">
                      <div
                        style="
                          background:#f0f4ff;
                          color:#2563eb;
                          padding:20px 40px;
                          border-radius:12px;
                          display:inline-block;
                          font-size:32px;
                          font-weight:bold;
                          letter-spacing:8px;
                          border: 2px dashed #2563eb;
                        "
                      >
                        ${otp}
                      </div>
                    </div>

                    <p style="color:#555;">
                      This code will expire in 15 minutes for your security.
                    </p>

                    <p style="color:#555;">
                      If you did not create a JobOrbit account, you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-top:30px;font-size:12px;color:#888;">
                    © ${new Date().getFullYear()} JobOrbit. All rights reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
};

module.exports = verifyEmailTemplate;
