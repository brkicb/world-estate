# World Estate

Project built using React with RTK Query, and Django with the Django REST Framework and PostgreSQL.

To test the project, simply:

- clone the repository
- in the backend folder, create a virtual environment with: python3 -m venv venv
- activate the virtual environment: source venv/bin/activate (MacOS), .\venv\Scripts\activate.bat (Windows)
- then install the python packges: pip install -r requirements.txt
- migrate to the Sqlite3 database: python manage.py migrate
- run the server: python manage.py runserver
- then create a superuser and add listings and realtors to the app
- in the frontend folder, run: npm install
- then run: npm start
