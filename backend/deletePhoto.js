const mongoose = require('mongoose');
const PhotoModel = require('./models/photoModel');

// 🔧 povezava do tvoje baze (zamenjaj če je drugače)
mongoose.connect('mongodb://localhost:27017/ime_tvoje_baze', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const idToDelete = "6816239d96ccd52b3f898d62"; // primer: 6634f5e8cabc123456789012

PhotoModel.findOneAndDelete({ name: "aaaaa" })
    .then(result => {
        if (result) {
            console.log("✅ Slika izbrisana:", result.name);
        } else {
            console.log("⚠️ Slika ni bila najdena.");
        }
        mongoose.disconnect();
    })
