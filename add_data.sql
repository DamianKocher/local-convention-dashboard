INSERT INTO members (full_name, short_name, email)
VALUES ( 'Test User 1', 'Test 1.', 'testuser1@example.com'),
       ('Test User 2', 'Test 2.', 'testuser2@example.com'),
       ('Test User 3', 'Test 3.', 'testuser3@example.com'),
       ('YOUR NAME', 'FIRST_NAME LAST_INITIAL.', 'your_name@example.com');

INSERT INTO documents (id, name, description, type, co_authors, markdown, relates_to)
VALUES (1, 'R01: Test Resolution', 'Description for the first resolution', 'resolution', 'Damian K.',
        '# Test Resolution', NULL),
       (2, 'R02: Test Resolution', 'Description for the second resolution', 'resolution', 'Damian K.',
        '# Test Resolution 2', NULL),
         (3, 'Amendment for resolution 1', 'Change wording of resolution 1', 'amendment', 'Damian K.', '# Amendment 1', 1)