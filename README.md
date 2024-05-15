country_portal

This project contains both the client and server components.

Client
This client project was generated with Angular CLI version 17.3.3.

Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

Running unit tests
Run ng test to execute the unit tests via Karma.

Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

Further help
To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.

Server
This server project was created with C# .NET 7 and utilizes MongoDB as the database.

Prerequisites
Before running the server, ensure you have the following installed:

.NET 7 SDK
MongoDB
Installation
Clone this repository to your local machine.
Navigate to the project directory.
Restore the dependencies by running:
bash
Copy code
dotnet restore
Configuration
Ensure MongoDB is running locally or configure the connection string in appsettings.json.
Running the Server
To start the server, run the following command:

bash
Copy code
dotnet run
The server will start on http://localhost:7039/.

Endpoints
GET /api/{endpoint}: Description of the endpoint.
POST /api/{endpoint}: Description of the endpoint.
PUT /api/{endpoint}: Description of the endpoint.
Testing
Unit tests can be executed using:

bash
Copy code
dotnet test
Further Help
For more information about the Angular CLI or C# .NET environment, visit their respective documentation:

Angular CLI Documentation
.NET Documentation
If you have any questions specific to this project, feel free to reach out to the project owner.
