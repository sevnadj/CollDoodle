from flask import *

nowhere = Blueprint('nowhere', __name__, template_folder='views')

@nowhere.route('/nowhere')
def nowhere_route():
    return render_template("nowhere.html")