const resetPasswordTemplate = ({ fullName, resetUrl }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Your Password</title>
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
                      We received a request to reset your password.
                    </p>

                    <p style="color:#555;line-height:1.7;">
                      Click the button below to create a new password.
                    </p>

                    <div style="text-align:center;margin:40px 0;">

                      <a
                        href="${resetUrl}"
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
                        Reset Password
                      </a>

                    </div>

                    <p style="color:#555;">
                      This link will expire soon for your security.
                    </p>

                    <p style="color:#555;">
                      If you didn't request a password reset, you can safely ignore this email.
                    </p>

                    <hr style="margin:40px 0;">

                    <p style="font-size:13px;color:#999;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>

                    <p style="word-break:break-all;">
                      ${resetUrl}
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

module.exports = resetPasswordTemplate;