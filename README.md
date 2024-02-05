# Song API
## Setup
1. Clone the project
```shell
git clone git@github.com:abenezer-ayalneh/song-api.git
```
2. Checkout the ```main``` branch
```shell
git checkout main
```
3. Copy the ```.env.example``` file to ```.env``` file
```shell
cp .env.example .env
```
4. Run the docker compose file
```shell
docker-compose up -d --build
```
5. Install packages
```shell
npm install
```
6. Run the development server
```shell
npm run dev
```
## Task
Develop a Rest API that will let you manage information for songs. Your API will be able to create, list, update and remove songs. You will only need to create one model to handle the
song data. The expected information are:
- Title
- Artist
- Album
- Genre

You are also expected to generate overall statistics:
- Total number of songs, artists, albums, genres
- Number of songs in every genre
- Number of songs & albums each artist has
- Number of songs in each album … and so on.

You can add any stat you can think of.

#### Technologies
Use the technologies below to create your backend Rest API.
- **ExpressJS** : To handle your requests.
- **MongoDB** : To store your data.
- **Mongoose** : To interact with MongoDB, model your data and to create your schema.
- **Docker**: package your backend using docker
