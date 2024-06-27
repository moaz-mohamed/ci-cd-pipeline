pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Run Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            agent {
                docker{
                    label 'docker-agent'
                    image 'jenkins/agent:alpine-jdk17'
                }
            }
            steps {
                sh 'docker build -t weather-app .'
            }
        }
        stage('Docker Run') {
            agent {
                docker{
                    label 'docker-agent'
                    image 'jenkins/agent:alpine-jdk17'
                }
            }
            steps {
                sh 'docker run -d -p 3000:3000 weather-app'
            }
        }
        stage('Docker Push') {
            agent {
                docker{
                    label 'docker-agent'
                    image 'jenkins/agent:alpine-jdk17'
                }
            }
            steps {
                withCredentials(usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD') ) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh 'docker tag weather-app $USERNAME/weather-app:2.0'
                    sh 'docker push $USERNAME/weather-app:2.0'
                }
          
            }
        }
    }
}
// withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
//         sh 'docker build -t nanajanashia/demo-app:jma-2.0 .'
//         sh "echo $PASS | docker login -u $USER --password-stdin"
//         sh 'docker push nanajanashia/demo-app:jma-2.0'
//     }
