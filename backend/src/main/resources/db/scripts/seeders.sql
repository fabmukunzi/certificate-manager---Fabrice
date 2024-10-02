INSERT INTO departments (title) VALUES
('HR'),
('Engineering'),
('Sales'),
('Marketing'),
('Finance');

INSERT INTO suppliers (name, city, index)
VALUES
('Fabrice Mukunzi', 'Kigali', 'FABMUK'),
('Vicky Luanda', 'Luanda', 'VICLUA'),
('Adele Sambo', 'Kanata', 'ADESAM'),
('Thulani Chris', 'Cape Town', 'THUCHR'),
('Lee Mojaki', 'Midland', 'LEEMOJ'),
('Patience Butera', 'Lehigh', 'PATBUT'),
('Paccy Masengesho', 'Lehigh', 'PACMAS');

INSERT INTO users (first_name, last_name, department_id, plant, email, user_id)
VALUES
('John', 'Doe', (SELECT id FROM certificates.departments WHERE title ='Engineering'), 'Plant A', 'johndoe@example.com', 'JOHDOE'),
('Jane', 'Smith', (SELECT id FROM certificates.departments WHERE title ='Sales'), 'Plant B', 'janesmith@example.com', 'JANSMI'),
('Alice', 'Brown', (SELECT id FROM certificates.departments WHERE title ='Finance'), 'Plant C', 'alicebrown@example.com', 'ALIBRO'),
('Bob', 'Taylor', (SELECT id FROM certificates.departments WHERE title ='Finance'), 'Plant D', 'bobtaylor@example.com', 'BOBTAY'),
('Charlie', 'Wilson', (SELECT id FROM certificates.departments WHERE title ='HR'), 'Plant E', 'charliewilson@example.com', 'CHAWIL');

