const verifyEmailTemplate = ({ fullName, verificationUrl }) => {
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
                      Click the button below to confirm your email.
                    </p>

                    <div style="text-align:center;margin:40px 0;">

                      <a
                        href="${verificationUrl}"
                        style="
                          background:#2563eb;
                          color:#ffffff;
                          text-decoration:none;
                          padding:15px 30px;
                          border-radius:6px;
                          display:inline-block;
                          font-weight:bold;
                        "
                      >
                        Verify Email
                      </a>

                    </div>

                    <p style="color:#555;">
                      This link will expire soon for your security.
                    </p>

                    <p style="color:#555;">
                      If you did not create a JobOrbit account, you can safely ignore this email.
                    </p>

                    <hr style="margin:40px 0;">

                    <p style="font-size:13px;color:#999;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>

                    <p style="word-break:break-all;">
                      ${verificationUrl}
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
