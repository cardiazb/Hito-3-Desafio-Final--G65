

const SECRET_KEY = 'a0c7aacd71661bb8b52ee4acac19b8ec6304597a76ada08c39e6348f5d000000';
const DB_CONFIG = {
  postgresql://pizzeria_bd_c2ru_user:RRaWdy9braEsHyq2qKPTnjDozv26ftFS@dpg-ct0uq9jtq21c73ejfci0-a.oregon-postgres.render.com/pizzeria_bd_c2ru?ssl=true
};
const SALT_ROUNDS = 10;

const TokenPrueba = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxvc2RpYXpiZWNhcjJAZ21haWwuY29tIiwidGlwbyI6IkNsaWVudGUiLCJpZCI6IjIzIiwibm9tYnJlIjoiQ2FybG9zIiwiYXBlbGxpZG8iOiJEaWF6IiwiaWF0IjoxNzMxODc2MjcwLCJleHAiOjE3MzI0ODEwNzB9.3hesx2s0wciOOISaSBxcZLS4pRzl8jktQFrhS5SBGeU';


module.exports = {
  SECRET_KEY,
  DB_CONFIG,
  SALT_ROUNDS,
  TokenPrueba
};
