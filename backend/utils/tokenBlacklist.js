const USE_REDIS = process.env.USE_REDIS === "true";

let client = null;
let inMemoryBlacklist = new Map(); // Fallback cho development

// Initialize Redis nếu được enable
if (USE_REDIS) {
  const redis = require("redis");

  client = redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  client.on("error", (err) => {
    console.error("❌ Redis Client Error:", err.message);
    console.warn(
      "⚠️  Falling back to in-memory blacklist (not recommended for production)"
    );
    client = null; // Disable Redis on error
  });

  client.on("connect", () => {
    console.log("✅ Redis connected successfully");
  });

  client.connect().catch((err) => {
    console.error("❌ Failed to connect to Redis:", err.message);
    console.warn("⚠️  Using in-memory blacklist instead");
    client = null;
  });
} else {
  console.warn(
    "⚠️  Redis is disabled. Using in-memory blacklist (not suitable for production)"
  );
}

// Clean up expired tokens from in-memory storage
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of inMemoryBlacklist.entries()) {
    if (data.expiresAt < now) {
      inMemoryBlacklist.delete(token);
    }
  }
}, 60000); // Clean every minute

// Blacklist a token with a specified TTL (in seconds)
const blacklistToken = async (token, expiresIn) => {
  try {
    if (client) {
      // Use Redis
      await client.setEx(`blacklist:${token}`, expiresIn, "true");
    } else {
      // Use in-memory fallback
      const expiresAt = Date.now() + expiresIn * 1000;
      inMemoryBlacklist.set(token, { expiresAt });
    }
    return true;
  } catch (error) {
    console.error("Error blacklisting token:", error);
    return false;
  }
};

// Check if token is blacklisted
const isTokenBlacklisted = async (token) => {
  try {
    if (client) {
      // Use Redis
      const result = await client.get(`blacklist:${token}`);
      return result === "true";
    } else {
      // Use in-memory fallback
      const data = inMemoryBlacklist.get(token);
      if (!data) return false;

      // Check if expired
      if (data.expiresAt < Date.now()) {
        inMemoryBlacklist.delete(token);
        return false;
      }

      return true;
    }
  } catch (error) {
    console.error("Error checking blacklisted token:", error);
    return false;
  }
};

// Get blacklist stats (for debugging)
const getBlacklistStats = () => {
  if (client) {
    return { type: "redis", connected: client.isReady };
  } else {
    return {
      type: "in-memory",
      size: inMemoryBlacklist.size,
      warning: "Not suitable for production or multi-server deployments",
    };
  }
};

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
  getBlacklistStats,
};
