'use client';

import { useEffect, useMemo, useState } from 'react';

import { isLive } from '@/lib/cms-mapping.mjs';
import type { Offer } from '@/lib/content-types';

// setTimeout can't wait longer than ~24.8 days; longer waits are simply split up.
const MAX_TIMER_MS = 2 ** 31 - 1;

/**
 * Hides offers whose event date has passed, in the visitor's browser, without any rebuild:
 *
 *  - The static HTML only contains offers that were still live at build time (`builtAt`). The first
 *    render uses that same moment, so server and client output match and hydration is clean.
 *  - Right after hydration the real clock is applied, which removes events that expired since the
 *    last build (a stale page), and a timer removes the next one at the exact second it expires,
 *    even if the page stays open over midnight.
 *
 * The scheduled rebuild (see /scheduler) then also removes them from the HTML itself.
 * With `enabled = false` (the editor preview) offers are shown as they are.
 */
export function useLiveOffers(offers: Offer[], builtAt: string, enabled = true): Offer[] {
  const [now, setNow] = useState(() => Date.parse(builtAt));

  // Only the expiry times matter for scheduling, so a new array with the same times doesn't restart the timer.
  const expiryKey = offers
    .map((o) => o.expiresAt)
    .filter(Boolean)
    .join('|');

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      clearTimeout(timer);
      const current = Date.now();
      setNow(current);
      const next = expiryKey
        .split('|')
        .filter(Boolean)
        .map((at) => Date.parse(at))
        .filter((at) => at > current)
        .sort((a, b) => a - b)[0];
      // +250 ms so the clock is safely past the expiry when the timer fires.
      if (next) timer = setTimeout(tick, Math.min(next - current + 250, MAX_TIMER_MS));
    };

    // Timers are paused or throttled in background tabs; re-check when the visitor comes back.
    const onVisible = () => document.visibilityState === 'visible' && tick();
    tick();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [expiryKey, enabled]);

  return useMemo(() => (enabled ? offers.filter((o) => isLive(o, now)) : offers), [offers, now, enabled]);
}
