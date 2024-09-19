ALTER DATABASE certificates_manager SET search_path TO certificates;

INSERT INTO certificates.suppliers (names, city, created_at, updated_at) VALUES
('Supplier One', 'City One', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Supplier Two', 'City Two', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
