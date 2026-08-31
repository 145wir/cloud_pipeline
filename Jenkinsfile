pipeline {

    agent any


    environment {
        COMPOSE_PROJECT_NAME = "image-rag"
    }


    stages {

        stage('Checkout') {
            steps {
                checkout scm
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
                        cp "$ENV_FILE" .env
                    '''
                }
            }
        }


        stage('Build') {
            steps {
                sh '''
                    docker compose build --no-cache
                '''
            }
        }


        stage('Deploy') {
            steps {
                sh '''
                    docker compose down
                    docker compose up -d
                '''
            }
        }


        stage('Check') {
            steps {
                sh '''
                    docker compose ps
                '''
            }
        }
    }


    post {

        success {
            echo 'AWS 배포 성공'
        }

        failure {
            echo 'AWS 배포 실패'
        }

        always {
            sh '''
                docker image prune -f
            '''
        }
    }
}