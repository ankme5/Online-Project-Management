#Stage 1
FROM maven:3.8.5-openjdk-17-slim as build
WORKDIR /app
COPY src ./src
COPY pom.xml .
RUN mvn clean install -DskipTests

FROM maven:3.8.5-openjdk-17-slim as run
WORKDIR /app
COPY --from=build /app/target/onlineProjectManagment-1.0.0.jar .
EXPOSE 8080
ENTRYPOINT ["java","-jar","onlineProjectManagment-1.0.0.jar"]