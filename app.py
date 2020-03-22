import io
import os

from flask import Flask, render_template, request, redirect, url_for, send_file
from PIL import Image, ImageDraw, ImageFont


tuxApp = Flask(__name__)
tuxApp.config['SECRET_KEY'] = 'tux'


@tuxApp.route('/')
def home():
    tuxText = request.args.get('text', 'lgtm')
    tuxFont = ImageFont.truetype('Helvetica.ttf', size=50)
    tux = Image.open('tux.jpg').convert('RGBA')
    tuxWidth, tuxHeight = tux.size
    tuxDraw = ImageDraw.Draw(tux)
    tuxTextWidth, tuxTextHeight = tuxDraw.textsize(tuxText, tuxFont)

    tuxDraw.text(((tuxWidth-tuxTextWidth)/2,( tuxHeight-tuxTextHeight) - 100), tuxText, font=tuxFont)
    img_io = io.BytesIO()
    tux.save(img_io, 'PNG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')


if __name__ == '__main__':
    tuxApp.run(port=5000, host='0.0.0.0', debug=True)
