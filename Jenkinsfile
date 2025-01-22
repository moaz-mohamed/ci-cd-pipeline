pipeline {
    agent any
    tools {
        nodejs 'node.js'
    }
    environment {
        IMAGE_NAME = 'moazmohamed/weather-app:lts'
        
    }
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing Dependencies...'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running Tests...'
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                sh 'docker build -t weather-app .'
            }
        }
        stage('Push to Dockerhub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "docker login -u $USERNAME -p $PASSWORD"
                        sh "docker tag weather-app ${IMAGE_NAME}"
                        sh "docker push ${IMAGE_NAME}"
                    }
                }
            }
        }
        stage('Deploy to Azure Server') {
            steps {
                script {
                def dockerCommand = 'docker run -d -p 3000:3000 --name weather'
                    sshagent(['docker-server-key']) {
                        sh "ssh -o stricthostkeychecking=no azureuser@4.211.131.159 docker run -d -p 3000:3000 ${dockerCommand} ${IMAGE_NAME}"   

                    }
                }
            }
        }
    }
}
