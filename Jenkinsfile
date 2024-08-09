pipeline {
    agent any

    environment {
        // Variáveis de ambiente
        APP_ENV = 'producao'
        DB_URL = credentials('database-url')
    }

    options {
        // Opções
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    parameters {
        // Parâmetros
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Nome do branch para build')
    }

    triggers {
        // Gatilhos
        cron('H/15 * * * *')
    }

    stages {
        stage('Compilação') {
            steps {
                script {
                    // Passos de compilação
                    echo 'Iniciando a compilação...'
                    sh 'mvn clean compile'
                }
            }
        }
        stage('Testes Unitários') {
            steps {
                script {
                    // Passos de testes unitários
                    echo 'Executando testes unitários...'
                    sh 'mvn test'
                }
            }
        }
        stage('Análise de Código') {
            steps {
                script {
                    // Passos de análise de código
                    echo 'Analisando código...'
                    sh 'mvn sonar:sonar'
                }
            }
        }
        stage('Deploy') {
            input {
                message "Deseja prosseguir com o deploy?"
                ok "Sim, continuar"
                parameters {
                    choice(name: 'DEPLOY_ENV', choices: ['DESENVOLVIMENTO', 'HOMOLOGACAO', 'PRODUCAO'], description: 'Escolha o ambiente de deploy')
                }
            }
            steps {
                script {
                    // Passos de deploy
                    echo "Deploy no ambiente: ${params.DEPLOY_ENV}"
                    if (params.DEPLOY_ENV == 'PRODUCAO') {
                        sh 'mvn deploy -Pprod'
                    } else {
                        sh "mvn deploy -P${params.DEPLOY_ENV.toLowerCase()}"
                    }
                }
            }
        }
        stage('Condição Especial') {
            when {
                expression { return params.BRANCH_NAME == 'main' }
            }
            steps {
                echo 'Este estágio só será executado se o branch for "main"'
            }
        }
        stage('Testes Paralelos') {
            parallel {
                stage('Testes Funcionais') {
                    steps {
                        echo 'Executando testes funcionais...'
                        sh 'mvn verify -Pfunctional-tests'
                    }
                }
                stage('Testes de Integração') {
                    steps {
                        echo 'Executando testes de integração...'
                        sh 'mvn verify -Pintegration-tests'
                    }
                }
            }
        }
        stage('Matriz de Build') {
            matrix {
                axes {
                    axis {
                        name 'JAVA_VERSION'
                        values '8', '11', '17'
                    }
                    axis {
                        name 'OS'
                        values 'linux', 'windows'
                    }
                }
                stages {
                    stage('Compilar Matriz') {
                        steps {
                            echo "Compilando com JAVA ${JAVA_VERSION} no SO ${OS}"
                            sh "mvn clean compile -Djdk.version=${JAVA_VERSION}"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Este bloco sempre será executado'
        }
        success {
            echo 'Este bloco será executado em caso de sucesso'
        }
        failure {
            echo 'Este bloco será executado em caso de falha'
        }
    }
}
