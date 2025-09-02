-- seed.sql
INSERT INTO packages (name, price, duration_value, duration_unit, description)
VALUES 
  ('1-Day Pass', 30.00, 1, 'day', 'Valid for 24 hours'),
  ('Weekly Unlimited', 150.00, 7, 'day', 'Unlimited for a week'),
  ('1-month Unlimited', 1000.00, 30, 'day', 'Monthly unlimited');

-- Optional: insert vouchers manually or via backend API
