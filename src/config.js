import {config} from 'dotenv'; 

config()

export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/tasksapi',
    PORT: process.env.PORT || 3000
}