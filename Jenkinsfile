pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git(
                    url: 'https://github.com/145wir/cloud_pipeline.git',
                    branch: 'main',
                    credentialsId: 'username-id'
                )
            }
        }

        stage('Environment') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'image-rag-env',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        rm -f .env
                        cp "$ENV_FILE" .env
                        chmod 600 .env
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Check') {
            steps {
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }

        success {
            echo 'AWS 배포 성공'
        }

        failure {
            echo 'AWS 배포 실패'
        }
    }
}