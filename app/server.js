const express= require("express");
const mongoos=require("mongoose");
const morgan = require("morgan");
const path = require("path");
const creatError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const { AllRoutes } = require("./router/router");
module.exports = class Aplication{
    #app=express();
    #PORT;
    #DB_URI;
    constructor(PORT,DB_URI){
        this.#PORT=PORT;
        this.#DB_URI=DB_URI;
        this.configApplication();
        this.initRedis();
        this.connectToMongoos();
        this.createServer();
        this.createRoutes();
        this.errorHandling();

    }
    configApplication(){
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended : true}));
        this.#app.use(express.static(path.join(__dirname,"..","public")));
        this.#app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition : {
                info : {
                    title : "BoT Test API",
                    version :"1.0.0",
                    description : "Node Js",
                    contact: {
                        name: "Davod Basiri",
                        url: "https://logrocket.com",
                        email: "davodbasiri95@gmail.com",
                      },
                },
                servers : [
                    {
                        url: "http://localhost:5000"
                    }
                ]
            },
            apis : ["./app/router/**/*.js"]
        })))
    }

    createServer(){
        const http=require("http");
        http.createServer(this.#app).listen(this.#PORT , () =>{
            console.log("run > http://localhost:"+this.#PORT);
        })
    }

    connectToMongoos(){
        mongoos.connect(this.#DB_URI, (error)=> {
            if(!error)
                return console.log("conected to MongoDB");
            return console.log("faild to conect to MongoDB")
        })
        mongoos.connection.on("connected" , () =>{
            console.log("mongos connected to db")
        } ) 
        mongoos.connection.on("disconnected" , ()=>{
            console.log("mongos disconected to db")
        })
        process.on("SIGINT",async()=>{
            console.log("mongos SIGINT to db")
            await mongoos.connection.close();
            process.exit(0);
        })
    }

    createRoutes(){
        this.#app.use(AllRoutes)

    }

    initRedis(){
        require("./utils/init_redis");
    }

    errorHandling(){
        this.#app.use((req,res,next) =>{
            
            next(creatError.NotFound("Page Not Found Now"))
            
        })
        this.#app.use((error,req,res,next) => {
            const serverError= creatError.InternalServerError();
            const statusCode = error.status || serverError.status ;
            const message = error.message || serverError.message ;
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    success : false ,
                    message
                }
            })
        })
    }
}