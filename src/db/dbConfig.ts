import mongoose from "mongoose";



const connect = async() =>{
try {
   await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', ()=>{
        console.log("user successfully connected to MongoDB server");
    })

    connection.on('error', (error : any) => {
        console.log("MongoDB server connection error, make sure db is running", error);
    })
} catch (error) {
    console.log("Not able to connect MongoDB server");
    console.log("Error:", error)
    process.exit();
}
}

export default connect;

