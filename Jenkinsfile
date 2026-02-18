pipeline {
    agent any
    options { timestamps() }

    environment {
        REGISTRY       = 'ghcr.io'
        IMAGE_NAME     = 'ghcr.io/yoldezhfaiedh/gestion-des-conges'
        REMOTE_HOST    = 'root@node12048-gestion-des-conges.uk.oxa.cloud'
        CONTAINER_NAME = 'gestion_des_conges_front'
        APP_PORT       = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Branch: ${env.GIT_BRANCH ?: 'local'} | Job: ${env.JOB_NAME}"
                checkout scm
                sh 'ls -la'
            }
        }

        stage('Install') {
            steps {
                sh 'node --version && npm --version'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --passWithNoTests --watchAll=false || true'
            }
            post {
                always {
                    sh 'ls coverage/ 2>/dev/null && cat coverage/coverage-summary.json 2>/dev/null || echo "Pas de rapport coverage"'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-registry-credentials',
                        usernameVariable: 'REGISTRY_USER',
                        passwordVariable: 'REGISTRY_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo $REGISTRY_PASSWORD | docker login $REGISTRY -u $REGISTRY_USER --password-stdin
                        docker pull $IMAGE_NAME:latest || true
                        docker build -t $IMAGE_NAME:latest .
                        docker push $IMAGE_NAME:latest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ssh-deploy-key',
                        keyFileVariable: 'SSH_KEY'
                    ),
                    usernamePassword(
                        credentialsId: 'github-registry-credentials',
                        usernameVariable: 'REGISTRY_USER',
                        passwordVariable: 'REGISTRY_PASSWORD'
                    )
                ]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY $REMOTE_HOST \
                            "echo $REGISTRY_PASSWORD | docker login $REGISTRY -u $REGISTRY_USER --password-stdin"
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY $REMOTE_HOST \
                            "docker stop $CONTAINER_NAME && docker rm -f $CONTAINER_NAME || true"
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY $REMOTE_HOST \
                            "docker pull $IMAGE_NAME:latest"
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY $REMOTE_HOST \
                            "docker run -d \
                                --name $CONTAINER_NAME \
                                -p $APP_PORT:3000 \
                                -v /uploads:/app/public/uploads \
                                --restart unless-stopped \
                                $IMAGE_NAME:latest"
                    '''
                }
            }
        }
    }

    post {
        success { echo "✅ Pipeline réussi !" }
        failure { echo "❌ Pipeline ÉCHOUÉ !" }
    }
}