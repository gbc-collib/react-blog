from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'  # Using SQLite database
db = SQLAlchemy(app)
CORS(app)  # Allowing Cross-Origin Resource Sharing

# Define your Post model
class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    published = db.Column(db.Date, nullable=False)
    content = db.Column(db.Text, nullable=False)
    thumbnail = db.Column(db.Text, nullable=True)
#Default /posts methods
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()

    # Convert list of Post objects to list of dictionaries
    posts_data = []
    for post in posts:
        post_data = {
            'id': post.id,
            'title': post.title,
            'author': post.author,
            'published': post.published.strftime('%Y-%m-%d'),
            'content': post.content,
            'thumbnail': post.thumbnail
        }
        posts_data.append(post_data)

    return jsonify(posts_data), 200


@app.route('/posts', methods=['POST'])
def create_post():
    try:
        data = request.json
    except Exception as error:
        print(error)
    print(data)
    post = Post(title=data['title'], content=data['content'], author=data['author'], thumbnail=data['thumbnail'], published=data['published'])
    print(post)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'})
#Methods for posts by ID
@app.route('/post/<int:id>', methods=['GET'])
def get_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    post_data = {
        'id': post.id,
        'title': post.title,
        'author': post.author,
        'published': post.published.strftime('%Y-%m-%d'),
        'content': post.content,
        'thumbnail': post.thumbnail
    }
    return jsonify(post_data), 200

@app.route('/post/<int:id>', methods=['PUT'])
def update_post(id):
    data = request.json
    post = Post.query.get(id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    post.title = data['title']
    post.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Post updated successfully'})

@app.route('/post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted successfully'})
#Methods for post querying
@app.route('/posts/author/<string:author>', methods=['GET'])
def get_posts_by_author():
    #Write Query

    return [post.serialize() for post in posts]
@app.route('/posts/newest', methods=['GET'])
def sort_posts_by_newest():
    #Query and sort by published date
    posts = Post.query.all()
    return [post.serialize() for post in posts]


if __name__ == '__api__':
    app.run(debug=True)
