
# Certificate Manager App

The **Certificate Manager App** is designed to manage certificates within an organization where a user can track certificate validity, certificate assigned users
certificate supplier, and you can be able to add comments on a specific certificate. 

The app uses a **Maven multi-module structure**, with **Quarkus** for backend and **React** for the frontend. Database schema changes are managed with **Liquibase**.

---

## 🛠️ Build with (Tech Stack)

**Backend:**

 - Java with Quarkus
 - Maven
 - PostgreSQL (Database)

**Frontend:**

 - ReactTS
 - Webpack
---

## 📁 Project Structure

```plaintext
certificate-manager/
├── backend/           # Quarkus application (Backend Module)
├── frontend/          # React application (Frontend Module)
└── pom.xml            # Parent Maven configuration for multi-module
```

---

## ⚙️ Requirements

- **Java 21+**
- **Maven 3.9.9+**
- **PostgreSQL**

---

## 🚀 Running the Application

To get started follow below guidelines:

1. **Clone the repository  :**
```bash
git clone https://github.com/fabmukunzi/certificate-manager---Fabrice.git
cd certificate-manager---Fabrice
```

2. **Setup your `.env` with the below variables:**
```properties
QUARKUS_DATASOURCE_DB_KIND=postgresql
QUARKUS_DATASOURCE_USERNAME=<your-username>
QUARKUS_DATASOURCE_PASSWORD=<your-password>
QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://localhost:5432/<your-database-name>
QUARKUS_HIBERNATE_ORM_LOG_SQL=true
QUARKUS_HIBERNATE_ORM_LOG_BIND_PARAMETERS=true
QUARKUS_LIQUIBASE_DEFAULT_SCHEMA_NAME=certificates
```

3. **In your terminal type below commands:**

```bash
1. cd backend
2. mvn clean install
3. mvn quarkus:dev
```

**The app will be available at:** [http://localhost:8080](http://localhost:8080).

---

## ✨ Key Features

- **Certificate CRUD**:As a user I can create, edit, retrieve and delete certificate.
- **Participants Search**: As a user I can search for users who will be assigned to a certain certificate by department,user id,firstname, lastname and plant.
- **Supplier Search**: As a user I can search for the certificate supplier by index,name or city.
- **Add Comments**: As a user I can add comments to a specific certificate.
- **Translation**: As a user I translate the app in either English or German.

---

## 💡 Acknowledgments
I would like to extend my heartfelt thanks to DCCS and COA for
their invaluable guidance and support throughout the development of this project.
