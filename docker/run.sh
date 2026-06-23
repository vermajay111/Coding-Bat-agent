docker run -d \
  --name codingbatagent-rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  -v rabbitmq_data:/var/lib/rabbitmq \
  codingbatagent-dev-rabbitmq

docker run -d \
  --namec odingbatagent-redis \
  -p 6379:6379 \
  -v redis_data:/data \
  codingbatagent-dev-redis