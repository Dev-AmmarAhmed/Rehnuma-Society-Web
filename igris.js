/**
 * IGRIS ENGINE (v1.0.0) - REHNUMA SECURITY & CACHE SYSTEM
 * - Hardware-grade AES-GCM 256-bit Encryption
 * - Inactivity Watchdog & Background Lock Trigger
 * - Service Worker Controller & Cache Purge
 */

class IgrisEngine {
  constructor() {
    this.cryptoKey = null;
    this.inactivityLimit = 3 * 60 * 1000; // 3 Minutes default auto-lock
    this.inactivityTimer = null;
    this.onLockRequiredCallback = null;
    this.version = "1.0.0-PROD";
  }

  // --- 1. SERVICE WORKER CONTROLLER ---
  async initServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[IGRIS] Service Worker registered successfully. Scope:', registration.scope);
        return registration;
      } catch (err) {
        console.error('[IGRIS] Service Worker registration failed:', err);
        return null;
      }
    }
    return null;
  }

  // Purge all browser cache storage
  async purgeAllCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('[IGRIS] All offline caches successfully purged.');
      return true;
    }
    return false;
  }

  // --- 2. AES-GCM 256-BIT CRYPTO VAULT ---
  // PIN ya user secret se encryption key derive karta hai
  async deriveKeyFromSecret(secretPhrase) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(secretPhrase),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    const salt = enc.encode("rehnuma_mdb_salt_2026");

    this.cryptoKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );

    return true;
  }

  // Encrypt and store data in localStorage
  async setSecure(key, rawData) {
    if (!this.cryptoKey) throw new Error("Igris Vault is locked. Key required.");

    const enc = new TextEncoder();
    const encodedData = enc.encode(JSON.stringify(rawData));
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit random IV

    const cipherBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      this.cryptoKey,
      encodedData
    );

    const payload = {
      iv: Array.from(iv),
      cipher: Array.from(new Uint8Array(cipherBuffer))
    };

    localStorage.setItem(`igris_${key}`, JSON.stringify(payload));
  }

  // Retrieve and decrypt data from localStorage
  async getSecure(key) {
    if (!this.cryptoKey) return null;

    const raw = localStorage.getItem(`igris_${key}`);
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      const iv = new Uint8Array(payload.iv);
      const cipher = new Uint8Array(payload.cipher);

      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv },
        this.cryptoKey,
        cipher
      );

      const dec = new TextDecoder();
      return JSON.parse(dec.decode(decryptedBuffer));
    } catch (err) {
      console.error("[IGRIS] Tampered or invalid ciphertext:", err);
      return null;
    }
  }

  // Wipe all sensitive encrypted items
  clearSecureVault() {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("igris_")) {
        localStorage.removeItem(k);
      }
    });
    this.cryptoKey = null;
  }

  // --- 3. AUTO-LOCK WATCHDOG ---
  initWatchdog(onLockCallback) {
    this.onLockRequiredCallback = onLockCallback;

    const pingActivity = () => {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = setTimeout(() => {
        this.triggerLock("inactivity_timeout");
      }, this.inactivityLimit);
    };

    ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
      window.addEventListener(evt, pingActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(this.inactivityTimer);
      } else if (document.visibilityState === "visible") {
        this.triggerLock("tab_visibility_return");
      }
    });

    pingActivity();
  }

  triggerLock(reason) {
    if (typeof this.onLockRequiredCallback === "function") {
      this.onLockRequiredCallback(reason);
    }
  }
}

export const igris = new IgrisEngine();
export default igris;
