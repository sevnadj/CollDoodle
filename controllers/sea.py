from flask import *

sea = Blueprint('sea', __name__, template_folder='views')

@sea.route('/sea')
def sea_route():
    return render_template("sea.html")