-- Seed Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, nav_label, priority, is_active) VALUES ('wealth', 'Wealth', 'wealth', 'Money, markets, and investing.', 'Wealth', 1, 1);
INSERT OR IGNORE INTO categories (id, name, slug, description, nav_label, priority, is_active) VALUES ('ai', 'AI', 'ai', 'Artificial Intelligence and machine learning.', 'AI', 2, 1);
INSERT OR IGNORE INTO categories (id, name, slug, description, nav_label, priority, is_active) VALUES ('business', 'Business', 'business', 'Startups, power, and corporate strategy.', 'Business', 3, 1);
INSERT OR IGNORE INTO categories (id, name, slug, description, nav_label, priority, is_active) VALUES ('power', 'Power', 'power', 'Politics, geopolitics, and business power.', 'Power', 4, 1);

-- Seed Author
INSERT OR IGNORE INTO authors (id, name, slug, bio) VALUES ('unstory-editorial', 'Unstory Editorial', 'unstory-editorial', 'The official editorial voice of Unstory.app.');
