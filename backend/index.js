const express = require("express")
const cors = require('cors')
const helmet = require('helmet')

const connectDb = require('./dbConn')
const TrainTicketModel = require('./models/TrainTicketsModel')
//app config
const app = express();

//middleware
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet())

    function reserveSeatsWithRowPriority(seatsArr,reqSeats){
        let reservedSeats = [];
        let row = 0;
        let col = 0;
        for(let i=0;i<seatsArr.length;i++){
            col = i%7;
            if(i%7===0){
                row++;
                reservedSeats=[];
            }
            if(!seatsArr[i]){
                reservedSeats.push(i);
            }
            if(reservedSeats.length===reqSeats){
                for(let j of reservedSeats){
                    seatsArr[j]=true;
                }
                return {col,row,seatsArray:seatsArr,reservedSeats};
            }
        }
        return {col,row,seatsArray:seatsArr,reservedSeats:[]};
    }

    function reserveSeats(seatsArr,reqSeats){
        let reservedSeats = [];
        let row = 0;
        let col = 0;
        for(let i=0;i<seatsArr.length;i++){
            col = i%7;
            if(i%7===0){
                row++;
            }
            if(!seatsArr[i]){
                reservedSeats.push(i);
                seatsArr[i]=true;
            }
            if(reservedSeats.length===reqSeats){
                return {col,row,seatsArray:seatsArr,reservedSeats};
            }
        }
        return {col,row,seatsArray:seatsArr,reservedSeats:[]}
    }

    app.post('/api/reserve-seats',async (req,res)=>{
        const seats  = parseInt(req.body.seats);
        if(!(typeof seats === 'number' || seats>7))
            return res.json({error:"please provide valid credentials"})
        const seatsArr = await TrainTicketModel.findOne()
        let reserved_seats =[]
        if(!seatsArr?.seats?.length){
            reserved_seats = reserveSeatsWithRowPriority(new Array(80).fill(false),seats);
            let newCoaches = await TrainTicketModel.create({
                seats:reserved_seats.seatsArray
            })
            await newCoaches.save();
            return res.json({data:reserved_seats});
        }
        reserved_seats = reserveSeatsWithRowPriority(seatsArr.seats,seats);
        console.log("top",reserved_seats.reservedSeats)
        if(!reserved_seats?.reservedSeats?.length){
            reserved_seats = reserveSeats(seatsArr.seats,seats);
            if(!reserved_seats?.reservedSeats?.length)
                return res.json({data:"no seats are available for given requirement"})
        }
        await TrainTicketModel.findOneAndUpdate(
            {},
            {seats: reserved_seats.seatsArray},
            { new: true }
            );
        return res.json({data:reserved_seats});
    })

app.listen(3500,async (err)=>{
    if(err) console.log(err);
    await connectDb();
    console.log("server is running on port ",3500)
})