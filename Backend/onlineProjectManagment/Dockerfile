FROM openjdk:17-jdk-alpine
WORKDIR /app
#COPY pom.xml .
#COPY src ./src
#COPY .mvn .mvn
#COPY mvnw .
#RUN ./mvnw package
COPY target/*.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","onlineProjectManagment-1.0.0.jar"]