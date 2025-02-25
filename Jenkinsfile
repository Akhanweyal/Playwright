pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git branch: 'main', url: 'https://github.com/Akhanweyal/Playwright.git'
            }
        }

        stage('Install Dependencies') { {
            steps {
                bat 'npm install' install'
            }
        }

        stage('Run Tests in Parallel') {('Run Tests in Parallel') {
            parallel {   parallel {
                stage('Run Tests on Chromium') {                stage('Run Tests on Chromium') {
                    steps {
                        bat 'npx playwright test --project=chromium'  bat 'npx playwright test --project=chromium'
                    }
                }
                stage('Run Tests on Firefox') { on Firefox') {
                    steps {
                        bat 'npx playwright test --project=firefox'
                    }
                }
            }
        }

        stage('Publish Report') {
            steps {
                // Publish Playwright test reportright test report
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,true,
                    reportDir: 'playwright-report',tDir: 'playwright-report',
                    reportFiles: 'index.html',eportFiles: 'index.html',
                    reportName: 'Playwright Test Report'   reportName: 'Playwright Test Report'
                ])   ])
            }   }
        }        }
    }

    post {
        always {
            // Archive the test results
            archiveArtifacts 'playwright-report/**'**'
        }
    }
}