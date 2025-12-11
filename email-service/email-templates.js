/**
 * Email templates for the sponsoring flyer feature
 * Matches the site's dark theme with orange accents
 */

const COLORS = {
  background: '#1a1a1a',
  card: '#262626',
  primary: '#E5A033',
  text: '#fafafa',
  muted: '#a3a3a3',
  border: '#404040',
};

/**
 * Admin notification email template
 * Sent to sbr@ga-sb.de when someone requests the flyer
 */
export function getAdminEmailTemplate(userEmail) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Flyer Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: ${COLORS.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: ${COLORS.card}; border-radius: 12px; border: 1px solid ${COLORS.border};">
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: ${COLORS.text};">
                New Sponsoring Flyer Request
              </h1>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: ${COLORS.muted};">
                Someone has requested the sponsoring flyer for the SynBio Reactor Summit.
              </p>
              <div style="background-color: ${COLORS.background}; border-radius: 8px; padding: 20px; margin: 30px 0; border: 1px solid ${COLORS.border};">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: ${COLORS.muted}; text-transform: uppercase; letter-spacing: 0.5px;">
                  Requested by:
                </p>
                <p style="margin: 0; font-size: 18px; font-weight: 600; color: ${COLORS.primary};">
                  ${userEmail}
                </p>
              </div>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: ${COLORS.muted};">
                The confirmation email with the flyer download link has been sent to the requester.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 20px 0 0 0; font-size: 12px; color: ${COLORS.muted}; text-align: center;">
          SynBio Reactor Summit
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * User confirmation email template
 * Sent to the user with the flyer download link
 */
export function getUserEmailTemplate(flyerUrl) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Sponsoring Flyer</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: ${COLORS.background};">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: ${COLORS.card}; border-radius: 12px; border: 1px solid ${COLORS.border};">
          <tr>
            <td style="padding: 40px 30px;">
              <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: ${COLORS.text};">
                Thank You for Your Interest!
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: ${COLORS.muted};">
                We're thrilled that you're interested in sponsoring the <strong style="color: ${COLORS.text};">SynBio Reactor Summit</strong>. Your support helps us bring together the brightest minds in synthetic biology.
              </p>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: ${COLORS.muted};">
                Below you'll find your download link for our detailed sponsorship packages and opportunities. We've carefully crafted sponsorship options that provide excellent visibility and engagement opportunities for your organization.
              </p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="${flyerUrl}" style="display: inline-block; background-color: ${COLORS.primary}; color: ${COLORS.background}; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; transition: background-color 0.2s;">
                  Download Sponsoring Flyer
                </a>
              </div>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: ${COLORS.muted};">
                If you have any questions about sponsorship opportunities or would like to discuss a custom package, please don't hesitate to reach out to us at <a href="mailto:sbr@ga-sb.de" style="color: ${COLORS.primary}; text-decoration: none;">sbr@ga-sb.de</a>.
              </p>
              <p style="margin: 20px 0 0 0; font-size: 14px; line-height: 1.6; color: ${COLORS.muted};">
                We look forward to partnering with you and making the SynBio Reactor Summit an unforgettable experience.
              </p>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: ${COLORS.muted};">
                Best regards,<br>
                <strong style="color: ${COLORS.text};">The SynBio Reactor Summit Team</strong>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 20px 0 0 0; font-size: 12px; color: ${COLORS.muted}; text-align: center;">
          SynBio Reactor Summit
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
