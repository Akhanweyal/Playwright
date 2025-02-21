pipeline {
    agent any
    tools {
        nodejs 'NodeJS-18' // Name of your Node.js installation in Jenkins
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Akhanweyal/Playwright.git'
            }
        }
        stage('Install') {
            steps {
                bat 'npm ci' // Clean install for CI
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npx playwright test --config=playwright.config.js'
            }
        }
    }
    post {
        always {
            publishHTML target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ]
            archiveArtifacts artifacts: 'playwright-report/**/*'
        }
    }
}