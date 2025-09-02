-- schema.sql

-- Internet packages
CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration_value INT NOT NULL,
  duration_unit VARCHAR(10) NOT NULL,
  description TEXT
);

-- Vouchers
CREATE TABLE IF NOT EXISTS vouchers (
  code VARCHAR(50) PRIMARY KEY,
  package_id INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activated_at TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (package_id) REFERENCES packages(id)
);

-- Sessions (usage tracking)
CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voucher_code VARCHAR(50),
  start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_time TIMESTAMP,
  data_used_mb INT DEFAULT 0,
  ip_address VARCHAR(45),
  device_mac VARCHAR(17),
  FOREIGN KEY (voucher_code) REFERENCES vouchers(code)
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voucher_code VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  method VARCHAR(50),
  FOREIGN KEY (voucher_code) REFERENCES vouchers(code)
);
