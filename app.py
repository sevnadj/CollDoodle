from flask import Flask, render_template
#from flask.ext.mysqldb import MySQL

import controllers

app = Flask(__name__, template_folder='views')

app.register_blueprint(controllers.main)
app.register_blueprint(controllers.muscle)
app.register_blueprint(controllers.error)

#mysql = MySQL()
#app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'hello'
#app.config['MYSQL_PASSWORD'] = 'doodle'
#mysql.init_app(app)

# comment this out using a WSGI like gunicorn
# if you dont, gunicorn will ignore it anyway
if __name__ == '__main__':
    # listen on external IPs
    app.run(host='0.0.0.0', port=3000, debug=True)
