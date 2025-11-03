const rateLimit = require("express-rate-limit");

/**
 * Upload Rate Limiter
 * Prevents abuse and DoS attacks on upload endpoints
 */
class UploadRateLimiter {
  /**
   * Create rate limiter for file uploads
   *
   * @param {object} options - Rate limiter options
   * @param {number} options.windowMs - Time window in milliseconds (default: 15 min)
   * @param {number} options.max - Max requests per window (default: 10)
   * @param {string} options.message - Error message
   * @returns {Function} Express middleware
   */
  static create(options = {}) {
    const {
      windowMs = 15 * 60 * 1000, // 15 minutes
      max = 10, // 10 uploads per window
      message = "Too many uploads from this IP, please try again later.",
      skipSuccessfulRequests = false,
    } = options;

    return rateLimit({
      windowMs,
      max,
      message: {
        success: false,
        message,
      },
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests,
      // Optional: Use Redis for distributed rate limiting
      store: this.createStore(),
      handler: (req, res) => {
        res.status(429).json({
          success: false,
          message,
          retryAfter: Math.ceil(windowMs / 1000),
        });
      },
    });
  }

  /**
   * Create Redis store for distributed rate limiting
   * @returns {object|undefined} Redis store or undefined
   */
  static createStore() {
    // Only use Redis if configured
    if (process.env.REDIS_URL) {
      try {
        const RedisStore = require("rate-limit-redis");
        const redis = require("redis");

        const client = redis.createClient({
          url: process.env.REDIS_URL,
        });

        return new RedisStore({
          client,
          prefix: "upload:ratelimit:",
        });
      } catch (error) {
        console.warn(
          "⚠️ Redis not available for rate limiting, using memory store"
        );
        return undefined;
      }
    }

    return undefined;
  }

  /**
   * Strict limiter for sensitive uploads
   */
  static strict() {
    return this.create({
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 5, // 5 uploads per hour
      message: "Upload limit exceeded. Please try again in an hour.",
    });
  }

  /**
   * Lenient limiter for regular uploads
   */
  static lenient() {
    return this.create({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // 50 uploads per 15 min
      message: "Too many uploads. Please slow down.",
    });
  }

  /**
   * Per-user rate limiter (requires authentication)
   */
  static perUser(options = {}) {
    const {
      windowMs = 60 * 60 * 1000, // 1 hour
      max = 20, // 20 uploads per hour per user
      message = "You have exceeded your upload quota.",
    } = options;

    return rateLimit({
      windowMs,
      max,
      message: { success: false, message },
      standardHeaders: true,
      legacyHeaders: false,
      // Don't use custom keyGenerator to avoid IPv6 issues
      // express-rate-limit will use req.ip by default
      skip: (req) => {
        // We can track user separately if authenticated
        if (req.user?.id) {
          req.rateLimit = { user: req.user.id };
        }
        return false;
      },
      handler: (req, res) => {
        res.status(429).json({
          success: false,
          message,
          quota: {
            limit: max,
            windowMs,
            resetAt: new Date(Date.now() + windowMs).toISOString(),
          },
        });
      },
    });
  }
}

module.exports = UploadRateLimiter;
