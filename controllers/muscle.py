from flask import *

muscle = Blueprint('muscle', __name__, template_folder='views')

@muscle.route('/muscle')
def muscle_route():
    return render_template("muscle.html")
    # return send_from_directory('doodles/Muscular-Hydrostats', 'index.html')