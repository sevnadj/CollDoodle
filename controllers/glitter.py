from flask import *

glitter = Blueprint('glitter', __name__, template_folder='views')

@glitter.route('/glitter')
def glitter_route():
    return render_template("glitter.html")
    # return send_from_directory('doodles/Muscular-Hydrostats', 'index.html')