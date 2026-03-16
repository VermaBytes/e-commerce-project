USE vijaysales_db;

-- 1. Categories Insert Kar rahe hain
INSERT INTO categories (name) VALUES 
('Mobiles'), 
('Laptops'), 
('Televisions'), 
('Audio'), 
('Appliances');

-- 2. Products Insert Kar rahe hain
-- Note: category_id 1 = Mobiles, 2 = Laptops, 3 = TVs, etc. (Auto Increment ke hisab se)
INSERT INTO products (name, description, price, category_id, image, stock) VALUES 
('iPhone 15 (128GB)', 'Latest Apple iPhone with A16 Bionic chip, 48MP Camera', 79900, 1, 'https://placehold.co/300x300?text=iPhone+15', 50),
('Samsung Galaxy S24', 'AI powered smartphone, 50MP Camera, 8GB RAM', 65000, 1, 'https://placehold.co/300x300?text=Samsung+S24', 40),
('OnePlus 12', 'Snapdragon 8 Gen 3, 100W Fast Charging', 64999, 1, 'https://placehold.co/300x300?text=OnePlus+12', 30),
('MacBook Air M2', '13.6 inch Liquid Retina Display, 8GB RAM, 256GB SSD', 99900, 2, 'https://placehold.co/300x300?text=MacBook+Air', 15),
('Dell XPS 13', 'Intel Core i7, 16GB RAM, Windows 11 Home', 115000, 2, 'https://placehold.co/300x300?text=Dell+XPS', 10),
('Sony Bravia 43 inch 4K', 'Google TV, HDR, X1 Processor', 45000, 3, 'https://placehold.co/300x300?text=Sony+TV', 20),
('LG 55 inch OLED', 'Self-lit pixels, Dolby Vision IQ', 120000, 3, 'https://placehold.co/300x300?text=LG+OLED', 12),
('JBL Flip 6', 'Portable Bluetooth Speaker, Waterproof', 9999, 4, 'https://placehold.co/300x300?text=JBL+Speaker', 100);

-- 3. Admin User Insert kar rahe hain (Testing ke liye)
-- Password: 'admin123' (Yahan plain text daal rahe hain, testing ke liye theek hai)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@vijaysales.com', 'admin123', 'admin');