# Estágio 1: Build (Compilação)
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de configuração do Maven e as dependências primeiro (otimiza o cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código fonte e gera o arquivo .jar
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Run (Execução)
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copia o JAR gerado no estágio anterior
# O nome do JAR segue o artifactId e version do seu pom.xml
COPY --from=build /app/target/projetonosdamota-0.0.1-SNAPSHOT.jar app.jar

# Expõe a porta que o Spring Boot usa
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]