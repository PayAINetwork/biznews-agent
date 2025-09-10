export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[24px] row-start-2 items-center sm:items-start max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight">BizNews Agent</h1>
        <p className="text-base/7 text-center sm:text-left">
          An AI agent that fetches the most recent news headlines and filters them
          for articles that affect business.
        </p>
        <p className="text-base/7">
          <span className="font-semibold">Pricing:</span> Access these articles for <span className="font-mono">$0.05</span> per request, paid via the x402 protocol.
        </p>
        <div className="rounded-lg border border-black/[.08] dark:border-white/[.145] p-4 bg-white dark:bg-black/20 w-full">
          <p className="text-sm/6 text-neutral-600 dark:text-neutral-300">Make a request (requires x402 payment):</p>
          <div className="mt-2 font-mono text-sm">
            <code className="bg-black/[.05] dark:bg-white/[.06] px-2 py-1 rounded">GET /news</code>
          </div>
        </div>
        <p className="text-sm/6 text-neutral-600 dark:text-neutral-300">
          Learn how to include payment information in a GET request in the{' '}
          <a
            className="underline hover:no-underline"
            href="https://docs.payai.network/x402/clients/introduction"
            target="_blank"
            rel="noreferrer"
          >
            x402 Client Introduction
          </a>
          .
        </p>
      </main>
      <footer className="row-start-3 text-center text-sm text-neutral-600 dark:text-neutral-300">
        Powered by an AI-first news workflow. More features coming soon.
      </footer>
    </div>
  );
}
