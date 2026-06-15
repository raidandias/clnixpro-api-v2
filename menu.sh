#!/bin/bash

# Função para carregar variáveis do arquivo .env
function load_env() {
  export $(grep -v '^#' .env | xargs)
}

function check_env() {
  load_env
  if [ "$NODE_ENV" != "localhost" ]; then
    echo "Error: NODE_ENV is not set to 'localhost'. Current value: $NODE_ENV"
    exit 1
  fi
}

function dependencies_project() {
  echo "Install Dependencies..."
  pnpm install
  echo "Install completed."
}

function start_docker() {
  echo "Starting Docker containers..."
  docker-compose up -d
  echo "Docker containers started."
}

function run_migrations() {
  echo "Running migrations..."
  npx prisma migrate dev
  npx prisma generate
  echo "Migrations completed."
}

function start_project() {
  echo "Starting the project..."
  pnpm start:dev
  echo "Project started."
}

function all_steps() {
  check_env
  start_docker
  dependencies_project
  run_migrations
  start_project
}

function show_menu() {
  echo "Select an option:"
  echo "1) Start Docker"
  echo "2) Build project"
  echo "3) Run migrations"
  echo "4) Start project"
  echo "5) Run all steps"
  echo "6) Exit"
}

while true; do
  show_menu
  read -p "Enter option: " option
  case $option in
    1) check_env && dependencies_project ;;
    2) check_env && start_docker ;;
    3) check_env && run_migrations ;;
    4) check_env && start_project ;;
    5) all_steps ;;
    6) exit 0 ;;
    *) echo "Invalid option. Please try again." ;;
  esac
done
