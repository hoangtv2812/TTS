up:
	docker compose up -d db adminer
build_backend:
	cd backend && docker build --no-cache -f Dockerfile --platform linux/amd64 -t tts_backend:dev .
dev_backend:
	docker rm -f tts_backend || true && docker compose run --name tts_backend -p 3001:3001 backend
exec_backend:
	docker exec -it tts_backend sh

build_frontend:
	cd frontend && docker build --no-cache -f Dockerfile --platform=linux/amd64 -t tts_frontend:dev .
dev_frontend:
	docker rm -f tts_frontend || true && docker compose run --name tts_frontend -p 5173:5173 frontend
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

build_backend_staging:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_staging_backend .
build_push_backend_staging:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_staging_backend . && docker push your_repo/tts_staging_backend
build_frontend_staging:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_staging_frontend .
build_push_frontend_staging:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_staging_frontend . && docker push your_repo/tts_staging_frontend

build_backend_prod:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_backend .
build_push_backend_prod:
	cd backend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_backend . && docker push your_repo/tts_backend
build_frontend_prod:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_frontend .
build_push_frontend_prod:
	cd frontend && docker build -f Dockerfile.prod --platform linux/amd64 -t your_repo/tts_frontend . && docker push your_repo/tts_frontend

pull_backend_staging:
	docker pull your_repo/tts_staging_backend
pull_frontend_staging:
	docker pull your_repo/tts_staging_frontend
pull_staging:
	docker pull your_repo/tts_staging_backend & docker pull your_repo/tts_staging_frontend

pull_backend:
	docker pull your_repo/tts_backend
pull_frontend:
	docker pull your_repo/tts_frontend
pull:
	docker pull your_repo/tts_backend & docker pull your_repo/tts_frontend

swarm:
	docker swarm init --advertise-addr 127.0.0.1
stack:
	docker stack deploy --compose-file docker-compose.yml tts
deploy_local_backend:
	docker service update --force tts_backend
deploy_local_frontend:
	docker service update --force tts_frontend

confirm_staging:
	@echo "🔐 Do you want to deploy STAGING? Type 'staging' to continue:"
	@read -p "> " first; \
	if [ "$$first" != "staging" ]; then \
		echo "❌ First confirmation failed."; \
		exit 1; \
	fi
	@echo "✅ Confirmations passed!"

deploy_staging: confirm_staging
	git checkout master
	git pull origin master

	git branch -D staging_deployment || true
	git checkout -b staging_deployment
	git push origin staging_deployment -f

	git branch -D staging_be_fe_deployment || true
	git checkout -b staging_be_fe_deployment
	git push origin staging_be_fe_deployment -f

	git checkout master

deploy_staging_backend: confirm_staging
	git checkout master
	git pull origin master

	git branch -D staging_deployment || true
	git checkout -b staging_deployment
	git push origin staging_deployment -f

	git branch -D staging_backend_deployment || true
	git checkout -b staging_backend_deployment
	git push origin staging_backend_deployment -f

	git checkout master

deploy_staging_frontend: confirm_staging
	git checkout master
	git pull origin master

	git branch -D staging_deployment || true
	git checkout -b staging_deployment
	git push origin staging_deployment -f

	git branch -D staging_frontend_deployment || true
	git checkout -b staging_frontend_deployment
	git push origin staging_frontend_deployment -f

	git checkout master


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

deploy_production: confirm_production
	git checkout master
	git pull origin master

	git branch -D deployment || true
	git checkout -b deployment
	git push origin deployment -f

	git branch -D be_fe_deployment || true
	git checkout -b be_fe_deployment
	git push origin be_fe_deployment -f

	git checkout master

deploy_production_backend: confirm_production
	git checkout master
	git pull origin master

	git branch -D deployment || true
	git checkout -b deployment
	git push origin deployment -f

	git branch -D backend_deployment || true
	git checkout -b backend_deployment
	git push origin backend_deployment -f

	git checkout master

deploy_production_frontend: confirm_production
	git checkout master
	git pull origin master

	git branch -D deployment || true
	git checkout -b deployment
	git push origin deployment -f

	git branch -D frontend_deployment || true
	git checkout -b frontend_deployment
	git push origin frontend_deployment -f

	git checkout master
