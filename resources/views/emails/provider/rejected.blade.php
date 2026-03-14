<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Update Regarding Your Hirfati Application</title>
    <!--[if mso]>
    <style type="text/css">
        table { border-collapse: collapse; }
        .button-link { padding: 16px 40px !important; }
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
        <tr>
            <td align="center">

                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">

                    <tr>
                        <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 48px 40px 40px 40px; text-align: center;">

                            <!-- Logo -->
                            @if(isset($logoCid) && $logoCid)
                                <img src="{{ $logoCid }}" alt="Hirfati" width="72" height="72" style="width: 72px; height: 72px; border-radius: 18px; border: 3px solid rgba(255,255,255,0.9); box-shadow: 0 10px 25px rgba(0,0,0,0.2); display: block; margin: 0 auto 20px auto;">
                            @else
                                <div style="width: 72px; height: 72px; border-radius: 18px; background: rgba(255,255,255,0.2); border: 3px solid rgba(255,255,255,0.9); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; font-size: 32px; font-weight: 800; color: #ffffff;">H</div>
                            @endif

                            <h1 style="margin: 0; font-size: 32px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                                Hirfati
                            </h1>
                            <p style="margin: 4px 0 0 0; font-size: 12px; color: #cbd5e1; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                                حرفتي
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #ffffff; padding: 40px 40px 0 40px; text-align: center;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background: linear-gradient(135deg, #fef2f2, #fff1f2); border: 1px solid #fecdd3; border-radius: 100px; padding: 8px 20px;">
                                        <span style="font-size: 13px; font-weight: 700; color: #e11d48; letter-spacing: 0.5px;">⚠️ Update on Application</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #ffffff; padding: 32px 40px 40px 40px;">

                            <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; line-height: 1.3;">
                                Hello, {{ $user->first_name ?? 'there' }},
                            </h2>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                Thank you for your interest in joining <strong style="color: #0f172a;">Hirfati</strong> as a professional tasker.
                            </p>

                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                We have carefully reviewed your application. Unfortunately, we are <strong style="color: #e11d48;">unable to approve</strong> your account at this time.
                            </p>

                            @if(!empty($reason))
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                                <tr>
                                    <td style="background: #f8fafc; border-left: 4px solid #e11d48; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                                        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Reason for Rejection:</p>
                                        <p style="margin: 0; font-size: 15px; color: #475569; line-height: 1.6;">
                                            {{ $reason }}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            @else
                            <p style="margin: 0 0 32px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                This decision was made based on our internal quality and verification guidelines. You might be missing some required details or documents.
                            </p>
                            @endif

                            <p style="margin: 0 0 32px 0; font-size: 16px; color: #475569; line-height: 1.7;">
                                Don't worry! You can correct the issues mentioned above and reapply by visiting your dashboard.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 8px 0 32px 0;">
                                        <!--[if mso]>
                                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="{{ config('app.url') }}/dashboard" style="height:56px;v-text-anchor:middle;width:280px;" arcsize="21%" fillcolor="#334155">
                                        <center style="color:#ffffff;font-family:sans-serif;font-size:17px;font-weight:bold;">Go to Dashboard →</center>
                                        </v:roundrect>
                                        <![endif]-->
                                        <!--[if !mso]><!-->
                                        <a href="{{ config('app.url') }}/dashboard" class="button-link" style="background: linear-gradient(135deg, #475569 0%, #334155 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 14px; font-size: 17px; font-weight: 700; display: inline-block; box-shadow: 0 10px 25px -5px rgba(51, 65, 85, 0.4); letter-spacing: 0.3px; mso-hide: all;">
                                            Go to Dashboard →
                                        </a>
                                        <!--<![endif]-->
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="border-top: 1px solid #e2e8f0; padding-top: 24px;">
                                        <p style="margin: 0 0 4px 0; font-size: 15px; color: #475569; line-height: 1.7;">
                                            If you have any questions, feel free to reply to this email.
                                        </p>
                                        <p style="margin: 16px 0 0 0; font-size: 15px; color: #475569;">
                                            Best regards,<br>
                                            <strong style="color: #0f172a;">The Hirfati Team</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #0f172a; padding: 28px 40px; border-top: 1px solid #1e293b;">
                            <p style="margin: 0 0 12px 0; text-align: center; font-size: 13px; color: #64748b;">
                                &copy; {{ date('Y') }} Hirfati Inc. All rights reserved.
                            </p>
                            <p style="margin: 0; text-align: center; font-size: 12px;">
                                <a href="{{ config('app.url') }}/privacy" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Privacy</a>
                                <span style="color: #334155; margin: 0 8px;">•</span>
                                <a href="{{ config('app.url') }}/terms" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Terms</a>
                                <span style="color: #334155; margin: 0 8px;">•</span>
                                <a href="{{ config('app.url') }}/support" style="color: #cbd5e1; text-decoration: none; font-weight: 600;">Support</a>
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
