/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://main.d1j330gths82ly.amplifyapp.com/:path*',
      },
    ]
  },
  images: {
    domains: ['links.papareact.com' , 'i.ibb.co', 'lh3.googleusercontent.com', 'cdn.sanity.io']
  },
  reactStrictMode: true,
}
