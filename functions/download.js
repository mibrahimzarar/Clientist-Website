exports.handler = async (event) => {
  const userAgent = event.headers['user-agent'] || '';
  const host = event.headers.host || 'clientist-app.netlify.app';
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const siteOrigin = `${protocol}://${host}`;

  const config = {
    android_app_id: 'com.clientist.app',
    ios_app_id: '6758582501',
    download_page: `${siteOrigin}/download.html`,
  };

  let redirectUrl;

  try {
    if (userAgent.toLowerCase().includes('android')) {
      redirectUrl = `https://play.google.com/store/apps/details?id=${config.android_app_id}&pli=1`;
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      redirectUrl = `https://apps.apple.com/us/app/clientist/id${config.ios_app_id}`;
    } else {
      redirectUrl = config.download_page;
    }

    return {
      statusCode: 302,
      headers: {
        Location: redirectUrl,
        'Cache-Control': 'no-cache',
      },
      body: '',
    };
  } catch (error) {
    const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download Clientist</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            text-align: center;
            padding: 50px 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        h1 { margin-bottom: 20px; }
        .buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;
        }
        .btn {
            padding: 12px 24px;
            background: #f59e0b;
            color: #1e3a8a;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Clientist</h1>
        <p>Choose your platform to download the app:</p>
        <div class="buttons">
            <a href="https://play.google.com/store/apps/details?id=${config.android_app_id}&pli=1" class="btn">Android App</a>
            <a href="https://apps.apple.com/us/app/clientist/id${config.ios_app_id}" class="btn">iOS App</a>
            <a href="${config.download_page}" class="btn">Download Page</a>
        </div>
    </div>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache',
      },
      body: fallbackHtml,
    };
  }
};
