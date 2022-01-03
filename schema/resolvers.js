let { UserList, MovieList } = require('../FakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: +id });
      return user;
    },

    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    }
  },
  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => 
        movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      )
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.user;
      const lastId = UserList[UserList.length - 1].id
      user.id = lastId + 1
      UserList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const {id, newUsername} = args.input;
      let _user;
      UserList.map(user => {
        if(user.id === +id) {
          user.username = newUsername
          _user = user;
        }
        return user;
      });
      return _user;
    },
    deleteUser: (parent, args) => {
      let id = args.id;
      let _user;
      UserList = UserList.filter(user => {
        if(user.id === +id) {
          _user = user;
          return false
        }
        return user;
      })
      return _user;
    }
  }
}

module.exports = { resolvers }