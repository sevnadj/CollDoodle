from flask import *

atom = Blueprint('atom', __name__, template_folder='views')

@atom.route('/atom')
def atom_route():
    return render_template("atom.html")
    # return send_from_directory('doodles/Muscular-Hydrostats', 'index.html')