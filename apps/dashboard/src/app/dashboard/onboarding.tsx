'use client';

import { useState } from 'react';

interface Props {
  name: string;
  email: string;
  apiKey: string;
  fleetId: string;
  fleetToken: string | null;
  report: Record<string, unknown> | null;
  isNew: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="ml-2 shrink-0 px-3 py-1.5 text-xs font-mono rounded-md border transition-all cursor-pointer"
      style={{
        borderColor: copied ? '#3FE0A0' : '#1B2740',
        color: copied ? '#3FE0A0' : '#A9B8D4',
        background: copied ? 'rgba(63,224,160,.08)' : 'transparent',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-mono tracking-[.12em] uppercase" style={{ color: '#6B7C9E' }}>{label}</p>
      <div className="flex items-center rounded-lg px-4 py-3" style={{ background: '#070B14', border: '1px solid #15203A' }}>
        <code className="text-sm font-mono flex-1 break-all" style={{ color: '#38E1FF' }}>{code}</code>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg p-4" style={{ background: '#070B14', border: '1px solid #15203A' }}>
      <p className="text-[11px] font-mono tracking-[.12em] uppercase" style={{ color: '#6B7C9E' }}>{label}</p>
      <p className="text-2xl font-display font-bold mt-1" style={{ color: '#EAF1FF' }}>{value}</p>
    </div>
  );
}

export function Onboarding({ name, email, apiKey, fleetId, fleetToken, report, isNew }: Props) {
  const [showKey, setShowKey] = useState(isNew);

  return (
    <div className="min-h-screen font-sans" style={{ background: '#070B14', color: '#EAF1FF' }}>
      {/* Header — matches whiteroom.tech nav */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(7,11,20,.74)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #15203A' }}>
        <nav className="max-w-[1200px] mx-auto flex items-center justify-between h-[66px] px-7">
          <a href="https://whiteroom.tech" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <svg className="shrink-0" width="30" height="42" viewBox="0 0 22 30" fill="none"><defs><linearGradient id="wr-lit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7AECFF"/><stop offset="1" stopColor="#22C8EC"/></linearGradient></defs><rect x=".5" y=".5" width="21" height="29" rx="3" fill="#EAF1FF"/><rect x="3" y="3" width="7" height="11" fill="#0B1018"/><rect x="12" y="3" width="7" height="11" fill="url(#wr-lit)"/><rect x="3" y="16" width="7" height="11" fill="#0B1018"/><rect x="12" y="16" width="7" height="11" fill="#0B1018"/></svg>
            <span className="font-sans font-black text-[32px] leading-none" style={{ letterSpacing: '-.02em' }}>
              <span style={{ color: '#EAF1FF' }}>White</span>
              <span style={{ color: '#38E1FF' }}>Room</span>
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a href="https://whiteroom.tech/#how" className="text-sm transition-colors hover:text-[#EAF1FF]" style={{ color: '#A9B8D4', textDecoration: 'none' }}>How it works</a>
            <a href="https://whiteroom.tech/docs.html" className="text-sm transition-colors hover:text-[#EAF1FF]" style={{ color: '#A9B8D4', textDecoration: 'none' }}>Docs</a>
            <span className="text-sm" style={{ color: '#6B7C9E' }}>{email}</span>
            <a
              href="/auth/sign-out"
              className="inline-flex items-center justify-center h-[38px] px-5 rounded-lg text-sm font-semibold transition-all hover:border-[#38E1FF] hover:text-[#38E1FF]"
              style={{ border: '1px solid #1B2740', color: '#EAF1FF', textDecoration: 'none', fontFamily: "'Chakra Petch', sans-serif" }}
            >
              Sign out
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-[1200px] mx-auto px-7 py-14 space-y-10">
        {/* Welcome banner */}
        {isNew ? (
          <div className="rounded-xl p-6" style={{ border: '1px solid rgba(63,224,160,.2)', background: 'rgba(63,224,160,.04)' }}>
            <h2 className="text-xl font-display font-bold" style={{ color: '#3FE0A0' }}>
              Welcome, {name}
            </h2>
            <p className="text-sm mt-1.5" style={{ color: '#A9B8D4' }}>
              Your fleet has been provisioned. Save your API key below — you&apos;ll need it to connect your agents.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-display font-bold">Welcome back, {name}</h2>
            <p className="text-sm mt-1" style={{ color: '#6B7C9E' }}>Fleet: <span className="font-mono">{fleetId}</span></p>
          </div>
        )}

        {/* API Key section */}
        <section className="rounded-xl p-6 space-y-4" style={{ background: '#0A1020', border: '1px solid #1B2740' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono tracking-[.28em] uppercase font-medium" style={{ color: '#A9B8D4' }}>Your API Key</h3>
            <button
              onClick={() => setShowKey(!showKey)}
              className="text-xs font-mono transition-colors cursor-pointer"
              style={{ color: '#6B7C9E' }}
            >
              {showKey ? 'Hide' : 'Reveal'}
            </button>
          </div>
          <div className="flex items-center rounded-lg px-4 py-3" style={{ background: '#070B14', border: '1px solid #15203A' }}>
            <code className="text-sm font-mono flex-1 break-all" style={{ color: '#FFB454' }}>
              {showKey ? apiKey : '•'.repeat(46)}
            </code>
            <CopyButton text={apiKey} />
          </div>
          {fleetToken && (
            <div className="flex items-center rounded-lg px-4 py-3" style={{ background: '#070B14', border: '1px solid #15203A' }}>
              <div className="flex-1">
                <p className="text-[10px] font-mono mb-1" style={{ color: '#4E607F' }}>Fleet Token</p>
                <code className="text-sm font-mono break-all" style={{ color: '#A9B8D4' }}>
                  {showKey ? fleetToken : '•'.repeat(24)}
                </code>
              </div>
              <CopyButton text={fleetToken} />
            </div>
          )}
        </section>

        {/* Quick Start */}
        <section className="rounded-xl p-6 space-y-6" style={{ background: '#0A1020', border: '1px solid #1B2740' }}>
          <h3 className="text-[11px] font-mono tracking-[.28em] uppercase font-medium" style={{ color: '#A9B8D4' }}>Quick Start</h3>

          <div className="space-y-6">
            <div>
              <p className="text-sm mb-3" style={{ color: '#A9B8D4' }}>
                <strong className="font-semibold" style={{ color: '#EAF1FF' }}>Step 1.</strong>{' '}
                Set one environment variable — your existing agent framework runs unchanged.
              </p>
              <div className="space-y-2">
                <CodeBlock label="Anthropic" code="export ANTHROPIC_BASE_URL=https://proxy.whiteroom.tech" />
                <CodeBlock label="OpenAI" code="export OPENAI_BASE_URL=https://proxy.whiteroom.tech/v1" />
              </div>
            </div>

            <div>
              <p className="text-sm mb-3" style={{ color: '#A9B8D4' }}>
                <strong className="font-semibold" style={{ color: '#EAF1FF' }}>Step 2.</strong>{' '}
                Register your first agent.
              </p>
              <CodeBlock label="CLI" code={`npx @whiteroom-ai/cli register --url https://proxy.whiteroom.tech --key ${apiKey} my-agent`} />
            </div>

            <div>
              <p className="text-sm mb-3" style={{ color: '#A9B8D4' }}>
                <strong className="font-semibold" style={{ color: '#EAF1FF' }}>Step 3.</strong>{' '}
                Start a watch — governance is applied automatically.
              </p>
              <CodeBlock label="Start a watch" code={`npx @whiteroom-ai/cli start --url https://proxy.whiteroom.tech --key ${apiKey} my-agent`} />
            </div>

            <div>
              <p className="text-sm mb-3" style={{ color: '#A9B8D4' }}>
                <strong className="font-semibold" style={{ color: '#EAF1FF' }}>Step 4.</strong>{' '}
                Check your fleet status.
              </p>
              <CodeBlock label="Fleet report" code={`npx @whiteroom-ai/cli report --url https://proxy.whiteroom.tech --key ${apiKey}`} />
            </div>
          </div>
        </section>

        {/* Fleet Status (returning users) */}
        {report && (
          <section className="rounded-xl p-6 space-y-4" style={{ background: '#0A1020', border: '1px solid #1B2740' }}>
            <h3 className="text-[11px] font-mono tracking-[.28em] uppercase font-medium" style={{ color: '#A9B8D4' }}>Fleet Status</h3>
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Agents" value={(report as Record<string, unknown>).agentCount as number ?? 0} />
              <StatCard label="Total Tasks" value={((report as Record<string, Record<string, number>>).totals?.tasks) ?? 0} />
              <StatCard
                label="Total Tokens"
                value={`${(((report as Record<string, Record<string, number>>).totals?.tokens ?? 0) / 1000).toFixed(1)}K`}
              />
            </div>
          </section>
        )}

        {/* Footer links — matches whiteroom.tech footer style */}
        <footer className="flex items-center gap-6 pt-4 pb-8">
          {[
            { label: 'Docs', href: 'https://whiteroom.tech/docs.html' },
            { label: 'SDK', href: 'https://whiteroom.tech/docs.html#sdk' },
            { label: 'OpenAPI', href: 'https://whiteroom.tech/openapi.yaml' },
            { label: 'GitHub', href: 'https://github.com/rashadhaque/whiteroom-ai' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors hover:text-[#38E1FF]"
              style={{ color: '#6B7C9E' }}
            >
              {link.label}
            </a>
          ))}
        </footer>
      </main>
    </div>
  );
}
