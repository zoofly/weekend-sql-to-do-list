CREATE TABLE tasks (
"id" serial PRIMARY KEY,
"task" varchar (500) not null,
"priority" int,
"complete" boolean
);