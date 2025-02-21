pipeline{
    agent any
    stages{
        stage('checkout'){
            steps{
                git 'https://github.com/Akhanweyal/Playwright.git'
            }
        }
    }
    stage{
        steps('install dependecies'){
            sh 'npm install'
        }
    }
    stage{
        steps('run test'){
            sh 'npm run test'
        }
    }
    stage('Publish Report') {
            steps {
                // Publish Playwright test report
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
        }
    }
    post{
        always{
            // archive the test results
            archiveArtifacts 'playwright-report/**'
        }
    }
}