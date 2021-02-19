docker stack deploy -c docker-compose.yaml  recipesapp-stack
docker service scale recipesapp-stack_mywebsite=7
docker stack rm recipesapp-stack