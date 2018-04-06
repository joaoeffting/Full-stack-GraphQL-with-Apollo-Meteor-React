export default {
    Query: {
        user(obj, args, { user = {} }) {
            return user;
        }
    },
    User: {
        email: user => return user && user.emails && user.emails[0].address
    },
    Mutation: {
        removeUser(obj, args, context) {
            Resolutions.remove(args.id);
            return Resolutions.find({}).fetch();
        }
    }
}