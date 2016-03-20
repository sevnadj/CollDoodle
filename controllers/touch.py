from flask import *

touch = Blueprint('touch', __name__, template_folder='views')

@touch.route('/touch')
def touch_route():
    return render_template("touch.html")