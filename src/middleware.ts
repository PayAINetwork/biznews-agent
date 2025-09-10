import { paymentMiddleware, Resource, SolanaAddress } from "x402-next";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as Resource;
const payTo = process.env.RESOURCE_WALLET_ADDRESS as SolanaAddress;
const network = "solana-devnet"

export const middleware = paymentMiddleware(
  payTo,
  {
    "/news": {
      price: "$0.05",
      network,
      config: {
        description: "Returns a list of recent new articles that affect business.",
      },
    },
  },
  {
    url: facilitatorUrl,
  },
  {
    appName: "Business News Agent",
    appLogo: "/x402-icon-blue.png",
  },
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/news/:path*"],
};
