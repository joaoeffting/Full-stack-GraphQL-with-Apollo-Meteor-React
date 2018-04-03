import Resolutions from './resolutions';

export default {
    Query: {
        resolutions(obj, args, context) {
            return Resolutions.find({}).fetch()
        }
    },
    Mutation: {
        createResolution(obj, args, context) {
            const resolutionId = Resolutions.insert({
                name: args.name
            });
            return Resolutions.findOne(resolutionId);
        },
        removeUser(obj, args, context) {
            console.log('jdiosjioajidojioasjiodjoiajoidjoiajoidjioa', args)
            Resolutions.remove(args.id);
            return Resolutions.find({}).fetch();
        }
    }
}