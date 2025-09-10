## Business News Agent

An AI agent that fetches the most recent US news headlines and filters them for articles that affect existing businesses or create new business opportunities. Access to filtered articles costs $0.10 per request and must be paid via the x402 protocol.

### Key Features
- Fetches US top headlines from NewsAPI
- Uses OpenAI to filter for business-impacting articles
- Protected by x402; pay $0.10 per request

### Requirements
- Node.js 18+
- npm

### Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` and set environment variables:
```bash
# API keys
NEWSAPI_API_KEY=your_newsapi_key
OPENAI_API_KEY=your_openai_key

# x402 configuration
NEXT_PUBLIC_FACILITATOR_URL=https://your-facilitator.example.com
RESOURCE_WALLET_ADDRESS=YourSolanaWalletAddress
```

3. Start the dev server:
```bash
npm run dev
```

### Payments (x402)
This app uses x402 to monetize the `GET /news` endpoint. Clients must follow the x402 flow:
- Initial request may return `402 Payment Required` with instructions
- Client constructs a payment payload and retries with the `X-PAYMENT` header
- On success, the server fulfills the request and returns JSON

Learn how to add x402 to your client and construct the `X-PAYMENT` header here:
[x402 Client Introduction](https://docs.payai.network/x402/clients/introduction)

### API
- Endpoint: `GET /news`
- Description: Returns filtered business-impacting articles from US top headlines
- Pricing: $0.10 per request via x402
- Response (shape):
```json
{
  "articles": [
    {
      "source": { "id": null, "name": "..." },
      "author": "...",
      "title": "...",
      "description": "...",
      "url": "https://...",
      "urlToImage": "https://...",
      "publishedAt": "2025-01-01T00:00:00Z",
      "content": "..."
    }
  ]
}
```

Notes:
- The endpoint is protected by x402; make sure your client includes payment per the x402 flow
- Headlines are sourced from NewsAPI and filtered by OpenAI using a deterministic prompt

### Development Notes
- Next.js App Router (`src/app`)
- Payments enforced via middleware in `src/middleware.ts`
- News fetching and filtering logic implemented in `src/app/news/route.ts`

### Troubleshooting
- Ensure `NEWSAPI_API_KEY` and `OPENAI_API_KEY` are set
- For x402, verify `NEXT_PUBLIC_FACILITATOR_URL` and `RESOURCE_WALLET_ADDRESS`
- Check server logs for details if filtering returns an empty list

### Reference
- x402 docs: [x402 Client Introduction](https://docs.payai.network/x402/clients/introduction)

