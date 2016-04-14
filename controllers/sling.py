from flask import *

sling = Blueprint('sling', __name__, template_folder='views')

@sling.route('/sling')
def sling_route():
    return render_template("sling.html")
    # return send_from_directory('doodles/Muscular-Hydrostats', 'index.html')