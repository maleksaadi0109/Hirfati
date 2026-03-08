<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Welcome to Hirfati</title>
    <!--[if mso]>
    <style type="text/css">
        table { border-collapse: collapse; }
        .button-link { padding: 16px 40px !important; }
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <!-- Outer wrapper with dark background matching the website right panel -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
        <tr>
            <td align="center">

                <!-- Main Card -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">

                    <!-- ==================== HEADER ==================== -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ea580c 0%, #db2777 50%, #ea580c 100%); padding: 48px 40px 40px 40px; text-align: center;">

                            <!-- Logo -->
                            @if($logoCid)
                                <img src="{{ $logoCid }}" alt="Hirfati" width="72" height="72" style="width: 72px; height: 72px; border-radius: 18px; border: 3px solid rgba(255,255,255,0.9); box-shadow: 0 10px 25px rgba(0,0,0,0.2); display: block; margin: 0 auto 20px auto;">
                            @else
                                <div style="width: 72px; height: 72px; border-radius: 18px; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 32px; font-weight: 800; color: #ffffff;">H</div>
                            @endif

                            <!-- Brand Name -->
                            <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                                Hirfati
                            </h1>
                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #ffedd5; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                                حرفتي
                            </p>
                        </td>
                    </tr>

                    <!-- ==================== WELCOME BADGE ==================== -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 40px 0 40px; text-align: center;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #fff7ed, #fef2f2); border: 1px solid #fed7aa; border-radius: 100px; padding: 8px 20px;">
                                        <span style="font-size: 13px; font-weight: 700; color: #ea580c; letter-spacing: 0.5px;">🎉 Account Created Successfully</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ==================== CONTENT ==================== -->
                    <tr>
                        <td style="background-color: #ffffff; padding: 32px 40px 40px 40px;">

                            <!-- Greeting -->
                            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; line-height: 1.3;">
                                Welcome aboard, {{ $user->first_name ?? 'there' }}! 👋
                            </h2>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                We're thrilled to have you join <strong style="color: #0f172a;">Hirfati</strong> — Libya's premier platform for connecting skilled professionals with clients who need them.
                            </p>

                            <p style="margin: 0 0 32px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                Your journey to mastering your craft and building your future starts right now. Here's what you can do:
                            </p>

                            <!-- Feature Cards -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                                <!-- Feature 1 -->
                                <tr>
                                    <td style="padding-bottom: 12px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fff7ed, #ffffff); border: 1px solid #fed7aa; border-radius: 16px; overflow: hidden;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="vertical-align: top; padding-right: 14px;">
                                                                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #ea580c, #f97316); border-radius: 12px; text-align: center; line-height: 40px; font-size: 18px;">🔍</div>
                                                            </td>
                                                            <td style="vertical-align: top;">
                                                                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Browse Services</p>
                                                                <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Find expert professionals for any job you need done</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- Feature 2 -->
                                <tr>
                                    <td style="padding-bottom: 12px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f0fdf4, #ffffff); border: 1px solid #bbf7d0; border-radius: 16px; overflow: hidden;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="vertical-align: top; padding-right: 14px;">
                                                                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #16a34a, #22c55e); border-radius: 12px; text-align: center; line-height: 40px; font-size: 18px;">⭐</div>
                                                            </td>
                                                            <td style="vertical-align: top;">
                                                                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Complete Your Profile</p>
                                                                <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Add your skills and experience to stand out</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- Feature 3 -->
                                <tr>
                                    <td>
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #eff6ff, #ffffff); border: 1px solid #bfdbfe; border-radius: 16px; overflow: hidden;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <table role="presentation" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td style="vertical-align: top; padding-right: 14px;">
                                                                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #3b82f6); border-radius: 12px; text-align: center; line-height: 40px; font-size: 18px;">🚀</div>
                                                            </td>
                                                            <td style="vertical-align: top;">
                                                                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Start Growing</p>
                                                                <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">Connect with thousands of users across Libya</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 8px 0 32px 0;">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{{ config('app.url') }}/dashboard" style="height:56px;v-text-anchor:middle;width:280px;" arcsize="21%" fillcolor="#ea580c">
                                        <center style="color:#ffffff;font-family:sans-serif;font-size:17px;font-weight:bold;">Go to Dashboard →</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <a href="{{ config('app.url') }}/dashboard" class="button-link" style="background: linear-gradient(135deg, #ea580c 0%, #db2777 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 14px; font-size: 17px; font-weight: 700; display: inline-block; box-shadow: 0 10px 25px -5px rgba(234, 88, 12, 0.4); letter-spacing: 0.3px; mso-hide: all;">
                                            Go to Dashboard →
                                        </a>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
                                        <p style="margin: 0 0 4px 0; font-size: 15px; color: #475569; line-height: 1.7;">
                                            Need help getting started? Just reply to this email — we're always here for you.
                                        </p>
                                        <p style="margin: 16px 0 0 0; font-size: 15px; color: #475569;">
                                            Best regards,<br>
                                            <strong style="color: #0f172a;">The Hirfati Team</strong> 🧡
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <!-- ==================== STATS BAR ==================== -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 24px 40px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="33%" align="center" style="padding: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 800; color: #f97316;">10K+</p>
                                        <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Users</p>
                                    </td>
                                    <td width="33%" align="center" style="padding: 8px; border-left: 1px solid #334155; border-right: 1px solid #334155;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 800; color: #22c55e;">4.9/5</p>
                                        <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Rating</p>
                                    </td>
                                    <td width="33%" align="center" style="padding: 8px;">
                                        <p style="margin: 0; font-size: 20px; font-weight: 800; color: #3b82f6;">Secure</p>
                                        <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Platform</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ==================== FOOTER ==================== -->
                    <tr>
                        <td style="background-color: #0f172a; padding: 28px 40px; border-top: 1px solid #1e293b;">
                            <p style="margin: 0 0 12px 0; text-align: center; font-size: 13px; color: #64748b;">
                                &copy; {{ date('Y') }} Hirfati Inc. All rights reserved.
                            </p>
                            <p style="margin: 0; text-align: center; font-size: 12px;">
                                <a href="{{ config('app.url') }}/privacy" style="color: #f97316; text-decoration: none; font-weight: 600;">Privacy</a>
                                <span style="color: #334155; margin: 0 8px;">•</span>
                                <a href="{{ config('app.url') }}/terms" style="color: #f97316; text-decoration: none; font-weight: 600;">Terms</a>
                                <span style="color: #334155; margin: 0 8px;">•</span>
                                <a href="{{ config('app.url') }}/support" style="color: #f97316; text-decoration: none; font-weight: 600;">Support</a>
                            </p>
                        </td>
                    </tr>

                </table>

                <!-- Unsubscribe note -->
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin-top: 24px;">
                    <tr>
                        <td align="center">
                            <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.6;">
                                You received this email because you created an account on Hirfati.<br>
                                If you didn't create this account, please contact our support team.
                            </p>
                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>

</body>
</html>
