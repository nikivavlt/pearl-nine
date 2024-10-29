import neca
from neca.events import *
from neca.generators import generate_data, print_object

tweet_c = create_context("tweet_c")

# your code here
@event("init")
def init(ctx, data):
    generate_data('sports-20191117.txt', time_scale=1, event_name='tweet', limit=1, context = tweet_c)

@event("tweet")
def tweet(ctx, data):
    print(data['text'])

# starts the server and prevents the program from exiting
neca.start()