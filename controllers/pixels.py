from flask import *

pixels = Blueprint('pixels', __name__, template_folder='views')

@pixels.route('/pixels')
def pixels_route():
    return render_template("pixels.html")
    # return send_from_directory('doodles/Muscular-Hydrostats', 'index.html')