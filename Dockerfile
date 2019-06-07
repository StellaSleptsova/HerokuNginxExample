FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY /verifier /etc/nginx/html/verifier
COPY /verifier/ctl /etc/nginx/html/verifier/ctl
COPY /verifier/ltl /etc/nginx/html/verifier/ltl

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'