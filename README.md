# Experi Machina
An Experiment Management System (EMS)


### Other stuff

#### Run the api server
mvn spring-boot:run

#### Run the angular client
ng serve --proxy-config proxy.conf.json

#### Run the packaged JAR
java -jar api/target/engine-0.0.1-SNAPSHOT.jar com.dtron.engine.DtronApplication

#### Docker Postgres
docker run --name postgres-test -e POSTGRES_PASSWORD=password -p 5432:5432 -v postgres-data:/var/lib/postgresql/data -d postgres:latest