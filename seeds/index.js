const mongoose = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seed-helpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDb = async () => {
    await campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 30;
        const camp = new campground({
            author: '63563624b5ff9f7235b5fde8',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At a perspiciatis, facere ea laudantium vitae excepturi libero obcaecati beatae repellendus adipisci expedita consequuntur, non impedit eos cumque voluptates? Quos, aut!Culpa dolorem similique suscipit nobis consectetur unde sunt quod ut! Laudantium, necessitatibus! Laborum, quo animi repellat vero rem qui! Vero sint tempore recusandae natus qui eos consequatur nesciunt dolorum deleniti.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt',
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi', 
                }
            ]


        })
        await camp.save();
    }
}
seedDb().then(() => {
    mongoose.connection.close();
})




