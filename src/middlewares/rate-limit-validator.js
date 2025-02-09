import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs : 15*60*1000,
    maxPoolSize: 50,
})

export default apiLimiter