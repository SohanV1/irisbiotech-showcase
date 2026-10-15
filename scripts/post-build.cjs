const fs = require('fs');
const path = require('path');

const baseDir = fs.existsSync(path.resolve(__dirname, '../dist'))
  ? path.resolve(__dirname, '../dist')
  : path.resolve('dist');

const publicDir = fs.existsSync(path.resolve(__dirname, '../public'))
  ? path.resolve(__dirname, '../public')
  : path.resolve('public');

const routes = [
  'home', 'about', 'farm', 'export', 'export-logistics',
  'export/process', 'export/processes', 'export/markets', 'export/logistics', 'export/quote',
  'quote', 'request-quote', 'quotation', 'contact', 'contact-us', 'inquiry', 'enquiry',
  'flowers', 'flowers/dutch-roses', 'flowers/chrysanthemums',
  'approach', 'facilities', 'cold-storage', 'reviews', 'thank-you', 'landing', 'scene',
  'map-animation', 'journey'
];

const indexPath = path.join(baseDir, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  routes.forEach(r => {
    const dir = path.join(baseDir, r);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
  });

  // Create an instant redirect page for any legacy /sylva access
  const sylvaDir = path.join(baseDir, 'sylva');
  fs.mkdirSync(sylvaDir, { recursive: true });
  const sylvaRedirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/landing/">
  <link rel="canonical" href="https://irisbiotech.co.in/landing/">
  <title>Redirecting to Iris Biotech Landing Page...</title>
  <script>window.location.replace('/landing/');</script>
</head>
<body style="background:#22281f;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
  <p>Redirecting to <a href="/landing/" style="color:#fff;">Iris Biotech 3D Landing Page</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(sylvaDir, 'index.html'), sylvaRedirectHtml);

  // 301 Redirect rules for Netlify
  const redirectsContent = `/sylva    /landing/    301!
/sylva/   /landing/    301!
/sylva/*  /landing/    301!
/*        /index.html  200
`;

  fs.writeFileSync(path.join(baseDir, '_redirects'), redirectsContent);
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, '_redirects'), redirectsContent);
  }

  console.log('Successfully configured redirects and static routes in dist/!');
} else {
  console.log('index.html not found in dist, skipping post-build copy.');
}
