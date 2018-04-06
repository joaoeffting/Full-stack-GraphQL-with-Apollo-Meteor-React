import Resolutions from './resolutions';

export default {
    Query: {
        resolutions(obj, args, { userId = null }) {
            return Resolutions.find({
                userId  
            }).fetch()
        }
    },
    Mutation: {
        createResolution(obj, args, {userId}) {
            console.log(userId)
            const resolutionId = Resolutions.insert({
                userId,
                name: args.name,
            });
            return Resolutions.findOne(resolutionId);
        }
    }
}