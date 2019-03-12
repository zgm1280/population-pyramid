import os
from flask import Flask, request, render_template, jsonify, url_for
import uuid
import pandas as pd
import json

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['xlsx', 'xls'])
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


# @app.route('/')
# def index(name=None):
#     return render_template('index.html', name=name)

@app.route('/')
@app.route('/pyramid')
def pyramid():
    return render_template('pyramid.html')


@app.route('/default', methods=['POST', 'GET'])
def default():
    with open("./static/sample/sample.json", "r") as f:
        jsons = f.read()
    f.close()
    s = {}
    s['code'] = 0
    s['msg'] = "示例数据"
    s['count'] = len(json.loads(jsons))
    s['data'] = json.loads(jsons)
    return jsonify(s)


@app.route('/upload', methods=['POST', 'GET'])
def upload():
    file = request.files['file']
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid1())[:10] + '-' + file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        global gl_filename
        gl_filename = filepath
        s = compute(filepath)
        return jsonify(s)
    else:
        return '''{"code": 0,"msg": "上传失败","data": {"src": "http://cdn.layui.com/123.jpg"}}'''


def compute(filename):
    table = pd.read_excel(filename)
    for i in table.columns:
        if i.strip() == "男性":
            table[i] = -table[i]
    jsons = table.to_json(orient='split')
    s = json.loads(jsons)
    s['code'] = 1
    s['msg'] = "上传成功"
    # 删除文件避免占用空间
    os.remove(filename)
    return s


if __name__ == '__main__':
    app.run()
