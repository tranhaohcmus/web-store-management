-- This file will be executed when MySQL container starts for the first time
-- Database and user are already created by environment variables
-- This script is for any additional initialization

-- Set timezone
SET GLOBAL time_zone = '+07:00';

-- Enable event scheduler
SET GLOBAL event_scheduler = ON;

-- Grant additional privileges if needed
GRANT ALL PRIVILEGES ON ecommerce_db.* TO 'ecommerce_user'@'%';
FLUSH PRIVILEGES;
