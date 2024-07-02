pipeline {
    agent any
    tools {
        nodejs 'node.js'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build -t weather-app .'
            }
        }
        stage('Docker Run') {
            steps {
                sh 'docker run -d -p 3000:3000 --name weather weather-app'
            }
        }
        stage('Docker Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                        sh 'docker tag weather-app $USERNAME/weather-app:2.0'
                        sh 'docker push $USERNAME/weather-app:2.0'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop weather'
            sh 'docker rm weather'
        }
    }
}
