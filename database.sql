CREATE TABLE tasks (
"id" serial PRIMARY KEY,
"task" varchar (500) not null,
"complete" boolean not null
);

INSERT INTO tasks ("task", "complete") 
VALUES ('finish hw', false),
('Feed the dogs', true),
('Go grocery shopping', false);
