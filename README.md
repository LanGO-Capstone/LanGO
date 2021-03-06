# LanGO

Codeup Capstone using Spring Boot and React.js

[Jira](https://lango-capstone.atlassian.net/secure/RapidBoard.jspa?rapidView=1)

[User Stories](https://docs.google.com/document/d/1wq2BtXEZM2ceJjq-y9MgXJ3zxGTvOANtJ3IP0OnsEq8/edit)

[DB Design](https://www.draw.io/?state=%7B%22ids%22:%5B%221LKDoq6CYH8tSf6i6lk22WZwDTF-XXjoN%22%5D,%22action%22:%22open%22,%22userId%22:%22102101200280189763828%22%7D#G1LKDoq6CYH8tSf6i6lk22WZwDTF-XXjoN)

[Mockaroo](https://mockaroo.com/projects/14922)


# Running the project (IntelliJ)

1. Clone the repository to your local machine

2. Rename or make a copy of the `example.properties` file in src>main>resources and name it `application.properties`.  Make sure to replace the username and password in the file with the username and password you want to use for the database user on your local machine.  The database should be set up and created automatically by Spring.

3. IntelliJ should automatically pickup that this is a Spring Boot application and allow you to start the backend, which runs at localhost:8080, from the configurations menu.

4. From the root directory, navigate to the front end folder in your terminal and run `npm install`, or click on the IntelliJ popup in the bottom right asking you to run it.  
```
cd frontend
npm install
```
5. From the frontend folder, you can run `npm start` or go to the package.json file in that folder and press the green triangle next to the start command in the scripts section to start the frontend development server which runs at localhost:3000.

# React + Spring Boot as a Codeup Capstone

If one wants to use a front end framework in conjunction with spring, your frontend files need to be in the same project as your spring application, i.e. in ~/frontend. So from the root project directory you can run `npx create-react-app frontend` to have npm create a new react app in a folder called frontend in your root directory.  You also need a maven plugin like https://github.com/eirslett/frontend-maven-plugin to automatically build your front end and include it in the /target folder so maven can package it correctly.  So your pom.xml should include 

```
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>com.github.eirslett</groupId>
                <artifactId>frontend-maven-plugin</artifactId>
                <version>1.6</version>
                <configuration>
                    <workingDirectory>frontend</workingDirectory>
                    <installDirectory>target</installDirectory>
                </configuration>
                <executions>
                    <execution>
                        <id>install node and npm</id>
                        <goals>
                            <goal>install-node-and-npm</goal>
                        </goals>
                        <configuration>
                            <nodeVersion>v12.6.0</nodeVersion>
                            <npmVersion>6.9.0</npmVersion>
                        </configuration>
                    </execution>
                    <execution>
                        <id>npm install</id>
                        <goals>
                            <goal>npm</goal>
                        </goals>
                        <configuration>
                            <arguments>install</arguments>
                        </configuration>
                    </execution>
                    <execution>
                        <id>npm run build</id>
                        <goals>
                            <goal>npm</goal>
                        </goals>
                        <configuration>
                            <arguments>run build</arguments>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <artifactId>maven-antrun-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>generate-resources</phase>
                        <configuration>
                            <target>
                                <copy todir="${project.build.directory}/classes/public">
                                    <fileset dir="${project.basedir}/frontend/build"/>
                                </copy>
                            </target>
                        </configuration>
                        <goals>
                            <goal>run</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

In addition, the command to build the jar is `mvn clean install` rather than `./mvnw package` so your .cods file should look like this
```
BUILD_COMMAND='mvn clean install'
JAR_FILE=target/FILENAME.jar
```
