up:
	docker compose up -d db adminer
build_backend:
	cd backend && docker build --no-cache -f Dockerfile -t tts_backend:dev .
dev_backend:
	docker rm -f tts_backend || true && docker compose run --name tts_backend -p 3001:3001 backend
exec_backend:
	docker exec -it tts_backend sh

build_frontend:
	cd frontend && docker build --no-cache -f Dockerfile -t tts_frontend:dev .
dev_frontend:
	docker rm -f tts_frontend || true && docker volume rm tts_frontend_node_modules || true && docker compose run --name tts_frontend -p 5173:5173 frontend
exec_frontend:
	docker exec -it tts_frontend sh

install_backend:
	docker compose run --rm backend npm install

lint:
	docker exec -it tts_backend sh -c "npm run lint_fix" && docker exec -it tts_frontend sh -c "npm run lint_fix"
test:
	docker exec -it tts_backend sh -c "npm run test"
test_coverage:
	docker exec -it tts_backend sh -c "npm run test:coverage"

# Local Build Commands (For Mac Silicon / ARM64)
build_backend_local:
	cd backend && docker build -f Dockerfile.prod --platform linux/arm64 -t vhoang2812/server_image:tts_backend_local .
build_frontend_local:
	cd frontend && docker build -f Dockerfile.prod --platform linux/arm64 -t vhoang2812/server_image:tts_frontend_local .
build_gateway_local:
	cd nginx_gateway && docker build -f Dockerfile --platform linux/arm64 -t vhoang2812/server_image:tts_gateway_local .

# Production build and push commands
build_backend_prod:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t vhoang2812/server_image:tts_backend .
build_push_backend_prod:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t vhoang2812/server_image:tts_backend . && docker push vhoang2812/server_image:tts_backend

build_frontend_prod:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t vhoang2812/server_image:tts_frontend .
build_push_frontend_prod:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t vhoang2812/server_image:tts_frontend . && docker push vhoang2812/server_image:tts_frontend

build_gateway_prod:
	cd nginx_gateway && docker build -f Dockerfile --platform linux/amd64 -t vhoang2812/server_image:tts_gateway .
build_push_gateway_prod:
	cd nginx_gateway && docker build -f Dockerfile --platform linux/amd64 -t vhoang2812/server_image:tts_gateway . && docker push vhoang2812/server_image:tts_gateway

# Production deployment to Docker Swarm
swarm:
	docker swarm init --advertise-addr 127.0.0.1
stack:
	docker stack deploy --compose-file docker-compose.prod.yml tts
stack_local:
	cp docker-compose.prod.yml docker-compose.local.yml
	sed -i '' 's|vhoang2812/server_image:tts_backend|vhoang2812/server_image:tts_backend_local|g' docker-compose.local.yml
	sed -i '' 's|vhoang2812/server_image:tts_frontend|vhoang2812/server_image:tts_frontend_local|g' docker-compose.local.yml
	sed -i '' 's|vhoang2812/server_image:tts_gateway|vhoang2812/server_image:tts_gateway_local|g' docker-compose.local.yml
	docker stack deploy --compose-file docker-compose.local.yml tts
	rm docker-compose.local.yml

force_backend:
	docker service update --force tts_backend
force_frontend:
	docker service update --force tts_frontend
force_gateway:
	docker service update --force tts_gateway

# Deployment commands with safety confirmations
confirm_production:
	@echo "🔐 Do you want to deploy PRODUCTION? Type 'production' to continue:"
	@read -p "> " first; \
	if [ "$$first" != "production" ]; then \
		echo "❌ First confirmation failed."; \
		exit 1; \
	fi
	@echo "🔐 Second confirmation: Type current date (YYYY-MM-DD) to continue:"
	@read -p "> " second; \
	expected_date=$$(date +%Y-%m-%d); \
	if [ "$$second" != "$$expected_date" ]; then \
		echo "❌ Second confirmation failed. Expected: $$expected_date"; \
		exit 1; \
	fi
	@echo "✅ Confirmations passed!"

deploy_backend_production:
	@echo "🚀 Starting production backend deployment..."
# 	git checkout master
# 	git pull origin master
# 	git branch -D deploy-backend-production || true
# 	git checkout -b deploy-backend-production
# 	git push origin deploy-backend-production -f
# 	git checkout master
	git checkout update_ci_cd
	git branch -D deploy-backend-production || true
	git checkout -b deploy-backend-production
	git push origin deploy-backend-production -f
	git checkout update_ci_cd

deploy_frontend_production:
	@echo "🚀 Starting production frontend deployment..."
# 	git checkout master
# 	git pull origin master
# 	git branch -D deploy-frontend-production || true
# 	git checkout -b deploy-frontend-production
# 	git push origin deploy-frontend-production -f
# 	git checkout master
	git checkout update_ci_cd
	git branch -D deploy-frontend-production || true
	git checkout -b deploy-frontend-production
	git push origin deploy-frontend-production -f
	git checkout update_ci_cd

deploy_production:
	@echo "🚀 Starting full production deployment (backend + frontend + gateway)..."
# 	git checkout master
# 	git pull origin master
# 	git branch -D deploy-production || true
# 	git checkout -b deploy-production
# 	git push origin deploy-production -f
# 	git checkout master
	git checkout update_ci_cd
	git branch -D deploy-production || true
	git checkout -b deploy-production
	git push origin deploy-production -f
	git checkout update_ci_cd
