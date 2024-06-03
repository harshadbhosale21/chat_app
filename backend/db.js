import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Url);
        console.log('Database connected Successfully')
    }
    catch (error) {
        console.log(error);
        console.log('Error connecting Database')
    }
}

export default ConnectDB;