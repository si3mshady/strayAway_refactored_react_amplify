FROM  nikolaik/python-nodejs
WORKDIR app/

RUN  pip3 install flask
RUN mkdir build/

COPY server.py ./
COPY build/ build/

EXPOSE 5000

CMD ["python3","server.py"]

