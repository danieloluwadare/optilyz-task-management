#!/bin/sh

echo ">>> Start app in $NODE_ENV"

# if [ "$NODE_ENV" == "production" ] || [ "$NODE_ENV" == "staging" ] ; then
#   npm run build && npm run start
# elif [ "$NODE_ENV" == "test" ]; then
#   npm run test
# else
#   npm run dev
# fi

npm run dev

