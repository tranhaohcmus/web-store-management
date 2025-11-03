const NodeClam = require("clamscan");

class VirusScanner {
  // Singleton instance
  static instance = null;
  static initPromise = null;

  /**
   * Get or initialize ClamAV scanner instance (singleton)
   */
  static async getInstance() {
    // Return cached instance if available
    if (this.instance) {
      return this.instance;
    }

    // If initialization is in progress, wait for it
    if (this.initPromise) {
      return this.initPromise;
    }

    // Initialize new instance
    this.initPromise = (async () => {
      try {
        this.instance = await new NodeClam().init({
          clamdscan: {
            host: process.env.CLAMAV_HOST || "localhost",
            port: process.env.CLAMAV_PORT || 3310,
          },
          preference: "clamdscan", // Use daemon for better performance
        });

        console.log("✅ ClamAV scanner initialized");
        return this.instance;
      } catch (error) {
        console.error("❌ Failed to initialize ClamAV:", error.message);
        this.instance = null;
        this.initPromise = null;
        throw error;
      }
    })();

    return this.initPromise;
  }

  /**
   * Scan file for viruses
   * @param {string} filePath - Path to file to scan
   * @returns {Promise<boolean>} True if file is clean
   * @throws {Error} If virus detected or scan failed
   */
  static async scan(filePath) {
    try {
      const scanner = await this.getInstance();
      const { isInfected, viruses } = await scanner.isInfected(filePath);

      if (isInfected) {
        const virusList = viruses.join(", ");
        console.error(`🦠 Virus detected in ${filePath}: ${virusList}`);
        throw new Error(`Virus detected: ${virusList}`);
      }

      console.log(`✅ File ${filePath} is clean`);
      return true;
    } catch (error) {
      // Re-throw virus detection errors
      if (error.message.startsWith("Virus detected")) {
        throw error;
      }

      // Log other errors but don't block upload if ClamAV is unavailable
      console.error("⚠️ Virus scan failed:", error.message);

      // In production, you might want to block uploads if scan fails
      if (process.env.STRICT_VIRUS_SCAN === "true") {
        throw new Error("Virus scan failed. Upload blocked for security.");
      }

      // In development, allow upload to continue with warning
      console.warn(
        "⚠️ Upload allowed despite scan failure (STRICT_VIRUS_SCAN is not enabled)"
      );
      return true;
    }
  }

  /**
   * Check if scanner is available
   * @returns {Promise<boolean>} True if scanner is ready
   */
  static async isAvailable() {
    try {
      await this.getInstance();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Reset scanner instance (useful for testing or reconnection)
   */
  static reset() {
    this.instance = null;
    this.initPromise = null;
    console.log("🔄 ClamAV scanner reset");
  }
}

module.exports = VirusScanner;
