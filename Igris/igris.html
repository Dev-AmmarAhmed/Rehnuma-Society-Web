<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Igris Engine | Security & Diagnostics</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'media',
      theme: {
        extend: {
          colors: {
            brand: { 500: '#0F766E', 600: '#0D9488', 700: '#115E59' }
          }
        }
      }
    };
  </script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-4 md:p-8 font-mono">

  <div class="max-w-2xl mx-auto space-y-6">

    <!-- HEADER -->
    <header class="flex justify-between items-center border-b border-slate-800 pb-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <h1 class="text-xl font-bold tracking-wider text-teal-400">IGRIS ENGINE CONSOLE</h1>
        </div>
        <p class="text-xs text-slate-500 mt-1">Rehnuma Society Core Security & Cache Monitor</p>
      </div>
      <a href="/" class="text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 transition">Portal Home</a>
    </header>

    <!-- STATUS OVERVIEW -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
        <span class="text-slate-500 block">Engine Core</span>
        <span class="text-emerald-400 font-bold">ONLINE</span>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
        <span class="text-slate-500 block">Encryption</span>
        <span class="text-teal-400 font-bold">AES-GCM-256</span>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
        <span class="text-slate-500 block">Service Worker</span>
        <span id="sw-status-badge" class="text-amber-400 font-bold">CHECKING...</span>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-1">
        <span class="text-slate-500 block">Vault State</span>
        <span id="vault-status-badge" class="text-rose-400 font-bold">LOCKED</span>
      </div>
    </div>

    <!-- MODULE 1: CACHE MANAGEMENT -->
    <section class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-sm font-bold text-slate-200 uppercase tracking-wider">Cache & Storage Controller</h2>
          <p class="text-xs text-slate-500">Manage offline caches, assets, and service worker states</p>
        </div>
        <button id="btn-purge-cache" class="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500 text-rose-300 text-xs font-bold rounded-lg transition">
          Purge App Cache
        </button>
      </div>
      <div id="cache-log" class="text-[11px] p-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 max-h-24 overflow-y-auto">
        Ready to monitor cache instances.
      </div>
    </section>

    <!-- MODULE 2: CRYPTO VAULT BENCHMARK & TEST -->
    <section class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
      <div>
        <h2 class="text-sm font-bold text-slate-200 uppercase tracking-wider">AES-GCM Vault Simulation</h2>
        <p class="text-xs text-slate-500">Test client-side encryption and decryption handshake</p>
      </div>

      <div class="space-y-2">
        <input type="password" id="vault-test-pin" maxlength="6" placeholder="Enter 6-digit test PIN" class="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none" />
        <div class="flex space-x-2">
          <button id="btn-unlock-vault" class="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition">Derive Key & Unlock</button>
          <button id="btn-lock-vault" class="px-4 py-2 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-800 transition">Lock Vault</button>
        </div>
      </div>

      <div id="crypto-output" class="text-[11px] p-3 rounded-lg bg-slate-950 text-slate-400 border border-slate-800 space-y-1 break-all">
        Vault inactive. Enter a PIN to derive AES-256 key.
      </div>
    </section>

    <!-- MODULE 3: SYSTEM AUDIT & LOGS -->
    <section class="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
      <h2 class="text-sm font-bold text-slate-200 uppercase tracking-wider">Live Security Watchdog Log</h2>
      <div id="watchdog-log" class="text-[11px] p-3 rounded-lg bg-slate-950 text-emerald-400 border border-slate-800 font-mono space-y-1 max-h-36 overflow-y-auto">
        <div>[SYSTEM_INIT] Igris watchdog active. Listening for events...</div>
      </div>
    </section>

  </div>

  <script type="module">
    import { igris } from "../igris.js";

    // 1. Initialize SW & Read Status
    igris.initServiceWorker().then(reg => {
      const swBadge = document.getElementById("sw-status-badge");
      if (reg) {
        swBadge.textContent = "REGISTERED";
        swBadge.className = "text-emerald-400 font-bold";
        appendCacheLog(`Service Worker active on scope: ${reg.scope}`);
      } else {
        swBadge.textContent = "INACTIVE";
        swBadge.className = "text-slate-500 font-bold";
      }
    });

    // 2. Cache Logger
    function appendCacheLog(msg) {
      const box = document.getElementById("cache-log");
      box.innerHTML += `<div class="mt-1">• ${msg}</div>`;
      box.scrollTop = box.scrollHeight;
    }

    document.getElementById("btn-purge-cache").addEventListener("click", async () => {
      const purged = await igris.purgeAllCaches();
      appendCacheLog(purged ? "All cached shell assets cleared." : "No cache found to purge.");
    });

    // 3. Crypto Vault Handshake Test
    const pinInput = document.getElementById("vault-test-pin");
    const vaultBadge = document.getElementById("vault-status-badge");
    const cryptoOutput = document.getElementById("crypto-output");

    document.getElementById("btn-unlock-vault").addEventListener("click", async () => {
      const pin = pinInput.value.trim();
      if (pin.length !== 6) {
        alert("Please enter a valid 6-digit PIN.");
        return;
      }

      await igris.deriveKeyFromSecret(pin);
      vaultBadge.textContent = "UNLOCKED";
      vaultBadge.className = "text-emerald-400 font-bold";

      // Test Encrypt / Decrypt cycle
      const testData = { system: "Rehnuma", timestamp: Date.now() };
      await igris.setSecure("diag_test", testData);
      const decrypted = await igris.getSecure("diag_test");

      cryptoOutput.innerHTML = `
        <span class="text-teal-400">STATUS: Key Derived Successfully</span><br>
        <span class="text-slate-500">Stored Payload:</span> ${localStorage.getItem("igris_diag_test")}<br>
        <span class="text-emerald-400">Decrypted Verification:</span> ${JSON.stringify(decrypted)}
      `;
    });

    document.getElementById("btn-lock-vault").addEventListener("click", () => {
      igris.clearSecureVault();
      vaultBadge.textContent = "LOCKED";
      vaultBadge.className = "text-rose-400 font-bold";
      cryptoOutput.innerHTML = "Vault locked. Memory keys wiped.";
      pinInput.value = "";
    });

    // 4. Watchdog Logging
    function appendWatchdogLog(msg) {
      const box = document.getElementById("watchdog-log");
      const time = new Date().toLocaleTimeString();
      box.innerHTML += `<div>[${time}] ${msg}</div>`;
      box.scrollTop = box.scrollHeight;
    }

    igris.initWatchdog((reason) => {
      appendWatchdogLog(`SECURITY ALERT: Lock condition triggered (${reason})`);
    });
  </script>
</body>
</html>
