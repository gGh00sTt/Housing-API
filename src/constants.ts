
export const envVars = {
    PORT: Number(process.env.PORT),
    PGDATABASE: String(process.env.PGDATABASE),
    PGUSER: String(process.env.PGUSER),
    PGPASSWORD: String(process.env.PGPASSWORD),
    PGHOST:String(process.env.PGHOST),
    REDISHOST:String(process.env.REDISHOST),
    REDISPORT:Number(process.env.REDISPORT),
    REDISPASSWORD:String(process.env.REDISPASSWORD),
    JWT_TOKEN:String(process.env.JWT_TOKEN),
    JWT_LIFETIME:String(process.env.JWT_LIFETIME),
    SERVER_HOST:String(process.env.SERVER_HOST)
}
