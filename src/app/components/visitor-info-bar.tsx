"use client";

import { useEffect, useState } from "react";

// Regional timezone abbreviation map for common IANA zones
const TIMEZONE_ABBREVIATIONS: Record<string, string> = {
  "Europe/Istanbul": "TRT",
  "Asia/Kuala_Lumpur": "MYT",
  "Asia/Singapore": "SGT",
  "Asia/Tokyo": "JST",
  "Asia/Seoul": "KST",
  "Asia/Hong_Kong": "HKT",
  "Asia/Bangkok": "ICT",
  "Asia/Jakarta": "WIB",
  "Asia/Dubai": "GST",
  "Europe/London": "GMT",
  "Europe/Paris": "CET",
  "Europe/Berlin": "CET",
  "Europe/Rome": "CET",
  "Europe/Madrid": "CET",
  "Europe/Amsterdam": "CET",
};

/**
 * Calculates the exact UTC offset string (e.g. "UTC+3", "UTC+8", "UTC-4", "UTC+5:30")
 */
function getUtcOffsetString(date: Date, timeZone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const getPart = (type: string) =>
      parts.find((p) => p.type === type)?.value || "0";

    const targetDate = new Date(
      Date.UTC(
        Number.parseInt(getPart("year"), 10),
        Number.parseInt(getPart("month"), 10) - 1,
        Number.parseInt(getPart("day"), 10),
        Number.parseInt(getPart("hour"), 10) % 24,
        Number.parseInt(getPart("minute"), 10),
        Number.parseInt(getPart("second"), 10)
      )
    );

    const diffMinutes = Math.round(
      (targetDate.getTime() - date.getTime()) / 60000
    );
    const diffHours = diffMinutes / 60;
    const sign = diffHours >= 0 ? "+" : "-";
    const absHours = Math.floor(Math.abs(diffHours));
    const absMins = Math.abs(diffMinutes % 60);

    if (absMins === 0) {
      return `UTC${sign}${absHours}`;
    }
    return `UTC${sign}${absHours}:${absMins.toString().padStart(2, "0")}`;
  } catch {
    return "UTC";
  }
}

/**
 * Formats timezone into "ABBR (UTC±X)" or "UTC±X"
 */
function formatTimezoneDisplay(date: Date, timeZone: string): string {
  let abbr = "";
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(date);
    abbr = parts.find((p) => p.type === "timeZoneName")?.value || "";
  } catch {
    abbr = "";
  }

  if (TIMEZONE_ABBREVIATIONS[timeZone]) {
    abbr = TIMEZONE_ABBREVIATIONS[timeZone];
  }

  const offset = getUtcOffsetString(date, timeZone);

  if (abbr && offset && abbr !== offset) {
    return `${abbr} (${offset})`;
  }
  return abbr || offset;
}

export function VisitorInfoBar() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const [timeZone, setTimeZone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  });

  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [visitorStatus, setVisitorStatus] = useState<
    "loading" | "success" | "unavailable"
  >("loading");

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    // 1. Live ticking clock every second
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    // 2. Timezone: Safe client-side fallback while IP-based timezone architecture is decided separately
    // Preserves local time calculation and timezone display without server route dependency
    let isCancelled = false;
    function initTimezone() {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detected && !isCancelled) {
          setTimeZone(detected);
        }
      } catch {
        // Keeps default UTC fallback if Intl is unavailable
      }
    }

    // 3. Visitor counter: Fetch visits count from AWS API Gateway backend
    async function loadVisitorCount() {
      const apiUrl = process.env.NEXT_PUBLIC_VISITOR_API_URL;
      if (!apiUrl) {
        if (!isCancelled) {
          setVisitorStatus("unavailable");
        }
        return;
      }

      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          // AWS API Gateway returns JSON format: { "visits": 3 }
          const visits =
            typeof data?.visits === "number"
              ? data.visits
              : typeof data?.count === "number"
                ? data.count
                : null;

          if (!isCancelled && visits !== null && !Number.isNaN(visits)) {
            setVisitorCount(visits);
            setVisitorStatus("success");
            return;
          }
        }
        if (!isCancelled) {
          setVisitorStatus("unavailable");
        }
      } catch {
        if (!isCancelled) {
          setVisitorStatus("unavailable");
        }
      }
    }

    initTimezone();
    loadVisitorCount();

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Format visitor counter string
  let visitorText = "Visitors ···";
  if (visitorStatus === "success" && visitorCount !== null) {
    visitorText = `${visitorCount.toLocaleString()} visitors`;
  } else if (visitorStatus === "unavailable") {
    visitorText = "— visitors";
  }

  // Format time, date, and timezone
  let timeText = "--:--:--";
  let dateText = "--";
  let tzText = "UTC";

  if (mounted) {
    try {
      timeText = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const day = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        day: "numeric",
      }).format(now);
      const month = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        month: "long",
      }).format(now);
      const year = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        year: "numeric",
      }).format(now);
      dateText = `${day} ${month} ${year}`;

      tzText = formatTimezoneDisplay(now, timeZone);
    } catch {
      timeText = now.toTimeString().split(" ")[0] || "--:--:--";
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-muted-foreground/80 print:hidden"
      aria-live="polite"
    >
      <span>{visitorText}</span>
      <span className="text-muted-foreground/40 select-none" aria-hidden="true">
        ·
      </span>
      <span className="tabular-nums">{timeText}</span>
      <span className="text-muted-foreground/40 select-none" aria-hidden="true">
        ·
      </span>
      <span>{dateText}</span>
      <span className="text-muted-foreground/40 select-none" aria-hidden="true">
        ·
      </span>
      <span>{tzText}</span>
    </div>
  );
}
