import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // per user rate limit if authentication exists
    try {
        const {success} = await ratelimit.limit("my-rate-limit"); 
        // currently, if one user goes over the ratelimit, it also affects all other users

        if(!success) {
            return res.status(429).json({ // 429 is the rate limit error code
                message: "Too many requests, please try again later"
            })
        }

        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
    
}

export default rateLimiter;