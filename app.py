import StringIO
import os

from flask import Flask, render_template, request, redirect, url_for, send_file
from PIL import Image, ImageDraw, ImageFont


tuxApp = Flask(__name__)
tuxApp.config['SECRET_KEY'] = os.environ['SECRET_KEY']


@tuxApp.route('/')
def home():
    tuxText = request.args.get('text')
    tuxFont = ImageFont.truetype('Helvetica.ttf', size=50)
    tux = Image.open('tux.jpg').convert('RGBA')
    tuxWidth, tuxHeight = tux.size
    tuxDraw = ImageDraw.Draw(tux)
    tuxTextWidth, tuxTextHeight = tuxDraw.textsize(tuxText, tuxFont)

    print tuxTextWidth

    tuxDraw.text(((tuxWidth-tuxTextWidth)/2,( tuxHeight-tuxTextHeight) - 100), tuxText, font=tuxFont)
    img_io = StringIO.StringIO()
    tux.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


if __name__ == '__main__':
    tuxApp.run(debug=True)
