from flask import *

pulsator = Blueprint('pulsator', __name__, template_folder='views')

@pulsator.route('/pulsator')
def pulsator_route():
    return render_template("pulsator.html")